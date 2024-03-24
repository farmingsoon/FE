"use client";
import Img from "@/common/Img";
import MineItem from "@/components/MineItem";
import BiddingModal from "@/components/modal/BiddingModal";
import SellerBidModal from "@/components/modal/SellerBidModal";
import { mineItemSelector } from "@/stores/mineItem";
import { rotateRefresh } from "@/util/axiosCall";
import LocalStorage from "@/util/localstorage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "@/stores/tokenModal";

export interface MypageTypes {
    itemId: number;
    title: string;
    description: string;
    expiredAt: string;
    highestPrice: number;
    hopePrice: number;
    lowestPrice: number;
    itemStatus: string | undefined
    bidCount: number;
    likeCount: number;
    viewCount: number;
    thumbnailImgUrl: string;
    likeStatus: boolean;
    awardPrice: number;
}

export default function Mypage() {
    const userProfile = LocalStorage.getItem("userProfileImg");
    const userName = LocalStorage.getItem("userName");
    const isLogin = LocalStorage.getItem("loginState");
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ biddingData, setBiddingData ] = useState<MypageTypes[]>([]);
    const [ saleData, setSaleData ] = useState<MypageTypes[]>([]);
    const [ mineClick, setMineClick ] = useRecoilState(mineItemSelector);
    const [, setOpenTokenModal] = useRecoilState(tokenState);


    const handleGetMine = async () => {
        const bidURL = "https://server.farmingsoon.site/api/items/bid/me";
        const myURL = "https://server.farmingsoon.site/api/items/me";
        const config = {
            withCredentials: true
        };

        try { 
            //입찰한 상품 
            const bidRes = await axios.get(bidURL, config);
            setBiddingData(bidRes.data.result.items);

            //내가 등록한 상품 
            const myRes = await axios.get(myURL, config);
            setSaleData(myRes.data.result.items)

        } catch (Err){
            if(axios.isAxiosError(Err) && Err.response ){
                const status = Err.response.status;
                const errorMessage = Err.response.data.message;
                
                if(status === 401 && errorMessage === "기한이 만료된 AccessToken입니다."){
                    //AT 만료 
                    console.log("AcessToken 만료");
                    rotateRefresh().catch((refreshErr) => {
                        if(refreshErr.message === "RefreshTokenUnauthorized"){
                            setOpenTokenModal({tokenExpired: true})
                        }
                    });
                }

                if(status === 401 && errorMessage === "기한이 만료된 RefreshToken입니다."){
                    setOpenTokenModal({ tokenExpired: true })
                }
                
            };

            console.log(`마이페이지 에러 ${Err}`)
        }
    };

    useEffect(() => {
        if(isLogin === "true"){
            handleGetMine();
            setMounted(true);
        }

        if(isLogin === "false"){
            setOpenTokenModal({tokenExpired: true})
        }
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
                buyerBidOpen: !mineClick.buyerBidOpen
            }));
        }
    };


    return(
        <div className="flex min-h-screen flex-col">
            <div className="p-4 border border-LINE_BORDER rounded-lg flex flex-row items-center max-w-[800px]">
                <div className="overflow-hidden"><Img src={userProfile} type={"circle"} width={64} height={64}/></div>
                <div className="text-lg font-semibold  ml-2">{userName}</div>
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
                        itemStatus={ saleData.find(el => el.itemId === mineClick.itemId)?.itemStatus }
                        
                    />
            }
            {mounted && mineClick.buyerBidOpen 
                && <BiddingModal 
                    handleOpen={ () => handleOpen("buyer") } 
                    itemId={String(mineClick.itemId)}
                    itemStatus={ biddingData.find(el => el.itemId === mineClick.itemId)?.itemStatus }
            />}
        </div>
    )
}