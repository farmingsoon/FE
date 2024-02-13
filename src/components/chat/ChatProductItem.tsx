import { itemChatInfoTypes } from "@/app/chat/[id]/page";
import Img from "@/common/Img";

interface ChatProducItemTypes {
    curChatInfo?: itemChatInfoTypes;
}

const ChatProductItem = ({curChatInfo}:ChatProducItemTypes ) => {

    const formatPrice = (price: number | null | undefined) => {
        if (price === null) return "0";
        if (price === undefined) return "0";
        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return(
        <div className="flex flex-row w-full bg-[#F4F4F4] p-3">
            <Img type={"normal"} src={curChatInfo && curChatInfo.itemThumbnailImage} width={45} height={45 } />
            <div className="flex-1 ml-3">
                <div className="font-normal text-md mb-1">{curChatInfo && curChatInfo.itemTitle}</div>
                <div className="text-xs font-light">현재 최고가 
                    <span className="font-normal text-MAIN_COLOR mx-1 ">₩ {formatPrice(curChatInfo && curChatInfo.highestPrice)}</span> 원
                </div>
            </div>
        </div>
    )
}

export default ChatProductItem;