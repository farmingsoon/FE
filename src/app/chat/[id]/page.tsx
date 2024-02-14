"use client";
import ChatListItem from "@/components/chat/ChatListItem";
// import NewWrite from "../../../public/svg/NewWrite";
import ChatProductItem from "@/components/chat/ChatProductItem";
// import ReadChat from "@/components/chat/ReadChat";
// import SendChat from "@/components/chat/SendChat";
import SendButton from "../../../../public/svg/SendButton";
import NewWrite from "../../../../public/svg/NewWrite";
import { useEffect, useState } from "react";
// import ChatSection from "@/components/chat/ChatSection";
// import LocalStorage from "@/util/localstorage";
// import SendButton from "../../../public/svg/SendButton";

import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";
import axios from "axios";
import LocalStorage from "@/util/localstorage";



export interface message {
    message: string;
    senderId: number;
    createdAt: string;
}


export interface chatListTypes {
    chatRoomId: number;
    toUserName: string;
    toUserProfileImage: string;
    lastMessage: string;
    lastChatTime: string;
}

export default function Chat() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const ACCES_TOKEN = LocalStorage.getItem("accessToken");
    const [ chatList, setChatList ] = useState<chatListTypes[]>([]);
    // const accessToken = LocalStorage.getItem("accessToken");
    const [isConnected, setIsConnected] = useState(false);
    const [ chatSocket, setChatSocket ] = useState<any | null>();
    const params = useParams<{ id: string; }>();

    //임시
    const [ messages, setMessages ] = useState<message[]>([{message: "채팅 시작", senderId: 2, createdAt: "2014"}]);
    const [ currentMessage, setCurrentMessage ] = useState("");
    const userId = Number(LocalStorage.getItem("memberId"));

    const socket = new SockJS('https://server.farmingsoon.site/ws', null, {
        transports: ["websocket", "xhr-streaming", "xhr-polling"],
    });

    const connect = () => {
        try { 
            console.log(">>>  첫 연결 시도 ")
            const client = new Stomp.Client({
                webSocketFactory: () => socket,
                // brokerURL: "wss://server.farmingsoon.site/ws",
                debug: (str) => {
                    console.log(`debg: ${str}`)
                },
                reconnectDelay: 5000, //자동 재 연결
                heartbeatIncoming: 0,
                heartbeatOutgoing: 0,   
            });

            client.onConnect =  () => {
                console.log("=== connect Success === ");
                setIsConnected(true);
                client.subscribe(`/sub/chat-room/${params.id}`, (message) => {
                    console.log("[ 구독  ]: ", message)
                    if(message.body){
                        const msg = message.body
                        console.log("00 : ", JSON.parse(msg).message);
                        // setMessages((chats) => [...chats, JSON.parse(msg)]);
                    }
                });
                //1번 채팅방 나갈 때 구독 끊기 .unsubscribe()
            };

            

            client.activate();
            setChatSocket(client);


        } catch (err){
            console.log(">> 연결 connect 시도", err);
            setIsConnected(false)
        }
    };

    const disconnect = () => {
        if(chatSocket === undefined) {
            return;
        }
        console.log("==== Disconnect ==== ");
        console.log(">> " , chatSocket)
        chatSocket.deactivate();
    }

    // const client = new Stomp.Client({
    //     webSocketFactory: () => socket,
    //     // brokerURL: "wss://server.farmingsoon.site/ws",
    //     debug: (str) => {
    //         console.log(`debg: ${str}`)
    //     },
    //     reconnectDelay: 5000, //자동 재 연결
    //     heartbeatIncoming: 0,
    //     heartbeatOutgoing: 0,   
    //     onConnect: () => {
    //         console.log("=== connect Success === ");
    //         setIsConnected(true);
            

    //     },
    //     onStompError: (frame) => {
    //         console.error('Broker reported error: ' + frame.headers['message']);
    //         console.error('Additional details: ' + frame.body);
    //         setIsConnected(false);
    //     },
    // });
    console.log(messages);

    useEffect(() => {
    
        connect();

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //채팅방 목록 && 채팅 리스트 

    const getList = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/chat-rooms/me`, {
                headers: {
                    Authorization: `Bearer ${ACCES_TOKEN}`
                }
            });

            if(res.status === 200){
                setChatList(res.data.result);
            }
        } catch (err){
            console.log(`채팅방 목록 리스트 에러 ${err}`)
        }
   };


   const getHistoryChat = async () => {
        try { 
            const res = await axios.get(`${BASE_URL}/api/chats/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${ACCES_TOKEN}`
                }
            });

            if(res.status === 200){
                const history = res.data.result.chats
                setMessages((prev) => [...prev, ...history]);
            }
        } catch (err){
            console.log(`이전 채팅 내역 ${err}`)
        }
    };

    useEffect(() => {
        getHistoryChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    //메세지 보내기 
    const sendMessage = async (e:any) => {
        e.preventDefault();
        if(!isConnected) {console.log("== 오이! 클라이언트가 연결되지 않았다구 === ")};

        if(isConnected ){
            console.log("메세지 보내기 ")
            const destination = `/pub/chat/message`;
            chatSocket.publish({
                destination,
                body: JSON.stringify({
                    chatRoomId: params.id,
                    message: currentMessage,
                }),

            });
            //입력 창 초기화 
            setCurrentMessage("");
        }        


    };




    return (
        <div className="flex min-h-screen">
           {/* <div className="w-[371px] border-r border-LINE_BORDER whitespace-nowrap">
                <div className="flex flex-row justify-between px-3 items-cneter">
                    <h1 className="font-semibold ">채팅</h1>
                    <NewWrite width={"20px"} height={"20px"} />
                </div>
                <div className="mt-12 border-t border-LINE_BORDER overflow-y-scroll">
                    {chatList && chatList.length > 0
                        ? chatList.map((list, idx) => (
                        <ChatListItem key={idx} list={list}/>
                    )) :
                        <p className="text-sm font-normal mx-auto">개설된 채팅방이 없습니다. </p>
                    }
                </div>
           </div> */}
           {/* 임시 */}
           {/* 구분자 색상 적용 예시 - ${message.senderId === userId ? "big-indigo-400 text-white " : "bg-lime-500 "} */}
           <div className="flex-grow flex flex-col h-screen">
                {/* <ChatProductItem chatRoomId={params.id}/> */}
                {/* <ChatSection chatRoomId={params.id} isConnected={isConnected}/> */}
                <div className="h-full pt-5 px-2 flex flex-col justify-end flex-grow ">
                <p className="text-POINT_RED font-semibold text-center">{isConnected ? "연결" : "연결중"} </p>
                {messages.length > 0 ? messages.map((message, idx) => (
                    <div className={`px-2 my-2 py-3 rounded-lg w-fit bg-indigo-400 text-white`} key={idx}>
                        {message.message}
                    </div>

                )): <p className="my-3 text-indigo-400 text-center">채팅 내역이 없습니다. </p>}
                {/* <ReadChat />
                <SendChat /> */}
            </div>
            <form className="relative mt-2 px-2">
                <input
                    type="text" 
                    className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK" 
                    placeholder="메세지를 입력하세요."
                    value={currentMessage}
                    onChange={(e) => { setCurrentMessage(e.target.value)}}
                    />
                <button 
                    type="submit"
                    onClick={(e) => {console.log("버튼은 눌림");sendMessage(e)}}
                    className="absolute right-3 top-2" >
                        <SendButton width={"30px"} height={"30px"} />
                </button>
            </form>
                {/* <form className="relative mt-2 px-2">
                    <input type="text" className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK" placeholder="메세지를 입력하세요."/>
                    <span className="absolute right-3 top-2"><SendButton width={"30px"} height={"30px"} /></span>
                </form> */}
           </div>
        </div>
    )
}
