"use client";
import LocalStorage from "@/util/localstorage";
import { message } from "@/app/chat/[id]/page";
import { useState } from "react";
import axios from "axios";
import SendButton from "../../../public/svg/SendButton";

interface ChatTypes {
    chatRoomId: number;
    isConnected: boolean;
}

const ChatSection = ( { chatRoomId, isConnected }:ChatTypes ) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = LocalStorage.getItem("accessToken");
    const userId = Number(LocalStorage.getItem("memberId"));

    const [ messages,  ] = useState<message[]>([]);
    const [ currentMessage, setCurrentMessage ] = useState("");


    console.log(messages);

    //메세지 보내기 
    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await axios.post(`${BASE_URL}/pub/chat/message`, {
            chatRoomId: chatRoomId,
            message: currentMessage,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((res) => {
            console.log("메세지 전송 성공");
            console.log(res);
        }).catch((err) => console.log(err));

        //입력 창 초기화 
        setCurrentMessage("");
    };

    return(
        // <SocketProvider chatRoomId={chatRoomId}>
        <>
            <div className="h-full pt-5 px-2 flex flex-col justify-end flex-grow ">
                <p className="text-POINT_RED font-semibold text-center">{isConnected ? "연결" : "연결중"} </p>
                {messages.map((message, idx) => (
                    <div className={"px-2 py-3 rounded-lg border" + (message.senderId === userId ? "bg-indigo-400 text-white" : "bg-zinc-100")} key={idx}>
                        {message.message}
                    </div>

                ))}
                {/* <ReadChat />
                <SendChat /> */}
            </div>
            <form className="relative mt-2 px-2">
                <input
                    type="text" 
                    className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK" 
                    placeholder="메세지를 입력하세요."
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                <button 
                    type="submit"
                    onClick={(e) => sendMessage(e)}
                    className="absolute right-3 top-2" >
                        <SendButton width={"30px"} height={"30px"} />
                </button>
            </form>
        </>
        // </SocketProvider>
    )
}

export default ChatSection;