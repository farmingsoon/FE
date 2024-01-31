import Img from "@/common/Img";

const ChatListItem = () => {
    return(
        <div className="py-3 px-4 flex flex-row hover:bg-[#F4F4F4]">
            <div className="overflow-hidden rounded-full "><Img type={"circle"} src={undefined} width={40} height={40} /></div>
            <div className="font-normal flex flex-col ml-3 w-60">
                <div className="mb-1">사용자</div>
                <div className="font-light text-xs text-DARK_GRAY">언제 가능 하세요? : 채팅 가장 최신 내역 </div>
            </div>
            <div className="font-light text-xs text-DARK_GRAY">2분전</div>
        </div>
    )
}

export default ChatListItem;