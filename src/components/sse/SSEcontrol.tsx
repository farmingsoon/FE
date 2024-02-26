import { useRef, useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import { sseNotiSelector } from "@/stores/sseNotification";


const SSEcontrol = () => {
    const eventSource = useRef<EventSourcePolyfill | null | undefined>();
    const isLogin = useRecoilValue(tokenState);
    const localState = LocalStorage.getItem("loginState");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [retryCount, setRetryCount] = useState(-1);
    const [, setGotMessage] = useRecoilState(sseNotiSelector);


    useEffect(() => {
        console.log(" ==== SSE ==== ")
        const connectSSE = () => {
            eventSource.current = new EventSourcePolyfill(`${BASE_URL}/api/notifications/subscribe`, {
                withCredentials: true
            });

            //기본 메세지 받았을 때 
            //알림 발생 지 -> 종 모양 ping 발생 설정 
            eventSource.current.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log("기본 메세지", parsedData);
                setGotMessage(true);

            }

            //연결 성공 헨들러 - 접속이 이루어졌을 때 호출 
            eventSource.current.onopen = async (event) => {
                console.log("이벤트 연결 성공 ", event);
            }

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
        };

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin.tokenExpired, retryCount]);


    return null;
}

export default SSEcontrol;