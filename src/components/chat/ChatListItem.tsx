import { useRouter } from "next/navigation";
import Img from "@/common/Img";
import { chatListTypes } from "@/types/chat";


interface chatListItemTypes {
    list: chatListTypes
}

const ChatListItem = ( {list}:chatListItemTypes ) => {
    const router = useRouter();

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
    };

    const moveToChatRoom = async (chatRoomId: number) => {

        if(chatRoomId){
            try { 
                console.log("채팅 방 이동하기 :", chatRoomId)
                router.push(`/chat/${chatRoomId}`)

            } catch (err){
                console.log(err);
            }
        }
    };

    return(
        <div className="border mr-1 rounded-lg duration-500 overflow-none hover:shadow-xl my-1.5 h py-3 px-4 flex flex-row hover:bg-[#F4F4F4] " onClick={() => moveToChatRoom(list.chatRoomId)}>
            <div className="overflow-hidden rounded-full "><Img type={"circle"} src={list.toUserProfileImage} width={40} height={40} /></div>
            <div className="font-normal flex flex-col ml-3 w-60">
                <div className="mb-1">{list.toUserName}</div>
                <div className="font-light text-xs text-DARK_GRAY flex flex-row items-center">
                    <div>{list.lastMessage}</div>
                    {list.unReadMessageCount > 0 
                        ? <div className="w-4 h-4 text-center items-center text-[10px] rounded-full bg-POINT_RED text-white ml-2 font-light">{list.unReadMessageCount}</div>
                        : null
                    }
                </div>
            </div>
            <div className="font-light text-xs text-DARK_GRAY">{formatTime(list.lastChatTime)} 전</div>
        </div>
    )
}

export default ChatListItem;