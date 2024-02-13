import { chatListTypes } from "@/app/chat/[id]/page";
import Img from "@/common/Img";

interface chatListItemTypes {
    list: chatListTypes
}

const ChatListItem = ( {list}:chatListItemTypes ) => {
    // console.log(list);

    const formatTime = (date: string) => {
        if(date){
            const lastDate = new Date(date);
            const currentDate = new Date();

            const remainingTime = lastDate.getTime() - currentDate.getTime();
            const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

            const dayLeft = Math.floor(remainingDays /  (1000 * 60 * 60 * 24));
            const hourLeft =  Math.floor((remainingDays / (1000 * 60 * 60)) % 24);
            return (`${dayLeft}일  ${hourLeft}시간`);
        }
    }

    return(
        <div className="py-3 px-4 flex flex-row hover:bg-[#F4F4F4]">
            <div className="overflow-hidden rounded-full "><Img type={"circle"} src={list.toUserProfileImage} width={40} height={40} /></div>
            <div className="font-normal flex flex-col ml-3 w-60">
                <div className="mb-1">{list.toUserName}</div>
                <div className="font-light text-xs text-DARK_GRAY">{list.lastMessage}</div>
            </div>
            <div className="font-light text-xs text-DARK_GRAY">{formatTime(list.lastChatTime)} 전</div>
        </div>
    )
}

export default ChatListItem;