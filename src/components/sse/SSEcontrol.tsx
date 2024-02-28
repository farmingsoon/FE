"use client";
import { useRef, useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import { sseNotiSelector } from "@/stores/sseNotification";
import { showNotificationSelctor } from "@/stores/showNotification";
import { sseChattingSelector } from "@/stores/sseChatPingState";


const SSEcontrol = () => {
    const eventSource = useRef<EventSourcePolyfill | null | undefined>();
    const isLogin = useRecoilValue(tokenState);
    const localState = LocalStorage.getItem("loginState");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [retryCount, setRetryCount] = useState(-1);
    const [, setGotMessage] = useRecoilState(sseNotiSelector);
    const [, setGotChatMessage] = useRecoilState(sseChattingSelector)
    const [, setShowNotification] = useRecoilState(showNotificationSelctor);
    const notificationTimeoutId = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        const pageLocation = window.location.pathname;
        console.log(pageLocation)


        const connectSSE = () => {
            eventSource.current = new EventSourcePolyfill(`${BASE_URL}/api/notifications/subscribe`, {
                withCredentials: true
            });

            //연결 성공 헨들러 - 접속이 이루어졌을 때 호출 
            eventSource.current.onopen = async (event) => {
                console.log("이벤트 연결 성공 ", event);
            }

            //기본 메세지 받았을 때 
            eventSource.current.addEventListener("CONNECT", function (event){
                console.log(" === 연결 메세지 === ")
                const customEvent = event as MessageEvent;
                console.log(customEvent.data);
                // const parsedData = JSON.parse(event.data);
                // console.log("기본 메세지", parsedData);
            });

            eventSource.current.addEventListener("NOTIFICATION", function(event){
                console.log(" === 알림 메세지 === ");
                const customEvent = event as MessageEvent;
                console.log(customEvent.data);
                setGotMessage(true);  // 메뉴 바 핑
                //상단 알림모달
                if(pageLocation.includes("chat")){
                    console.log("채팅방 페이지 열려있음")
                    setShowNotification(false);  
                } else {
                    setShowNotification(true);  
                }

                // clearTimeout을 호출할 때 useRef를 사용합니다.
                if (notificationTimeoutId.current) {
                    clearTimeout(notificationTimeoutId.current);
                }

                //setTimeout 호출
                notificationTimeoutId.current = setTimeout(() => {
                    setShowNotification(false);
                    // useRef를 사용하기 때문에 null로 설정할 필요가 없습니다.
                }, 2500)
            });

            eventSource.current.addEventListener("CHATTING", function(event){
                console.log(" === 채팅 메세지 === ");
                const customEvent = event as MessageEvent;
                console.log(customEvent.data);
                setGotChatMessage(true);  // 메뉴 바 핑
                if(pageLocation.includes("chat")){
                    console.log("채팅방 페이지 열려있음")
                    setShowNotification(false);  
                } else {
                    setShowNotification(true);  
                }

                // clearTimeout을 호출할 때 useRef를 사용합니다.
                if (notificationTimeoutId.current) {
                    clearTimeout(notificationTimeoutId.current);
                }

                //setTimeout 호출
                notificationTimeoutId.current = setTimeout(() => {
                    setShowNotification(false);
                    // useRef를 사용하기 때문에 null로 설정할 필요가 없습니다.
                }, 2500)
            });



            //연결 옿류 헨들러 
            eventSource.current.onerror = (err) => {
                console.log("SSE : ", err);
                eventSource.current?.close();

                if(retryCount < 3){
                    setTimeout(() => {
                        connectSSE();
                        setRetryCount((currentRetryCount) => currentRetryCount + 1);
                    }, 5000);
                }
            }
        };


        if(isLogin.tokenExpired === true || localState === "false"){
            //토큰 만료 시 연결 종료 
            console.log(" == 토큰 만료 및 비로그인 상태라 연결 종료 == ")
            eventSource.current?.close(); // 연결 종료
            eventSource.current = null; //참조 제거
            setGotMessage(false);
        }

        if(isLogin.tokenExpired === false && localState === "true"){
            console.log(" == 로그인 상태라 연결  == ")
            connectSSE();
        }

        return () => {
            if(eventSource.current){
                eventSource.current?.close(); // 연결 종료
				eventSource.current = null; //참조 제거
                setGotMessage(false);
				console.log("언마운트 이벤트 헨들러 종료");
            }

            if(notificationTimeoutId.current){
                clearTimeout(notificationTimeoutId.current);
                notificationTimeoutId.current = null; // 이제 타이머 ID를 null로 설정할 필요가 있습니다.
            }

        };

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin.tokenExpired, retryCount, notificationTimeoutId]);


    return null;
}

export default SSEcontrol;