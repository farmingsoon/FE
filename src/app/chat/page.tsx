"use client";
import { useEffect, useState } from "react"; 
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

import { rotateRefresh } from "@/util/axiosCall";
import LocalStorage from "@/util/localstorage";

import { tokenState } from "@/stores/tokenModal";
import { sseNotiAtomFamily } from "@/stores/sseNotiState";
import { chatListTypes } from "@/types/chat";

import ChatListItem from "@/components/chat/ChatListItem";


export default function Chat() {
  const [, setOpenTokenModal] = useRecoilState(tokenState);
  const [chatList, setChatList] = useState<chatListTypes[]>([]);
  const chatPING = useRecoilValue(sseNotiAtomFamily("chatPING"));

  //채팅방 목록 && 채팅 리스트

  const getList = async () => {
    const url = "https://server.farmingsoon.site/api/chat-rooms/me";
    const config = { withCredentials: true };
    const isLogin = LocalStorage.getItem("loginState");

    if(isLogin === "true"){
      console.log("  >>> 목록 업데이트 함수 실행 <<< ")
      try {
        const res = await axios.get(url, config);
        if(res.status === 200){
          setChatList(res.data.result);
        }


      } catch (err) {       
        if(axios.isAxiosError(err) && err.response) {
          const status = err.response.status;
          const errorMessage = err.response.data.message;
          
          if(status === 401){
            if(errorMessage === "기한이 만료된 AccessToken입니다."){
              // Access Token expired 
              console.log("AccessToken 만료");
              rotateRefresh().catch((refreshErr) => {
                console.log("ROTATE함수 실행 후 본 컴포넌트 에러 : ", refreshErr)
                if(refreshErr.message === "RefreshTokenUnauthorized"){
                  setOpenTokenModal({ tokenExpired: true });
                  console.log("!! 로테이트 함수의 기한 만료 토큰 관리 !! ")
                }
            });
            }
      
            if(errorMessage === "기한이 만료된 RefreshToken입니다."){
              console.log("RefreshToken 만료로 모달 오픈 ")
              setOpenTokenModal({ tokenExpired: true });
            }
              
          }
      
          if(status === 403){
            //로그인 후 이용할 수 있습니다. 
            setOpenTokenModal({ tokenExpired: true });
          }
        };
        
      }
    }

    if(isLogin === "false"){
      console.log("채팅방 === 만료 실행 : ", isLogin)
      setOpenTokenModal({ tokenExpired: true })    
    }

  };

  useEffect(() => {
    getList(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(chatPING.sseState){
      getList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chatPING.sseState])

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
