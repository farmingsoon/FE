import ChatListItem from "@/components/chat/ChatListItem";
import NewWrite from "../../../public/svg/NewWrite";
import ChatProductItem from "@/components/chat/ChatProductItem";
import ReadChat from "@/components/chat/ReadChat";
import SendChat from "@/components/chat/SendChat";
import SendButton from "../../../public/svg/SendButton";

export default function Chat() {

    return (
        <div className="flex min-h-screen">
           <div className="w-[371px] border-r border-LINE_BORDER whitespace-nowrap">
                <div className="flex flex-row justify-between px-3 items-cneter">
                    <h1 className="font-semibold ">채팅</h1>
                    <NewWrite width={"20px"} height={"20px"} />
                </div>
                <div className="mt-12 border-t border-LINE_BORDER overflow-y-scroll">
                    <ChatListItem />
                </div>
           </div>
           <div className="flex-grow flex flex-col h-screen">
                <ChatProductItem />
                <div className="h-full pt-5 px-2 flex flex-col justify-end flex-grow ">
                    <ReadChat />
                    <SendChat />
                </div>
                <form className="relative mt-2 px-2">
                    <input type="text" className="border rounded-lg w-full h-11 px-3 py-1 text-sm font-normal text-TEXT_BLACK" placeholder="메세지를 입력하세요."/>
                    <span className="absolute right-3 top-2"><SendButton width={"30px"} height={"30px"} /></span>
                </form>
           </div>
        </div>
    )
}