"use client";
import Img from "@/common/Img";
import MineItem from "@/components/MineItem";
import BiddingModal from "@/components/modal/BiddingModal";
import SellerBidModal from "@/components/modal/SellerBidModal";
import { mineItemSelector } from "@/stores/mineItem";
import LocalStorage from "@/util/localstorage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export interface MypageTypes {
    itemId: number;
    title: string;
    description: string;
    expiredAt: string;
    highestPrice: number;
    hopePrice: number;
    lowestPrice: number;
    itemStatus: "경매중" | "경매종료" | "판매완료";
    bidCount: number;
    likeCount: number;
    viewCount: number;
    thumbnailImgUrl: string;
    likeStatus: boolean;

}

export default function Login() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = LocalStorage.getItem("accessToken");
    // const userId = LocalStorage.getItem("memberId");
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ biddingData, setBiddingData ] = useState<MypageTypes[]>([]);
    const [ saleData, setSaleData ] = useState<MypageTypes[]>([]);
    const [ mineClick, setMineClick ] = useRecoilState(mineItemSelector);

    const handleGetMine = async () => {
        try { 
            //입찰한 상품 
            const bidRes = await axios.get(`${BASE_URL}/api/items/bid/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if(bidRes.status === 200){
                const data = bidRes.data.result;
                setBiddingData(data.items);
            }

            //내가 등록한 상품 
            const myRes = await axios.get(`${BASE_URL}/api/items/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(myRes.status === 200){
                const data = myRes.data.result;
                setSaleData(data.items)
            }


        } catch (Err){
            console.log(`마이페이지 에러 ${Err}`)
        }
    };

    useEffect(() => {
        handleGetMine();
        setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpen = (type: string) => {
        if(type === "seller"){
            setMineClick((prev) => ({
                ...prev,
                sellerBidOpen: !mineClick.sellerBidOpen
            }));
        };

        if(type === "buyer"){
            setMineClick((prev) => ({
                ...prev,
                sellerBidOpen: !mineClick.buyerBidOpen
            }));
        }
    };


    return(
        <div className="flex min-h-screen flex-col">
            <div className="p-4 border border-LINE_BORDER rounded-lg flex flex-row items-center max-w-[800px]">
                <div className="overflow-hidden"><Img src={null} type={"circle"} width={64} height={64}/></div>
                <div className="text-lg font-semibold  ml-2">사용자1</div>
            </div>
            <div className="mt-5">
                <h1>판매한 상품</h1>
                <div className="border-b border-t border-LINE_BORDER  h-fit max-w-[800px]">
                    { saleData  && saleData.length > 0
                        ? saleData.map((item:MypageTypes, idx:number) => (<MineItem key={idx} data={item} type={"bidded"}  />)) 
                        : <div className="h-32 border bg-zinc-50 rounded-lg border-LINE_BORDER my-5">
                             <div className="text-sm font-normal p-2">등록한 상품이 없습니다.</div>
                        </div>
                    }
                </div>
            </div>
            <div className="mt-5">
                <h1>입찰한 상품</h1>
                <div className="border-b border-t border-LINE_BORDER h-fit max-w-[800px]">
                    { biddingData && biddingData.length > 0 
                        ? biddingData.map((item:MypageTypes, idx:number) => (<MineItem key={idx} data={item} type={"sold"} />)) 
                        : <div className="h-32 bg-zinc-100 border rounded-lg border-LINE_BORDER my-5 flex justify-center items-center">
                            <div className="text-sm font-normal p-2">입찰한 상품이 없습니다.</div>
                        </div>
                    }
                </div>
            </div>
            {mounted && mineClick.sellerBidOpen 
                && <SellerBidModal 
                        handleOpen={ () => handleOpen("seller") } 
                        itemId={String(mineClick.itemId)} 
                        priceData={[mineClick.highestPrice, mineClick.lowestPrice]}
                    />
            }
            {mounted && mineClick.buyerBidOpen && <BiddingModal handleOpen={ () => handleOpen("buyer") } itemId={String(mineClick.itemId)}/>}
        </div>
    )
}