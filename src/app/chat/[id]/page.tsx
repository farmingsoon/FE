"use client";
import ChatListItem from "@/components/chat/ChatListItem";
import ChatProductItem, { itemChatInfoTypes } from "@/components/chat/ChatProductItem";
import Img from "@/common/Img";
import SendButton from "@/../public/svg/SendButton";
import { useEffect, useState } from "react"; 

import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import LocalStorage from "@/util/localstorage";
import { refreshToken } from "@/util/refreshToken";

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
  const [chatList, setChatList] = useState<chatListTypes[]>([]);
  const [curDetailChatInfo, setDetailChatInfo ] = useState<itemChatInfoTypes>();
  const [isConnected, setIsConnected] = useState(false);
  const [chatSocket, setChatSocket] = useState<any | null>();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  //임시
  const [messages, setMessages] = useState<message[]>([ ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const userId = Number(LocalStorage.getItem("memberId"));

  const socket = new SockJS("http://server.farmingsoon.site/ws");
  //, null, {transports: ["websocket", "xhr-streaming", "xhr-polling"],}
  // const socket = new SockJS("http://server.farmingsoon.site/ws", null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});

  const connect = () => {
    try {
      console.log(">>>  첫 연결 시도 ");
      const client = new Stomp.Client({
        webSocketFactory: () => socket,
        // brokerURL: "wss://server.farmingsoon.site/ws",
        connectHeaders: {
          Authorization: `Bearer ${ACCES_TOKEN}`
        },
        debug: (str) => {
          console.log(`debg: ${str}`);
        },
        reconnectDelay: 5000, //자동 재 연결
        heartbeatIncoming: 0,
        heartbeatOutgoing: 0,
      });

      client.onConnect = () => {
        console.log("=== connect Success === ");
        setIsConnected(true);
        client.subscribe(`/sub/chat-room/${params.id}`, (message) => {
          // console.log("[ 구독  ]: ", message);
          if (message.body) {
            const msg = message.body;
            // console.log("00 : ", JSON.parse(msg).message);
            setMessages((chats) => [...chats, JSON.parse(msg)]);
          }
        });
        //1번 채팅방 나갈 때 구독 끊기 .unsubscribe()
      };

      client.activate();
      setChatSocket(client);
    } catch (err) {
      console.log(">> 연결 connect 시도", err);
      setIsConnected(false);
    }
  };

  const disconnect = () => {
    // if (chatSocket === undefined) {
    //   return;
    // }
    // console.log("==== Disconnect ==== ");
    // console.log(">> ", chatSocket);
    // chatSocket.deactivate();
    if(chatSocket){
      chatSocket.deactivate
    }
  };

  // console.log(messages);

  // useEffect(() => {
  //   if(!chatSocket) {
  //     connect();
  //   }
  //   // 컴포넌트 언마운트 시 연결 해제
  //   return () => {
  //     disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //채팅방 목록 && 채팅 리스트

  const getList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/chat-rooms/me`, {
        headers: {
          Authorization: `Bearer ${ACCES_TOKEN}`,
        },
      });

      if (res.status === 200) {
        setChatList(res.data.result);
      }
    } catch (err) {
      console.log(`채팅방 목록 리스트 에러 ${err}`);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          refreshToken();
          router.refresh();
        }
      }
    }
  };

  const getHistoryChat = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/chats/${params.id}`, {
        headers: {
          Authorization: `Bearer ${ACCES_TOKEN}`,
        },
      });

      if (res.status === 200) {
        const history = res.data.result.chats;
        // console.log(history)
        setMessages([...history]);
      }
    } catch (err) {
      console.log(`이전 채팅 내역 ${err}`);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          refreshToken();
          router.refresh();
          
        }
      }
    }
  };

  //디테일정보
  const getChatRoomInfo = async () => {
    try { 
        const res = await axios.get(`${BASE_URL}/api/chat-rooms/${params.id}`, {
            headers: {
                Authorization: `Bearer ${ACCES_TOKEN}`
            }
        });

        if(res.status === 200){
          setDetailChatInfo(res.data.result);
        }
    } catch (err){
        console.log(`채팅 관련 상품 정보 에러 ${err}`)
    }
};

  useEffect(() => {
    getList();
    getHistoryChat();
    getChatRoomInfo();
    connect();

    return () => {
      disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);



  //메세지 보내기
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!isConnected) {
      console.log("== 오이! 클라이언트가 연결되지 않았다구 === ");
    }

    if (isConnected) {
      console.log("메세지 보내기 ");
      const destination = `/pub/chat/message`;
      chatSocket.publish({
        destination,
        body: JSON.stringify({
          chatRoomId: params.id,
          senderId: userId,
          message: currentMessage,
        }),
        headers: {
          Authorization: `Bearer ${ACCES_TOKEN}`,
        },
      });
      //입력 창 초기화
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-[371px] border-r border-LINE_BORDER whitespace-nowrap ">
        <div className="flex flex-row justify-between px-3 items-cneter">
          <h1 className="font-semibold ">채팅</h1>
          {/* <NewWrite width={"20px"} height={"20px"} /> */}
        </div>
        <div className="overflow-y-auto max-h-full h-fit mt-12 border-t border-LINE_BORDER  ">
          {chatList && chatList.length > 0 ? (
            chatList.map((list, idx) => <ChatListItem key={idx} list={list} />)
          ) : (
            <p className="text-sm font-normal mx-auto">
              개설된 채팅방이 없습니다.{" "}
            </p>
          )}
        </div>
      </div>

      {/* 채팅 방 섹션 fles-grow*/}
      <div className="flex flex-col h-screen flex-grow ">
        <ChatProductItem curDetailChatInfo={curDetailChatInfo} />
        <div className="flex flex-col  justif-end overflow-y-auto px-2">
          <p className="text-POINT_RED font-normal text-center pt-1 text-sm">
            {isConnected ? "채팅 방이 연결 되었습니다. " : "채팅 방이 연결 중입니다."}
          </p>
          <div className="flex flex-col mb-12 h-screen justify-end">
            {messages.length > 0 ? (
              messages.map((message, idx) => (
                <div
                className={`flex flex-row items-center ${message.senderId === userId ? "self-end" : "self-start"}`}
                  key={idx}
                >
                  {message.senderId === userId 
                    ? null 
                    : <div className="flex flex-col items-center mr-3">
                        <p className="text-xs pb-1">{curDetailChatInfo?.toUsername}</p>
                        <div className=""><Img type={"circle"} src={curDetailChatInfo?.toUserProfileImage} width={35} height={35} /></div>
                      </div>
                  }
                  <p className={`px-2 my-2 py-3 rounded-lg w-fit ${message.senderId === userId ? "bg-indigo-400 text-white " : "bg-[#87dac2] text-white "}`}>{message.message}</p>
                </div>
              ))
            ) : (
              <p className="my-3 text-indigo-400 text-center">
                채팅 내역이 없습니다.{" "}
              </p>
            )}
          </div>
        </div>
        {/* relative mt-2 px-2 */}
        <form className="sticky bottom-3 px-2 ">
          <input
            type="text"
            className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK"
            placeholder="메세지를 입력하세요."
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={(e) => {
              console.log("버튼은 눌림");
              sendMessage(e);
            }}
            className="absolute right-3 top-2"
          >
            <SendButton width={"30px"} height={"30px"} />
          </button>
        </form>
      </div>

    </div>
  );
}
