import Img from "@/common/Img";
import { useRouter } from "next/navigation";

interface ChatProducItemTypes {
    curDetailChatInfo?: itemChatInfoTypes;
}

export interface itemChatInfoTypes {
    itemId: number;
    itemTitle: string;
    itemThumbnailImage: string;
    highestPrice: number;
    toUserProfileImage: string;
    toUsername: string;
}

const ChatProductItem = ({curDetailChatInfo}:ChatProducItemTypes ) => {
    const router = useRouter();
    console.log(curDetailChatInfo)
    const formatPrice = (price: number | null | undefined) => {
        if (price === null) return "0";
        if (price === undefined) return "0";
        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleMoveProduct = (itemId: number | undefined) => {
        if(itemId){
            router.push(`/product/detail/${itemId}`);
        }
    }

    return(
        <div className="flex flex-row w-full bg-[#F4F4F4] p-3 hover:cursor-pointer" onClick={() => handleMoveProduct(curDetailChatInfo && curDetailChatInfo.itemId)}>
            <Img type={"normal"} src={curDetailChatInfo && curDetailChatInfo.itemThumbnailImage} width={45} height={45 } />
            <div className="flex-1 ml-3">
                <div className="font-normal text-md mb-1">{curDetailChatInfo && curDetailChatInfo.itemTitle}</div>
                <div className="text-xs font-light">현재 최고가 
                    <span className="font-normal text-MAIN_COLOR mx-1 ">₩ {formatPrice(curDetailChatInfo && curDetailChatInfo.highestPrice)}</span> 원
                </div>
            </div>
        </div>
    )
}

export default ChatProductItem;