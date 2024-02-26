"use client";
import MineItem from "@/components/MineItem";
// import { axiosCall } from "@/util/axiosCall";
import axios from "axios";
import { useEffect, useState } from "react";

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
    const [ likeData, setLikeData ] = useState<MypageTypes[]>([]);

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
            console.log(likeRes.data.result.items);


        } catch (Err){
            console.log(`마이페이지 에러 ${Err}`)
        }
    };

    useEffect(() => {
        handleGetMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        </div>
    )
}