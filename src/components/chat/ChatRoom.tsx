import { tokenState } from "@/stores/tokenModal";
import { chatListTypes } from "@/types/chat";
import { rotateRefresh } from "@/util/axiosCall";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChatListItem from "./ChatListItem";
import { sseNotiAtomFamily } from "@/stores/sseNotiState";
import LocalStorage from "@/util/localstorage";

const ChatRoom = () => {
    const isLogin = LocalStorage.getItem("loginState");
    const [chatList, setChatList] = useState<chatListTypes[]>([]);
    const [, setOpenTokenModal] = useRecoilState(tokenState);
    const inChatRoomSSE = useRecoilValue(sseNotiAtomFamily("inChatRoomUpdate"));


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

    useEffect(() => {
        if(isLogin === "true" || inChatRoomSSE.sseState === true ){
            getList();
        }

        if(isLogin === "false"){
            setOpenTokenModal({ tokenExpired: true })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inChatRoomSSE]);




    return(
        <div className="min-w-48 border-r border-LINE_BORDER whitespace-nowrap ">
                <div className="flex flex-row justify-between px-3 items-cneter">
                    <h1 className="font-semibold ">채팅</h1>
                </div>
                <div className="overflow-y-auto max-h-full h-fit mt-12 border-t border-LINE_BORDER  ">
                    {chatList && chatList.length > 0 ? (
                        chatList.map((list, idx) => <ChatListItem key={idx} list={list} />)
                    ) : (
                        <p className="text-sm font-normal mx-auto mt-12">
                        개설된 채팅방이 없습니다.{" "}
                        </p>
                    )}
                </div>
        </div>
    )
}

export default ChatRoom;