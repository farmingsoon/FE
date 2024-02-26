"use client";
import ChatListItem from "@/components/chat/ChatListItem";
import { useEffect, useState } from "react"; 

import { rotateRefresh } from "@/util/axiosCall";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import axios from "axios";

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
    const url = "https://server.farmingsoon.site/api/chat-rooms/me";
    const config = { withCredentials: true };

    try {
      const res = await axios.get(url, config);
      if(res.status === 200){
        setChatList(res.data.result);
      }

    } catch (err) {
    //   if(err instanceof Error && err.message === "RefreshTokenUnauthorized") {
    //     // 토큰 만료 시 토큰 모달 상태를 업데이트
    //     console.log("refresh토큰 만료 ")
    //     setOpenTokenModal({ tokenExpired: true });
    // }
      console.log(`채팅방 목록 리스트 에러 ${err}`);
      if(axios.isAxiosError(err) && err.status === 401 ){
        if(err instanceof Error && err.message === "기한이 만료된 AccessToken입니다."){
          //AT 만료 
          console.log("AcessToken 만료");
          rotateRefresh();
        }

        if(err.message === "기한이 만료된 RefreshToken입니다"){
          setOpenTokenModal({ tokenExpired: true })
        }
          
      }

      if(axios.isAxiosError(err) && err.status === 403 ){
        //로그인 후 이용할 수 있습니다. 
        setOpenTokenModal({ tokenExpired: true })
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
