"use client";

import SendButton from "../../../public/svg/SendButton";


export default function TestChatPage (){



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
                <div className="flex flex-col-reverse h-full px-2 bg-indigo-300 overflow-y-auto">
             
                    <p className="my-3 text-white text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>
                    <p className="my-3 text-indigo-400 text-center ">채팅 내역이 없습니다.</p>




                </div>
                {/* relative mt-2 px-2 */}
                <form className="relative bottom-0 px-2 ">
                    <input
                        type="text"
                        className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK"
                        placeholder="메세지를 입력하세요."


                    />
                    <button
                        type="submit"
                        onClick={(e) => {
                        console.log("버튼은 눌림");

                        }}
                        className="absolute right-3 top-2"
                    >
                        <SendButton width={"30px"} height={"30px"} />
                    </button>
                </form>
            </div>
        </div>
    )
}