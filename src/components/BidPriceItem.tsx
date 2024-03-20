import Img from "@/common/Img";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { axiosCall, rotateRefresh } from "@/util/axiosCall";
import { bidCheckState } from "@/stores/bidCheckState";

import { BidRecordItemTypes } from "./modal/SellerBidModal";
import CheckBox from "../../public/svg/CheckBox";
import { useRouter } from "next/navigation";
import axios from "axios";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";


interface BidPriceTypes {
    data: BidRecordItemTypes;
    type: "buyer" | "seller";
    itemId: number;
    itemStatus: string | undefined;
}

const BidPriceItem = ( {data, type, itemId, itemStatus}: BidPriceTypes ) => {
    const [ checkState, setCheckState ] = useRecoilState(bidCheckState);
    const [, setOpenTokenModal] = useRecoilState(tokenState);
    const [check, setCheck] = useState(false);
    const userId = Number(LocalStorage.getItem("memberId"))
    const router = useRouter();
    const btnStyle = "bg-white border border-LINE_BORDER rounded-md px-3 mx-1.5 py-1 font-semibold text-sm my-3 hover:bg-zinc-200";
    const checkBoxStyle = check ? `bg-POINT_RED relative` : ``;

    const handleClick = () => {
        setCheckState({
            isCheck: !checkState.isCheck,
            buyerId: data.bidderId,
            awardPrice: data.price,
        });
        setCheck(!check);
    }

    const formatPrice = (price: number | null) => {
        if(price == null) return 0;
        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleDelete = async (bidId: number) => {
        const url = `https://server.farmingsoon.site/api/bids/${bidId}`;
        const config = { withCredentials: true };

        try { 
            const res = await axios.delete(url, config);

            if(res.status === 200){
                console.log(`${bidId} 입찰 내역 삭제 성공`)
            }

        } catch (err){
            console.log(`입찰 내역 삭제 ${err}`);
            if(axios.isAxiosError(err) && err.response) {
              const status = err.response.status;
              const errorMessage = err.response.data.message;
              
              if(status === 401){
                if(errorMessage === "기한이 만료된 AccessToken입니다."){
                  // Access Token expired 
                  console.log("AccessToken 만료");
                  rotateRefresh();
                }
          
                if(errorMessage === "기한이 만료된 RefreshToken입니다"){
                  console.log("RefreshToken 만료로 모달 오픈 ")
                  setOpenTokenModal({ tokenExpired: true });
                }
                  
              }
          
              if(status === 403){
                //로그인 후 이용할 수 있습니다. 
                setOpenTokenModal({ tokenExpired: true });
              }
            };

        }
    };

    const handleChatting = async (buyerId: number, itemId: number) => {
        if(buyerId && itemId && checkState.isCheck){
            const url = "/api/chat-rooms";
            const body = {
                buyerId: buyerId,
                itemId: checkState.awardPrice,
            };
            const config = { withCredentials: true }


            try{ 
                const res = await axiosCall(url, "POST", body, config);

                if(res.status === 200){
                    const chatRoomId = res.data.result;
                    console.log("채팅방 생성 성공 ", chatRoomId);
                    router.push(`/chat/${chatRoomId}`)
                };

            } catch (err){
                console.log(`채팅하기 ${err}`);    
                if(axios.isAxiosError(err) && err.response) {
                  const status = err.response.status;
                  const errorMessage = err.response.data.message;
                  
                  if(status === 401){
                    if(errorMessage === "기한이 만료된 AccessToken입니다."){
                      // Access Token expired 
                      console.log("AccessToken 만료");
                      rotateRefresh();
                    }
              
                    if(errorMessage === "기한이 만료된 RefreshToken입니다"){
                      console.log("RefreshToken 만료로 모달 오픈 ")
                      setOpenTokenModal({ tokenExpired: true });
                    }
                      
                  }
              
                  if(status === 403){
                    //로그인 후 이용할 수 있습니다. 
                    setOpenTokenModal({ tokenExpired: true });
                  }
                };
                

            }
        }
    };

    return(
        <div className="py-3 my-1 font-semibold text-sm flex flex-row items-center border-b border-LINE_BORDER">
            <div className="overflow-hidden rounded-full">
                <Img type={"circle"} src={data.bidderProfileUrl} width={40} height={40} />
            </div>
            <span className="flex-1 text-TEXT_BLACK ml-3 w-80">{data.bidderName} 님이 <span className="text-MAIN_COLOR">{formatPrice(data && data.price)}</span>원을 제시하였습니다. </span>

            {itemStatus === "판매완료"
                ? null
                : 
                <>
                    <div className={`border border-LINE_BORDER rounded-full w-6 h-6 mr-2 overflow-hidden ${checkBoxStyle}`} onClick={handleClick}>
                    {check && <span className="absolute top-1.5 left-1.5"><CheckBox width={"10px"} height={"10px"}/></span>}
                    <input className="appearance-none" type="checkbox"/>
                    </div>
                    <div className="">
                        {type === "seller" ?  <button className={btnStyle} onClick={() => handleChatting( checkState.buyerId, itemId)} >채팅</button> : null}
                        {type === "buyer" && data.bidderId === userId ?  <button className={btnStyle} onClick={(e) => {e.preventDefault(); handleDelete(data.bidId)}}>삭제</button> : null}
                    </div>
                </>

            }
        </div>
    )
}

export default BidPriceItem;
