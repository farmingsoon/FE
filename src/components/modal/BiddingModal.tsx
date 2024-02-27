"use client";
import { useEffect, useState } from "react";

import { axiosCall } from "@/util/axiosCall";
import { ModalTypes } from "@/types/Modal";
import { BidRecordItemTypes } from "./SellerBidModal";
import BidPriceItem from "../BidPriceItem";
import Close from "../../../public/svg/Close";
// import LocalStorage from "@/util/localstorage";
import { tokenSelector } from "@/stores/tokenModal";
import { useRecoilState } from "recoil";


interface BiddingModalTypes extends ModalTypes {
    itemId: string;
    itemStatus : string | undefined;
}

const BiddingModal = ({handleOpen, itemId, itemStatus}: BiddingModalTypes ) => {
    const [ , setOpenTokenModal ] = useRecoilState(tokenSelector);

    const [ bidRecord, setBidRecord ] = useState<BidRecordItemTypes[]>([])
    const [bidValue, setBidValue] = useState("");

    useEffect(() => {
        getBidRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatNumber = (value: string) => {
        return new Intl.NumberFormat().format(Number(value.replace(/,/g, '')));
    }

    const handleBidtoWon = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const formattedNum = formatNumber(value);
        setBidValue(formattedNum);
        // setValue("bid", Number(value.replace(/,/g, '')))
    }

    const submitBidPrice = async (e:any) => {
        e.preventDefault();
        const numbidValue = Number(bidValue.replace(/,/g, ''));

        try {    
            const url = "/api/bids";
            const body = {
                itemId: itemId,
                price: numbidValue,
            };
            const config = { withCredentials: true };

            const res = await axiosCall( url, "POST", body, config );

            if(res.status === 200){
                console.log("입찰 성공");
                handleOpen();
            };

        } catch (err) {
            console.log(`입찰하기 에러 ${err}`)
            setOpenTokenModal({tokenExpired: true})
        }
    }


    //기존 입찰 내역 
    const getBidRecord = async () => {
        try { 
            const url = `/api/bids?itemId=${itemId}`;
            const config = { withCredentials: true };

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


    return(
        <div className="fixed inset-0 ml-52 z-10 flex items-end justify-center w-screen min-h-full p-4 overflow-y-auto text-center transition-opacity bg-gray-500 bg-opacity-75 sm:items-center sm:p-0">
            <div className="relative px-8 pb-10 pt-5 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-fit" style={{ marginLeft: '-12rem' }} >
                <div className="p-1 rounded-md float-end hover:bg-zinc-100" onClick={handleOpen}><Close width={"25px"} height={"25px"}/></div>
                <div className="text-xl mb-2 font-semibold mt-8">입찰하기 </div>
                <div className="">입찰가를 입력 해주세요.</div>
                <form className="mt-3 flex flex-row items-center border rounded-lg border-LINE py-10 px-5" onSubmit={submitBidPrice}>
                    <div className="flex flex-row items-center" >
                        <input 
                            value={bidValue}
                            onChange={handleBidtoWon}
                            type="text" 
                            className="border border-LINE_BORDER px-3 py-1 rounded-lg text-2xl font-base text-right" 
                            placeholder="0"
                        />
                        <div className="font-light text-sm pl-2 whitespace-nowrap">원 (100원 단위)</div>
                    </div>
                    <button 
                        type="submit" 
                        className=" bg-MAIN_COLOR hover:bg-DEEP_MAIN text-white px-8 py-2 rounded-md text-sm  ml-5"
                    >
                        입찰하기
                    </button>
                </form>
                <div className="mt-5">입찰 내역</div>
                <div className="mb-5 overflow-y-scroll max-h-60 py-5 ">
                    {bidRecord && bidRecord.map((item:BidRecordItemTypes , idx) => (
                        <BidPriceItem key={idx} data={item} type={"buyer"} itemId={Number(itemId)} itemStatus={itemStatus}/>
                    ))

                    }
                </div>
            </div>
        </div>
    )
}

export default BiddingModal;