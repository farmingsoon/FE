import { chatListTypes } from "@/app/chat/page";
import Img from "@/common/Img";
import { useRouter } from "next/navigation";

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
        // api 웹소켓 가능 여부 확인 추가 예정 
        // api/chat-rooms/1/auth - GET -=> 200 ok 
        // 요청 -> token 만료 -> rotate 요청 후(refreshTOKEN) -> 재 요청 
        //const validURL = `/api/chat-rooms/${params.id}/auth`;
        // const validBody = {
        //     userId: userId
        // }


        if(chatRoomId){
            try { 
                // const validToken = await axiosCall(validURL, "POST", validBody, config);
                // if(validToken.status === 200){
                //     console.log("채팅 방 이동하기 :", chatRoomId)
                //     router.push(`/chat/${chatRoomId}`)
                // }
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
                <div className="font-light text-xs text-DARK_GRAY">{list.lastMessage}</div>
            </div>
            <div className="font-light text-xs text-DARK_GRAY">{formatTime(list.lastChatTime)} 전</div>
        </div>
    )
}

export default ChatListItem;