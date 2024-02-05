"use client";
import Img from "@/common/Img";
import MineItem from "@/components/MineItem";
import LocalStorage from "@/util/localstorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MypageTypes {
    itemId: number;
    title: string;
    description: string;
    expiredAt: string;
    highestPrice: number;
    hopePrice: number;
    lowestPrice: number;
    itemStatus: string;
    bidSize: number;

}

export default function Login() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = LocalStorage.getItem("accessToken");
    const router = useRouter();
    const [ biddingData, setBiddingData ] = useState<MypageTypes[]>([]);
    const mineItemDatas = [
        // {id: 1, title: "자전거", view: 10, liked: 8, price: 100000, thumbnail: null},
        // {id: 2, title: "인형", view: 2, liked: 5, price: 5000, thumbnail: null},
        {    itemId: 0,
            title: "자전거",
            description: "자전거 판매하는 중이다. ",
            expiredAt: "13",
            highestPrice: 3000,
            hopePrice: 50,
            lowestPrice: 400,
            itemStatus: "경매중",
            bidSize: 3,
        }
    ]

    const handleGetMine = async () => {
        try { 
            //입찰한 상품 
            const bidRes = await axios.get(`${BASE_URL}/api/items/bid/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            //내가 등록한 상품 
            const myRes = await axios.get(`${BASE_URL}/api/items/me`)

            if(bidRes.status === 200){
                const data = bidRes.data.result.items;
                setBiddingData(data);
                console.log(data);
            }

            if(myRes.status === 200){
                const data = myRes.data.result;
                console.log(data);
            }

        } catch (Err){
            console.log(`마이페이지 에러 ${Err}`)
        }
    };

    useEffect(() => {
        handleGetMine();
    }, [])

    return(
        <div className="flex min-h-screen flex-col">
            <div className="p-4 border border-LINE_BORDER rounded-lg flex flex-row items-center max-w-[800px]">
                <div className="overflow-hidden"><Img src={null} type={"circle"} width={64} height={64}/></div>
                <div className="text-lg font-semibold  ml-2">사용자1</div>
            </div>
            <div className="mt-5">
                <h1>판매한 상품</h1>
                <div className="border-b border-t border-LINE_BORDER  h-fit max-w-[800px]">
                    { mineItemDatas  && mineItemDatas.length > 0
                        ? mineItemDatas.map((item, idx) => (<MineItem key={idx} data={item} type={"bidded"}/>)) 
                        : <div className="h-32 border bg-zinc-50 rounded-lg border-LINE_BORDER my-5">
                             <div className="text-sm font-normal">등록한 상품이 없습니다.</div>
                        </div>
                    }
                </div>
            </div>
            <div className="mt-5">
                <h1>입찰한 상품</h1>
                <div className="border-b border-t border-LINE_BORDER h-fit max-w-[800px]">
                    { biddingData && biddingData.length > 0 
                        ? biddingData.map((item:MypageTypes, idx:number) => (<MineItem key={idx} data={item} type={"sold"}/>)) 
                        : <div className="h-32 bg-zinc-100 border rounded-lg border-LINE_BORDER my-5 flex justify-center items-center">
                            <div className="text-sm font-normal">입찰한 상품이 없습니다.</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}