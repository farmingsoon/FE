
import Img from "@/common/Img";
import LocalStorage from "@/util/localstorage";
import axios from "axios";
import { useEffect, useState } from "react";

interface ChatProducItemTypes {
    chatRoomId: string;
}

export interface itemChatInfoTypes {
    itemId: number;
    itemTitle: string;
    itemThumbnailImage: string;
    highestPrice: number;
    toUserProfileImage: string;
}

const ChatProductItem = ({chatRoomId}:ChatProducItemTypes ) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const ACCES_TOKEN = LocalStorage.getItem("accessToken");
    const [curChatInfo, setCurChatInfo ] = useState<itemChatInfoTypes>();

    const formatPrice = (price: number | null | undefined) => {
        if (price === null) return "0";
        if (price === undefined) return "0";
        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        const getChatRoomInfo = async () => {
            try { 
                const res = await axios.get(`${BASE_URL}/api/chat-rooms/${chatRoomId}`, {
                    headers: {
                        Authorization: `Bearer ${ACCES_TOKEN}`
                    }
                });

                if(res.status === 200){
                    setCurChatInfo(res.data.result);
                }
            } catch (err){
                console.log(`채팅 관련 상품 정보 에러 ${err}`)
            }
        };

        getChatRoomInfo();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoomId])


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