"use client";
import { useRef, useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import { sseNotiSelectorFamily } from "@/stores/sseNotiState";
import NotificationItem from "./NotificationItem";



const SSEcontrol = () => {
    const eventSource = useRef<EventSourcePolyfill | null | undefined>();
    const isTokenInValid = useRecoilValue(tokenState);
    const localState = LocalStorage.getItem("loginState");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    // const [retryCount, setRetryCount] = useState(-1);
    const notificationTimeoutId = useRef<NodeJS.Timeout | null>(null);

    //알림 관리
    const [ , setAlarmPing ] = useRecoilState(sseNotiSelectorFamily("notiPING"));
    const [ , setChatPing ] = useRecoilState(sseNotiSelectorFamily("chatPING"));
    const [ alarmMSG, setAlarmMSG ] = useRecoilState(sseNotiSelectorFamily("notiMSG"));
    const [ chatMSG, setChatMSG ] = useRecoilState(sseNotiSelectorFamily("chatMSG"));
    const [  , setInChatRoomSSE ] = useRecoilState(sseNotiSelectorFamily("inChatRoomUpdate"));


    useEffect(() => {
        const pageLocation = window.location.pathname;
        
        const connectSSE = () => {
            eventSource.current = new EventSourcePolyfill(`${BASE_URL}/api/notifications/subscribe`, {
                withCredentials: true
            });

            //연결 성공 헨들러 - 접속이 이루어졌을 때 호출 
            eventSource.current.onopen = async (event) => {
                console.log("SSE: 성공적인 연결 완료 ", event);
            }

            //기본 메세지 받았을 때 
            eventSource.current.addEventListener("CONNECT", function (event){
                const customEvent = event as MessageEvent;
                console.log("SSE: ", customEvent.data);

            });

            eventSource.current.addEventListener("NOTIFICATION", function(){
                // const customEvent = event as MessageEvent;
                // console.log(customEvent.data);

                //알림 핑
                setAlarmPing((cur) => ({ ...cur, sseState: true }));  
                //알림 모달
                if(pageLocation.includes("chat")){
                    // console.log("=== 채팅방 페이지 열려있음 ===")
                    setAlarmMSG((cur) => ({ ...cur, sseState: false })); 
                } else {
                    setAlarmMSG((cur) => ({ ...cur, sseState: true }));
                }

                // clearTimeout을 호출할 때 useRef를 사용합니다.
                if (notificationTimeoutId.current) {
                    clearTimeout(notificationTimeoutId.current);
                }

                //setTimeout 호출
                notificationTimeoutId.current = setTimeout(() => {
                    setAlarmMSG((cur) => ({ ...cur, sseState: false }));  
                    // useRef를 사용하기 때문에 null로 설정할 필요가 없습니다.
                }, 2500)
            });

            eventSource.current.addEventListener("NEW_CHAT", function(event){
                console.log("SSE: NEW_CHAT 키워드");
                const customEvent = event as MessageEvent;
                console.log(customEvent.data);

                //채팅 핑
                setChatPing((cur) => ({ ...cur, sseState: true }));
                setInChatRoomSSE((cur) => ({...cur, sseState: false})); 
                
                //채팅 모달
                if(pageLocation.includes("chat")){
                    setChatMSG((cur) => ({ ...cur, sseState: false }));
                } else {
                    setChatMSG((cur) => ({ ...cur, sseState: true }));  
                }

                // clearTimeout을 호출할 때 useRef를 사용합니다.
                if (notificationTimeoutId.current) {
                    clearTimeout(notificationTimeoutId.current);
                }

                //setTimeout 호출
                notificationTimeoutId.current = setTimeout(() => {
                    setChatMSG((cur) => ({ ...cur, sseState: false }));
                    setInChatRoomSSE((cur) => ({...cur, sseState: false}));  
                    // useRef를 사용하기 때문에 null로 설정할 필요가 없습니다.
                }, 2500)
            });

            eventSource.current.addEventListener("CHATROOM_UPDATE", function(){
                console.log("SSE: CHATROOM_UPDATE 키워드");
                
                //채팅방 목록 업데이트 용 
                setInChatRoomSSE((cur) => ({...cur, sseState: true})); 

                // clearTimeout을 호출할 때 useRef를 사용합니다.
                if (notificationTimeoutId.current) {
                    clearTimeout(notificationTimeoutId.current);
                }

                //setTimeout 호출
                notificationTimeoutId.current = setTimeout(() => {
                    setInChatRoomSSE((cur) => ({...cur, sseState: false}));  
                    // useRef를 사용하기 때문에 null로 설정할 필요가 없습니다.
                }, 2500)
            })



            //연결 오류 헨들러 
            eventSource.current.onerror = (err) => {
                console.log("SSE : 에러 ", err);
                eventSource.current?.close();
            }
        };


        if(isTokenInValid.tokenExpired === true || localState === "false"){
            //토큰 만료 시 연결 종료 
            eventSource.current?.close(); // 연결 종료
            eventSource.current = null; //참조 제거
            setAlarmPing((cur) => ({ ...cur, sseState: false }));
            setChatPing((cur) => ({ ...cur, sseState: false }));
            console.log("SSE: 토큰 만료 및 비로그인 상태라 연결 종료")
        }

        if(isTokenInValid.tokenExpired === false && localState === "true" ){
            console.log("SSE: 로그인 상태라 연결 ")
            connectSSE();
        }


        return () => {
            if(eventSource.current){
                eventSource.current?.close(); // 연결 종료
				eventSource.current = null; //참조 제거
				console.log("언마운트 이벤트 헨들러 종료");
            }

            if(notificationTimeoutId.current){
                clearTimeout(notificationTimeoutId.current);
                notificationTimeoutId.current = null; // 이제 타이머 ID를 null로 설정할 필요가 있습니다.
            }

        };

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTokenInValid.tokenExpired,  notificationTimeoutId]);


    // return null;
    if(alarmMSG.sseState){
        return <NotificationItem msg={"새로운 알림이 도착했습니다!"} type={"alarm"}/>
    }

    if(chatMSG.sseState){
        return <NotificationItem msg={"새로운 채팅이 도착했습니다!"} type={"chat"}/>
    }

    // if(inChatRoomSSE.sseState) {
    //     return <NotificationItem msg={"새로운 채팅이 도착했습니다!"} type={"chat"}/>
    // }

    return null;


}

export default SSEcontrol;