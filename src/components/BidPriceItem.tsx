import Img from "@/common/Img";
import { useState } from "react";
import CheckBox from "../../public/svg/CheckBox";
import { BidRecordItemTypes } from "./modal/SellerBidModal";
import { useRecoilState } from "recoil";
import { bidCheckState } from "@/stores/bidCheckState";
import axios from "axios";
import LocalStorage from "@/util/localstorage";
import { tokenSelector } from "@/stores/tokenModal";
import { useRouter } from "next/navigation";
import { refreshToken } from "@/util/refreshToken";
import { ModalTypes } from "@/types/Modal";

interface BidPriceTypes {
    data: BidRecordItemTypes;
    type: "buyer" | "seller";
    itemId: number;
}

const BidPriceItem = ( {data, type, itemId}: BidPriceTypes ) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const ACCES_TOKEN = LocalStorage.getItem("accessToken");
    const [ checkState, setCheckState ] = useRecoilState(bidCheckState);
    const [ , setOpenTokenModal ] = useRecoilState(tokenSelector);
    const [check, setCheck] = useState(false);
    const router = useRouter();
    const btnStyle = "bg-white border border-LINE_BORDER rounded-md px-3 mx-1.5 py-1 font-semibold text-sm my-3 hover:bg-zinc-200";
    const checkBoxStyle = check ? `bg-POINT_RED relative` : ``;
    console.log(checkState)
    const handleClick = () => {
        setCheckState({
            isCheck: !checkState.isCheck,
            buyerId: data.bidderId,
        });
        setCheck(!check);
    }

    const formatPrice = (price: number) => {
        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleDelete = async (bidId: number) => {
        try { 
            const res = await axios.delete(`${BASE_URL}/api/bids/${bidId}`, {
                headers: {
                    Authorization: `Bearer ${ACCES_TOKEN}`
                }
            });

            if(res.status === 200){
                console.log(`${bidId} 입찰 내역 삭제 성공`)
            }

        } catch (err){
            console.log(`입찰 내역 삭제 ${err}`);
            if(axios.isAxiosError(err) && err.response){
                if(err.response.status === 401){
                    //token모달 열기 
                    setOpenTokenModal({tokenExpired: true});
                }
                
            }
        }
    };

    const handleChatting = async (buyerId: number, itemId: number) => {
        if(buyerId && itemId && checkState.isCheck){
            try{ 
                const res = await axios.post(`${BASE_URL}/api/chat-rooms`, {
                    buyerId: buyerId,
                    itemId: itemId
                }, {
                    headers: {
                        Authorization: `Bearer ${ACCES_TOKEN}`
                    }
                });

                if(res.status === 200){
                    const chatRoomId = res.data.result;
                    console.log("채팅방 생성 성공 ", chatRoomId);
                    router.push(`/chat/${chatRoomId}`)
                };

            } catch (err){
                console.log(`채팅하기 ${err}`);
                if (axios.isAxiosError(err) && err.response) {
                    if (err.response.status === 401) {
                        refreshToken();
                    }
                  }
            }
        }
    };

    return(
        <div className="py-2 my-0.5 font-semibold text-sm flex flex-row items-center">
            <div className="overflow-hidden rounded-full">
                <Img type={"circle"} src={data.bidderProfileUrl} width={40} height={40} />
            </div>
            <span className="flex-1 text-TEXT_BLACK ml-3 w-80">{data.bidderName} 님이 <span className="text-MAIN_COLOR">{formatPrice(data && data.price)}</span>원을 제시하였습니다. </span>
            <div className={`border border-LINE_BORDER rounded-full w-6 h-6 mr-2 overflow-hidden ${checkBoxStyle}`} onClick={handleClick}>
                {check && <span className="absolute top-1.5 left-1.5"><CheckBox width={"10px"} height={"10px"}/></span>}
                <input className="appearance-none" type="checkbox"/>
            </div>
            <div className="">
                {type === "seller" ?  <button className={btnStyle} onClick={() => handleChatting( checkState.buyerId, itemId)} >채팅</button> : null}
                {type === "buyer" ?  <button className={btnStyle} onClick={(e) => {e.preventDefault(); handleDelete(data.bidId)}}>삭제</button> : null}
            </div>
        </div>
    )
}

export default BidPriceItem;
