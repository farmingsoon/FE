import Img from "@/common/Img";
import { useState } from "react";
import CheckBox from "../../public/svg/CheckBox";
import { BidRecordItemTypes } from "./modal/SellerBidModal";
import { useRecoilState } from "recoil";
import { bidCheckState } from "@/stores/bidCheckState";
import axios from "axios";
import LocalStorage from "@/util/localstorage";
import { tokenSelector } from "@/stores/tokenModal";

interface BidPriceTypes {
    data: BidRecordItemTypes;
    type: "buyer" | "seller";
}

const BidPriceItem = ( {data, type}: BidPriceTypes ) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const ACCES_TOKEN = LocalStorage.getItem("accessToken");
    const [ checkState, setCheckState ] = useRecoilState(bidCheckState);
    const [ , setOpenTokenModal ] = useRecoilState(tokenSelector);
    const [check, setCheck] = useState(false);
    const btnStyle = "bg-white border border-LINE_BORDER rounded-md px-3 mx-1.5 py-1 font-semibold text-sm my-3 hover:bg-zinc-200";
    const checkBoxStyle = check ? `bg-POINT_RED relative` : ``;

    const handleClick = () => {
        setCheckState({
            isCheck: !checkState.isCheck,
            itemId: data.bidderId,
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
    }

    return(
        <div className="py-2 my-0.5 font-semibold text-sm flex flex-row items-center">
            <div className="overflow-hidden rounded-full"><Img type={"circle"} src={undefined} width={40} height={40} /></div>
            <span className="text-TEXT_BLACK ml-3 w-80">유저1 님이 <span className="text-MAIN_COLOR">{formatPrice(data && data.price)}</span>원을 제시하였습니다. </span>
            {type === "seller" 
                ? <> 
                    <div className={`border border-LINE_BORDER rounded-full w-6 h-6 mr-2 overflow-hidden ${checkBoxStyle}`} onClick={handleClick}>
                    {check && <span className="absolute top-1.5 left-1.5"><CheckBox width={"10px"} height={"10px"}/></span>}
                    <input className="appearance-none" type="checkbox"/>
                    </div>
                    <button className={btnStyle} >채팅</button>
                    <button className={btnStyle} onClick={(e) => {e.preventDefault(); handleDelete(data.bidderId)}}>삭제</button>
                </>
                : null
            }
        </div>
    )
}

export default BidPriceItem;
