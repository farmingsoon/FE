"use client";

import { useState } from "react";
import SendButton from "../../../public/svg/SendButton";

export default function TestChatPage (){
    const userId = 1;
    const [ wholeRead, setWholeRead ] = useState(false);
    const dummyData = [
        {
            senderId: 1,
            message: "01: 안녕하세요",
            isRead: true
        },
        {
            senderId: 2,
            message: "02: 안녕",
            isRead: true
        },
        {
            senderId: 1,
            message: "03: 판매하시나요?",
            isRead: true
        },
        {
            senderId: 2,
            message: "04: 예",
            isRead: true
        },
        {
            senderId: 2,
            message: "05: ㄱㄱ하시져",
            isRead: true
        },
        {
            senderId: 2,
            message: "06: 내일 만나요",
            isRead: true
        },
        {
            senderId: 1,
            message: "07: 얍얍 알겠습니다",
            isRead: false
        },
        {
            senderId: 1,
            message: "08: 도착 전에 연락 줘",
            isRead: false
        },
        {
            senderId: 1,
            message: "09: 서울 거래 부탁합니다.",
            isRead: true
        }
    ]


    const handleWholeRead = (e: any) => {
        e.preventDefault();
        setWholeRead(!wholeRead);
    };

   console.log(wholeRead)

    return (
        <div className="flex h-full">
            <div className="w-[371px] border-r border-LINE_BORDER whitespace-nowrap bg-white">
                <div className="flex flex-row justify-between px-3 items-cneter">
                <h1 className="font-semibold ">채팅</h1>
                {/* <NewWrite width={"20px"} height={"20px"} /> */}
                </div>
                <div className="overflow-y-auto max-h-full h-fit mt-12 border-t border-LINE_BORDER bg-lime-300 ">
                    포인트

                </div>
            </div>

            {/* 채팅 방 섹션 fles-grow*/}
            <div className="flex flex-col flex-grow bg-lime-200">

                <div className="flex flex-row w-full bg-purple-200 p-3 hover:cursor-pointer" >            
                    <div className="flex-1 ml-3">
                        <div className="font-normal text-md mb-1">타이틀</div>
                        <div className="text-xs font-light">현재 최고가 
                            <span className="font-normal text-MAIN_COLOR mx-1 ">₩ 10000</span> 원
                        </div>
                    </div>
                </div>

                <p className="text-POINT_RED font-normal text-center pt-1 text-sm">
                        채팅방 연결 갯수 
                </p>

                <div className=" h-full flex flex-col px-2 bg-zinc-200 overflow-y-auto">
                    {dummyData.length > 0 ? 
                        <div className="flex flex-col bg-pink-500">
                            <div className="w-fit mx-auto my-1 p-2 bg-black">Loading...</div>
                            {dummyData.map((el, idx) => (
                            <div key={idx} className={`flex flex-row items-center ${el?.senderId === userId ? "self-end" : "self-start"}`} >
                                <p className={`text-[10px] font-light text-POINT_RED mr-3 ${wholeRead ? "invisible" : ""}`}>
                                    {el?.isRead === false && el.senderId === userId || wholeRead === false && el?.senderId === userId && el?.isRead === false ? 1 : null}
                                    
                                </p>
                                <p key={idx} className={`my-3 text-white text-center p-1 rounded-md ${el?.senderId === userId ? "bg-indigo-400" : "bg-black"} `} >{el?.message}</p>
                            </div>
                        ))}

                        </div>
                        
                    : null }
                </div>

                <form className="relative bottom-0 ">
                        <input
                            type="text"
                            className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK"
                            placeholder="메세지를 입력하세요."


                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-2"
                            onClick={handleWholeRead}
                        >
                            <SendButton width={"30px"} height={"30px"} />
                        </button>
                    </form>
            </div>
        </div>
    )
}