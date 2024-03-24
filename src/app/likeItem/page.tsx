"use client";
import MineItem from "@/components/MineItem";
import BiddingModal from "@/components/modal/BiddingModal";
import SellerBidModal from "@/components/modal/SellerBidModal";
import { mineItemSelector } from "@/stores/mineItem";
import { tokenState } from "@/stores/tokenModal";
import { rotateRefresh } from "@/util/axiosCall";
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
    awardPrice: number;

}

export default function LikeItemPage() {
    const [ likeData, setLikeData ] = useState<MypageTypes[]>([]);
    const [, setOpenTokenModal] = useRecoilState(tokenState);
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ mineClick, setMineClick ] = useRecoilState(mineItemSelector);
    const isLogin = LocalStorage.getItem("loginState");

    const handleGetMine = async () => {
        const url = "/api/likeable-items/me";
        // const config = { withCredentials: true };

        try { 
            //내가 좋아요한 상품 
            //const likeRes = await axiosCall(url, "GET", config);
            const likeRes = await axios.get(`https://server.farmingsoon.site${url}`, {
                withCredentials: true
            })

            setLikeData(likeRes.data.result.items)
            //console.log(likeRes.data.result.items);


        } catch (err){
            if(axios.isAxiosError(err) && err.response){
                const status = err.response.status;
                const errorMessage = err.response.data.message;

                if(status === 401 && errorMessage === "기한이 만료된 AccessToken입니다."){
                    //AT토큰 만료 
                    console.log("AT만료+상품 등록 : ", err)
                    rotateRefresh().catch((refreshErr) => {
                        if(refreshErr.message === "RefreshTokenUnauthorized"){
                            setOpenTokenModal({tokenExpired: true})
                        }
                    });
                };

                if(status === 401 && errorMessage === "기한이 만료된 RefreshToken입니다."){
                    //RT토큰 만료 
                    console.log("RT만료+상품 등록 : ", err);
                    setOpenTokenModal({tokenExpired: true});
                };

                console.log(`마이페이지 에러 : ${err}`);

            }

        }
    };

    useEffect(() => {
        if(isLogin === "true"){
            handleGetMine();
            setMounted(true);
        }

        if(isLogin === "false"){
            setOpenTokenModal({tokenExpired: true});
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
                sellerBidOpen: !mineClick.buyerBidOpen
            }));
        }
    };

    return(
        <div className="flex min-h-screen flex-col">
            <div className="mt-5">
                <h1>보관한 상품</h1>
                <div className="border-b border-t border-LINE_BORDER h-fit max-w-[800px]">
                    { likeData && likeData.length > 0 
                        ? likeData.map((item:MypageTypes, idx:number) => (<MineItem key={idx} data={item} type={"bidded"}/>)) 
                        : <div className="h-32 bg-zinc-100 border rounded-lg border-LINE_BORDER my-5 flex justify-center items-center">
                            <div className="text-sm font-normal">좋아요 한 상품이 없습니다.</div>
                        </div>
                    }
                </div>
            </div>
            {mounted && mineClick.sellerBidOpen 
                && <SellerBidModal 
                        handleOpen={ () => handleOpen("seller") } 
                        itemId={String(mineClick.itemId)} 
                        priceData={[mineClick.highestPrice, mineClick.lowestPrice]}
                        itemStatus={ likeData.find(el => el.itemId === mineClick.itemId)?.itemStatus }
                        
                    />
            }
            {mounted && mineClick.buyerBidOpen 
                && <BiddingModal 
                    handleOpen={ () => handleOpen("buyer") } 
                    itemId={String(mineClick.itemId)}
                    itemStatus={ likeData.find(el => el.itemId === mineClick.itemId)?.itemStatus }
            />}
        </div>
    )
}