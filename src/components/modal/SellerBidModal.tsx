"use client";
import { useEffect, useState } from "react";
import { axiosCall } from "@/util/axiosCall";
import { ModalTypes } from "@/types/Modal";

import { 
    useRecoilValue } from "recoil";
import { bidCheckState } from "@/stores/bidCheckState";
import Close from "../../../public/svg/Close";
import BidPriceItem from "../BidPriceItem";


interface SellerBidModalTypes extends ModalTypes {
    itemId: string;
    priceData: (number | undefined)[];
    itemStatus: string | undefined;
}

export interface BidRecordItemTypes {
    bidderName: string;
    bidderProfileUrl: string;
    bidderId: number;
    bidId: number;
    itemId: number;
    itemName: string;
    price: number;
}

const SellerBidModal = ({handleOpen, itemId, priceData, itemStatus}: SellerBidModalTypes) => {
    const [ bidRecord, setBidRecord ] = useState<BidRecordItemTypes[]>([])
    const checkState = useRecoilValue(bidCheckState);
    //priceData[0] : 최고가 , priceData[1] : 최저가 
    console.log(checkState)

    const formatPrice = (price: number | undefined) => {
        if(price === undefined){
            return 0;
        };

        return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const averagePrice = (highestPrice: number | undefined , lowestPrice: number | undefined) => {
        if(highestPrice === undefined || lowestPrice === undefined)return 0;
        const average =  Math.floor(highestPrice + lowestPrice)/2;

        return String(average).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    const getBidRecord = async () => {
        const url = `/api/bids?itemId=${itemId}`;
        const config = { withCredentials: true };

        try { 
            const res = await axiosCall(url, "GET", config);
            setBidRecord(res.bids);

        } catch (err) {
            console.log(`입찰내역 ${err}`)
            // if(axios.isAxiosError(err) && err.response){
            //     if(err.response.status === 401){
            //         //token모달 열기 
            //         setOpenTokenModal({tokenExpired: true});
            //     }
                
            // }
        }
    };

    const handleSoldOut = async (itemId: number, buyerId: number) => {
        const url = `/api/items/${itemId}/sold-out`;
        const config = { withCredentials: true };
        const soldBody = { buyerId: buyerId, awardPrice:  checkState.awardPrice}

        try { 
            const res = await axiosCall(url, "PATCH", soldBody, config);

            if(res.status === 200){
                handleOpen();
            };

        } catch (err){
            console.log(err);
        }
    };
    
    useEffect(() => {
        getBidRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="fixed inset-0 ml-52 z-10 flex items-end justify-center w-screen min-h-full p-4 overflow-y-auto text-center transition-opacity bg-gray-500 bg-opacity-75 sm:items-center sm:p-0">
            <div className="relative px-8 pb-10 pt-5 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-[600px]" style={{ marginLeft: '-12rem' }} >
                <div className="p-1 rounded-md float-end hover:bg-zinc-100" onClick={handleOpen}><Close width={"25px"} height={"25px"}/></div>
                <div className="text-xl mb-2 font-semibold mt-8">입찰 내역 </div>
                <div className="font-light text-sm">현재 입찰들어온 내역입니다. </div>
                <div className="text-sm flex flex-row mt-8">
                    <div className="font-light whitespace-nowrap mr-6">
                        <span className="font-semibold text-POINT_BLUE">평균가</span> {averagePrice(priceData[0], priceData[1])} 원
                    </div>
                    <div className="font-light whitespace-nowrap mr-6">
                        <span className="font-semibold text-MAIN_COLOR">최저가</span> {formatPrice(priceData[1])} 원
                    </div>
                    <div className="font-light whitespace-nowrap">
                        <span className="font-semibold text-POINT_RED">최고가</span> {formatPrice(priceData[0])} 원
                    </div>
                </div>
                <div className="my-3 border-b border-LINE_BORDER"></div>
                <div className="divide-x-2 text-xs font-light my-5">
                    <button className={`pr-2`}>고가순</button>
                    <button className={`pl-2`}>저가순</button>
                </div>
                <div className="flex flex-col mb-8">
                    { bidRecord && bidRecord.length > 0 
                        ? bidRecord.map((item:BidRecordItemTypes , idx) => (
                        <BidPriceItem key={idx} data={item} type={"seller"} itemId={Number(itemId)} itemStatus={itemStatus} /> )) 
                        : <div className="mx-auto text-LINE_BORDER font-normal h-10 pt-5">아직 입찰 내역이 없습니다. </div>
                    }
                    {/* {itemStatus === "판매완료" 
                        ?  <BidSoldItem />
                        : null
                    } */}
                </div>
                {itemStatus === "판매완료"
                    ? <p className="text-center font-light text-sm">&quot; 판매가 완료된 상품입니다. &quot;</p>
                    : <div className="flex flex-col items-center">
                            <button
                                className="mt-14 bg-MAIN_COLOR hover:bg-DEEP_MAIN text-white px-8 py-2 rounded-md text-sm "
                                onClick={(e) => {e.preventDefault(); handleSoldOut(Number(itemId), checkState.buyerId)}}
                            >입찰하기</button>
                        </div>     
                }
            </div>
        </div>
    )
}

export default SellerBidModal;