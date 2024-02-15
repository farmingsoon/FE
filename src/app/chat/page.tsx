"use client";
import ChatListItem from "@/components/chat/ChatListItem";
import { useEffect, useState } from "react"; 

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
        }
      }
    }
  };

  useEffect(() => {
    getList();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-[371px] border-r border-LINE_BORDER whitespace-nowrap">
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

      {/* 채팅 방 섹션 */}
      <div className="flex-grow flex flex-col h-screen">
        
      </div>

    </div>
  );
}
