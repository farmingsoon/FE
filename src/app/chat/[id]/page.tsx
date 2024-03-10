"use client";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import axios from "axios";

import * as Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";

import LocalStorage from "@/util/localstorage";
import { rotateRefresh } from "@/util/axiosCall";

import { tokenState } from "@/stores/tokenModal";
import { sseNotiAtomFamily } from "@/stores/sseNotiState";
import { chatListTypes, message } from "@/types/chat";

import ChatListItem from "@/components/chat/ChatListItem";
import ChatProductItem, {
  itemChatInfoTypes,
} from "@/components/chat/ChatProductItem";
import Img from "@/common/Img";
import SendButton from "@/../public/svg/SendButton";
import { useInfiniteScroll } from "@/util/useInfiniteScroll";


export default function Chat() {
  const [chatList, setChatList] = useState<chatListTypes[]>([]);
  const [curDetailChatInfo, setDetailChatInfo] = useState<itemChatInfoTypes>();
  const [isConnected, setIsConnected] = useState(false);
  const [, setOpenTokenModal] = useRecoilState(tokenState);
  const inChatRoomSSE = useRecoilValue(sseNotiAtomFamily("inChatRoomUpdate"));
  const [ pagination, setPagination ] = useState({
    page: 0,
    hasNext: false,
    hasPrevious: true,
    totalPageSize: 0,
  })

  const chatSocket = useRef<Stomp.Client | null>(null);

  const params = useParams<{ id: string }>();
  const [websocketCount, setWebsocketCount] = useState(0);
  const config = { withCredentials: true}

  const [messages, setMessages] = useState<message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const userId = Number(LocalStorage.getItem("memberId"));
  const isLogin = LocalStorage.getItem("loginState");


  const connect = () => {
    if (chatSocket.current === null) {
      const socket = new SockJS("https://server.farmingsoon.site/ws", null, {
        transports: ["websocket", "xhr-streaming", "xhr-polling"],
      });

      const client = new Stomp.Client({
        webSocketFactory: () => socket,
        // brokerURL: "wss://server.farmingsoon.site/ws",
        connectHeaders: {
          chatRoomId: params.id, 
          memberId: String(userId)
        },
        debug: (str) => {
          console.log(`debg: ${str}`);
        },
        reconnectDelay: 5000, //자동 재 연결
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
      });

      client.onConnect = () => {
        setWebsocketCount((prev) => prev + 1);
        setIsConnected(true);
        client.subscribe(
          `/sub/chat-room/${params.id}`,
          (message) => {
            if (message.body) {
              const newMSG = JSON.parse(message.body);
              console.log(newMSG);
              setMessages((chats) => [...chats, newMSG]);

              // //상대방 메세지 읽음 처리 
              // if(newMSG.senderId !== userId ){
              //   const readEndPoint = `/pub/chat/read`;
              //   chatSocket.current?.publish({
              //     destination:readEndPoint,
              //     body: JSON.stringify({
              //       chatId: params.id, //요녀석 때문
              //     }),
              //   })
              // }
              getList();
            }
          },
        );
        //1번 채팅방 나갈 때 구독 끊기 .unsubscribe()
      };

      client.activate();
      chatSocket.current = client; //useRef를 통해서 인스턴스 저장.
    }
  };

  const disconnect = () => {
    if (chatSocket.current) {
      chatSocket.current.deactivate();
      setWebsocketCount((prev) => prev - 1);
      setIsConnected(false);
      // setChatSocket(null);
    }
  };

  //채팅방 목록 && 채팅 리스트
  //unReadMessageCount
  const getList = async () => {
    const url = "https://server.farmingsoon.site/api/chat-rooms/me";
    const config = { withCredentials: true };

    try {
      console.log(">>> 목록 업데이트 함수 실행 <<< ")
      const res = await axios.get(url, config);
      setChatList(res.data.result);

    } catch (err) {
      console.log(`채팅방 목록 리스트 에러 ${err}`);
      if(axios.isAxiosError(err) && err.status === 401 ){
        if(err.message === "기한이 만료된 AccessToken입니다."){
          //AT 만료 
          console.log("AcessToken 만료");
          rotateRefresh().catch((refreshErr) => {
            if(refreshErr.message === "RefreshTokenUnauthorized"){
              setOpenTokenModal({ tokenExpired: true });
              console.log("!! 로테이트 함수의 기한 만료 토큰 관리 !! ")
            }
        });
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

  const getHistoryChat = async ( curPage: number ) => {
    const url = `https://server.farmingsoon.site/api/chats/${params.id}?page=${curPage}`;

    try {
      console.log("getHistory함수 : ", curPage)
      const res = await axios.get(url, config);
      if(res.status === 200){
        const history = res.data.result.chats;
        const resPagination = res.data.result.pagination;
        setPagination({
          page: curPage,
          hasNext: resPagination.hasNext,
          hasPrevious: resPagination.hasPrevious,
          totalPageSize: resPagination.totalPageSize,
        });
        setMessages([...history])
        return history;
      }


    } catch (err) {
      console.log(`채팅방 히스토리 GET 요청 에러 ${err}`);
      if(axios.isAxiosError(err) && err.status === 401 ){
        if(err.message === "기한이 만료된 AccessToken입니다."){
          //AT 만료 
          console.log("AcessToken 만료");
          rotateRefresh().catch((refreshErr) => {
            if(refreshErr.message === "RefreshTokenUnauthorized"){
                setOpenTokenModal({tokenExpired: true})
            }
        });
        }

        if(err.message === "기한이 만료된 RefreshToken입니다"){
          setOpenTokenModal({ tokenExpired: true })
        }
          
      }
      

    }
  };

  const loadMoreItems = async () => {
    console.log("무한스크롤 데이터 저장 ")
    if(pagination.hasNext === false ) {// 마지막 페이지 
      // setShowLoading(false);
      return;
    }; 
    const nextPage = pagination.page + 1;
    await getHistoryChat(nextPage).then(newMsg => {
      setMessages(prev => [...prev, ...newMsg])
    });
  };

  const observerRef = useInfiniteScroll(loadMoreItems);

  //디테일정보
  const getChatRoomInfo = async () => {
    const url = `https://server.farmingsoon.site/api/chat-rooms/${params.id}`;

    try {
      const res = await axios.get(url, config);
      if(res.status === 200){
        setDetailChatInfo(res.data.result);
      }

    } catch (err) {
      console.log(`채팅 관련 상품 정보 에러 ${err}`);

      if(axios.isAxiosError(err) && err.status === 401 ){
        if(err.message === "기한이 만료된 AccessToken입니다."){
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
    if(isLogin === "true" && inChatRoomSSE.sseState === true ){
      getList();
      // const timer = setTimeout(() => {
      //   console.log(" === 1.5초 늦게 업데이트 === ")
      //   getList();

      // }, 1500);

      // return () => clearTimeout(timer);

    }

    if(isLogin === "false"){
      setOpenTokenModal({ tokenExpired: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inChatRoomSSE]);

  useEffect(() => {
    if(isLogin === "true"){
      connect();
      getList();
      getHistoryChat(0);
      getChatRoomInfo();
    }

    return () => {
      disconnect();
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //메세지 보내기
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!isConnected) {
      console.log("== 오이! 클라이언트가 연결되지 않았다구 === ");
    }

    if (isConnected) {
      const destination = `/pub/chat/message`;
      chatSocket.current?.publish({
        destination,
        body: JSON.stringify({
          chatRoomId: params.id,
          senderId: userId,
          message: currentMessage,
        }),
      });
      //입력 창 초기화
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-[371px] border-r border-LINE_BORDER whitespace-nowrap ">
        <div className="flex flex-row justify-between px-3 items-cneter">
          <h1 className="font-semibold ">채팅</h1>
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
      <div className="flex flex-col flex-grow ">
          <ChatProductItem curDetailChatInfo={curDetailChatInfo} />
          <p className="text-POINT_RED font-normal text-center pt-1 text-sm">
              {isConnected
                ? "채팅 방이 연결 되었습니다. "
                : "채팅 방이 연결 중입니다."}
              채팅방 연결 갯수 {websocketCount}
          </p>
        <div className="flex flex-col-reverse h-full px-2 bg-zinc-200 overflow-y-auto" >
          <div ref={observerRef} className="w-fit m-0 p-2 bg-black">L:oading</div>
          {messages.length > 0 ? (
            messages.map((message, idx) => (
              <div
                className={`flex flex-row items-center ${message.senderId === userId ? "self-end" : "self-start"}`}
                key={idx}
              >
                {message.senderId === userId ? null : (
                  <div className="flex flex-col items-center mr-3">
                    <p className="text-xs pb-1">
                      {curDetailChatInfo?.toUsername}
                    </p>
                    <div className="">
                      <Img
                        type={"circle"}
                        src={curDetailChatInfo?.toUserProfileImage}
                        width={35}
                        height={35}
                      />
                    </div>
                  </div>
                )}
                {message.isRead === false && message.senderId === userId ?  <p className="text-[10px] font-light text-DEEP_MAIN mr-3">1</p> : null}
                <p
                  className={`px-2 my-2 py-3 rounded-lg w-fit ${message.senderId === userId ? "bg-indigo-400 text-white " : "bg-[#87dac2] text-white "}`}
                >
                  {message.message}
                </p>
                
              </div>
            ))
          ) : (
            <p className="my-3 text-indigo-400 text-center">
              채팅 내역이 없습니다.{" "}
            </p>
          )}
        </div>

        <form className="relative bottom-0 px-2 ">
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
