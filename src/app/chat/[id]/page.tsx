"use client";
// import ChatListItem from "@/components/chat/ChatListItem";
// import NewWrite from "../../../public/svg/NewWrite";
import ChatProductItem from "@/components/chat/ChatProductItem";
// import ReadChat from "@/components/chat/ReadChat";
// import SendChat from "@/components/chat/SendChat";
import SendButton from "../../../../public/svg/SendButton";
import NewWrite from "../../../../public/svg/NewWrite";
import { useEffect, useState } from "react";
import ChatSection from "@/components/chat/ChatSection";

import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";

// import { WebSocket } from 'ws';
// Object.assign(global, { WebSocket });
// import LocalStorage from "@/util/localstorage";
// import SendButton from "../../../public/svg/SendButton";

export interface message {
    message: string;
    senderId: number;
    createdAt: string;
}


export interface itemChatInfoTypes {
    itemId: number;
    itemTitle: string;
    itemThumbnailImage: string;
    highestPrice: number;
    toUserProfileImage: string;
}

export interface chatListTypes {
    chatRoomId: number;
    toUserName: string;
    toUserProfileImage: string;
    lastMessage: string;
    lastChatTime: string;
}

export default function Chat() {
    // const [ messages, setMessages ] = useState<message[]>([]);
    // const accessToken = LocalStorage.getItem("accessToken");
    const [isConnected, setIsConnected] = useState(false);
    // const [ socket, setSocket ] = useState<any | null>(null);
    // const client = useRef({});
    // console.log(socket);

    // useEffect(() => {
    //     if(!socket){
    //         return;
    //     }

    //     socket.deactivate("disconnect", async () => {
    //         console.log("==== disconnect ==== ");
    //         setIsConnected(false);
    //     });
    // })    

    useEffect(() => {
        const socket = new SockJS('https://server.farmingsoon.site/ws', null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});

        const client = new Stomp.Client({
            webSocketFactory: () => socket,
            // brokerURL: "wss://server.farmingsoon.site/ws",
            debug: (str) => {
                console.log(`debg: ${str}`)
            },
            onConnect: () => {
                console.log("=== connect Success === ");
                setIsConnected(true);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                setIsConnected(false);
            },
        });

        client.activate();

        return () => {client.deactivate();}

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex min-h-screen">
           <div className="w-[371px] border-r border-LINE_BORDER whitespace-nowrap">
                <div className="flex flex-row justify-between px-3 items-cneter">
                    <h1 className="font-semibold ">채팅</h1>
                    <NewWrite width={"20px"} height={"20px"} />
                </div>
                <div className="mt-12 border-t border-LINE_BORDER overflow-y-scroll">
                    {/* <ChatListItem list={undefined} /> */}
                </div>
           </div>
           <div className="flex-grow flex flex-col h-screen">
                <ChatProductItem />
                <ChatSection chatRoomId={1} isConnected={isConnected}/>
                <form className="relative mt-2 px-2">
                    <input type="text" className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK" placeholder="메세지를 입력하세요."/>
                    <span className="absolute right-3 top-2"><SendButton width={"30px"} height={"30px"} /></span>
                </form>
           </div>
        </div>
    )
}
