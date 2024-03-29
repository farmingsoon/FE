"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import SendButton from "../../../public/svg/SendButton";
import ChatListItem from "@/components/chat/ChatListItem";
import BookmarkSVG from "../../../public/svg/BookmarkSVG";
import Pagination from "@/common/Pagination";

export default function TestChatPage (){
    const userId = 1;
    const [ wholeRead, setWholeRead ] = useState(false);
    const dummyData = [
        {
            senderId: 1,
            message: "15: 여섯 -끝",
            isRead: false
        },
        {
            senderId: 1,
            message: "14: 넷",
            isRead: false
        },
        {
            senderId: 2,
            message: "13: 셋",
            isRead: true
        },
        {
            senderId: 2,
            message: "12: 둘",
            isRead: true
        },
        {
            senderId: 1,
            message: "11: 하나",
            isRead: true
        },
        {
            senderId: 2,
            message: "10: 10",
            isRead: true
        },
        {
            senderId: 1,
            message: "09: 도착 전에 연락 줘",
            isRead: false
        },
        {
            senderId: 1,
            message: "08: 얍얍 알겠습니다",
            isRead: false
        },
        {
            senderId: 2,
            message: "07: 내일 만나요",
            isRead: true
        },
        {
            senderId: 2,
            message: "06: ㄱㄱ하시져",
            isRead: true
        },
        {
            senderId: 1,
            message: "05: 서울 거래 부탁합니다.",
            isRead: true
        },
        {
            senderId: 2,
            message: "04: 예",
            isRead: true
        },
        {
            senderId: 1,
            message: "03: 판매하시나요?",
            isRead: true
        },
        ,
        {
            senderId: 2,
            message: "02: 안녕",
            isRead: true
        },
        {
            senderId: 1,
            message: "01: 안녕하세요",
            isRead: true
        }
    ]

    const chatList = [
        {
            chatRoomId: 0,
            toUserName: "감귤밭",
            toUserProfileImage: "https://s3.ap-northeast-2.amazonaws.com/farming-bucket/Member/2024_03_16/64938d65-95cb-4aed-9ccc-0e5dd8ed8c9e.png",
            lastMessage: "안녕하십니까",
            lastChatTime: "2024-03-19T17:18:38.46959",
            unReadMessageCount: 3,
        }
    ]


    const handleWholeRead = (e: any) => {
        e.preventDefault();
        setWholeRead(!wholeRead);
    };

    const chatBottomRef = useRef<HTMLDivElement>(null);

    //클라이언트 사이드에서만 동작
    useEffect(() => {
        const scrollState = window.document.querySelector("#chatInside");
        if(scrollState){
            console.log("스크롤 위치 조정 합니다!!")
            scrollState.scrollTop = scrollState.scrollHeight;
        } 

    }, []);

    useEffect(() => {
        if(chatBottomRef.current){
            chatBottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [wholeRead]);


    const [likeStatus, setLikeStatus]  = useState(false);

    const handleClick = ( ) => {

        setLikeStatus(!likeStatus)

    };

    const [activeBtn, setActiveBtn] = useState(0)

    return (
        <div className="flex h-full">
            {/* <div className="min-w-48 border-r border-LINE_BORDER whitespace-nowrap bg-white">
                <div className="flex flex-row justify-between px-3 items-cneter">
                <h1 className="font-semibold ">채팅</h1>

                <button onClick={() =>  handleClick()} className=" p-2 hover:bg-purple-300 z-10">
                    <BookmarkSVG width={"15px"} height={"15px"}  likeStatus={likeStatus}/>
                </button>

                </div>
                <div className="overflow-y-auto max-h-full h-fit mt-12 border-t border-LINE_BORDER">
                    {chatList && chatList.length > 0 ? (
                        chatList.map((list, idx) => <ChatListItem key={idx} list={list} />)
                    ) : (
                        <p className="text-sm font-normal mx-auto">
                        개설된 채팅방이 없습니다.{" "}
                        </p>
                    )}

                </div>
            </div> */}
            <Pagination pageInfo={{
                totalPageSize: 3,
                totalElementSize: 15,
                page: 1,
                hasNext: true,
                hasPrevious: false,
                pagesize: 5,
                elementSize: 5
            }} activeBtn={activeBtn} setActiveBtn={setActiveBtn} />

            {/* 채팅 방 섹션 fles-grow*/}
            {/* <div className="flex flex-col flex-grow min-w-[600px] max-w-[800px] ">

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

                <div id="chatInside" className="h-full flex flex-col px-2 bg-pink-600  overflow-y-auto" >
                    
                    {dummyData.length > 0 ? 
                        // <div className="bg-black h-full ">
                            
                            <div className="flex flex-col-reverse pb-3 bg-indigo-200 h-full overflow-y-auto" >
                                <div ref={chatBottomRef}></div>
                                {dummyData.map((el, idx) => (
                                <div key={idx} className={`flex flex-row items-center ${el?.senderId === userId ? "self-end" : "self-start"}`} >
                                    <p className={`text-[10px] font-light text-POINT_RED mr-3 ${wholeRead ? "invisible" : ""}`}>
                                        {el?.isRead === false && el.senderId === userId || wholeRead === false && el?.senderId === userId && el?.isRead === false ? 1 : null}
                                        
                                    </p>    
                                    <p key={idx} className={`my-3 text-white text-center p-1 rounded-md ${el?.senderId === userId ? "bg-indigo-400" : "bg-black"} `} >{el?.message}</p>
                                </div>
                                ))}
                                <div className="w-fit mx-auto my-1 p-2 bg-zinc-200 rounded-lg text-LINE_BORDER text-sm">Loading...</div>
                            </div>
                            
                        // </div>
                        
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
            </div> */}
        </div>
    )
}