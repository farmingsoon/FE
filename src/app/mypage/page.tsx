"use client";
import Img from "@/common/Img";
import MineItem from "@/components/MineItem";
import LocalStorage from "@/util/localstorage";
import axios from "axios";
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
    const [ mineData, setMineData  ] = useState<MypageTypes>();
    const mineItemDatas = [
        {id: 1, title: "자전거", view: 10, liked: 8, price: 100000, thumbnail: null},
        {id: 2, title: "인형", view: 2, liked: 5, price: 5000, thumbnail: null},
        {id: 3, title: "돼지저금통", view: 10, liked: 8, price: 100000, thumbnail: null},
        {id: 4, title: "목걸이", view: 7, liked: 5, price: 5000, thumbnail: null},
        {id: 5, title: "귀걸이", view: 109, liked: 8, price: 106500, thumbnail: null},
    ]

    const handleGetMine = async () => {
        try { 
            const res = await axios.get(`${BASE_URL}/api/items/bid/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if(res.status === 200){
                const data = res.data.result.items;
                setMineData(data);
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
                    { mineItemDatas 
                        ? mineItemDatas.map((item, idx) => (<MineItem key={idx} data={item} type={"bidded"}/>)) 
                        : <div className="h-32"></div>
                    }
                </div>
            </div>
            <div className="mt-5">
                <h1>입찰한 상품</h1>
                <div className="border-b border-t border-LINE_BORDER h-fit max-w-[800px]">
                    { mineItemDatas 
                        ? mineItemDatas.map((item, idx) => (<MineItem key={idx} data={item} type={"sold"}/>)) 
                        : <div className="h-32"></div>
                    }
                </div>
            </div>
        </div>
    )
}