"use client";
import ChatListItem from "@/components/chat/ChatListItem";
import { useEffect, useState } from "react"; 

import { axiosCall } from "@/util/axiosCall";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";

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
  const [, setOpenTokenModal] = useRecoilState(tokenState);
  const [chatList, setChatList] = useState<chatListTypes[]>([]);

  //채팅방 목록 && 채팅 리스트

  const getList = async () => {
    const url = "/api/chat-rooms/me";
    const config = { withCredentials: true };

    try {
      const res = await axiosCall(url, "GET", config);
      setChatList(res);

    } catch (err) {
      if(err instanceof Error && err.message === "RefreshTokenUnauthorized") {
        // 토큰 만료 시 토큰 모달 상태를 업데이트
        console.log("refresh토큰 만료 ")
        setOpenTokenModal({ tokenExpired: true });
    }
      console.log(`채팅방 목록 리스트 에러 ${err}`);

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
