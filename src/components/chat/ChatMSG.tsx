import Img from "@/common/Img";
import { message } from "@/types/chat";
import LocalStorage from "@/util/localstorage";
import { itemChatInfoTypes } from "./ChatProductItem";

interface ChatMSGTypes {
    message: message;
    curDetailChatInfo: itemChatInfoTypes;
    wholeRead: boolean;
    msgIdx: number;

}

const ChatMSG = ({message, curDetailChatInfo, wholeRead, msgIdx}: ChatMSGTypes) => {
    const userId = Number(LocalStorage.getItem("memberId"));

    return(
        <div className={`flex flex-row items-center ${message.senderId === userId ? "self-end" : "self-start"}`} key={msgIdx} >
            {message.senderId === userId ? null : (
            <div className="flex flex-col items-center mr-3">
                <p className="text-xs pb-1"> {curDetailChatInfo?.toUsername} </p>
                <div className="">
                <Img
                    type={"circle"}
                    src={curDetailChatInfo?.toUserProfileImage}
                    width={35}
                    height={35}
                />
                </div>
            </div>
            )}
            <p className={`text-[10px] font-light text-POINT_RED mr-3 ${wholeRead ? "invisible" : ""}`}>
                { message?.isRead === false && message.senderId === userId || wholeRead === false && message?.senderId === userId && message?.isRead === false ? 1 : null }
            </p>
            <p className={`px-2 my-2 py-3 rounded-lg w-fit ${message.senderId === userId ? "bg-indigo-400 text-white " : "bg-[#87dac2] text-white "}`} >
                {message.message}
            </p>     
        </div>
    )
};

export default ChatMSG;