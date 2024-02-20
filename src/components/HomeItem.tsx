"use client";
import Img from "@/common/Img";
import PersonSVG from "../../public/svg/PersonSVG";
import BookmarkSVG from "../../public/svg/BookmarkSVG";
import { MerchanTypes } from "@/app/page";
import StatusPrice from "./StatusPrice";

export interface HomeItemTypes {
    data: MerchanTypes;
}

const HomeItem = ({data}: HomeItemTypes) => {
    // const [ bidStatus, setBidStatus ] = useState("경매중");
    const formatDate = (date: string | undefined) => {
        if(date){
            const expiredAtDate = new Date(date);
            const curDate = new Date();
            const timeLeft = expiredAtDate.getTime() - curDate.getTime();
    
            const dayLeft = Math.floor(timeLeft /  (1000 * 60 * 60 * 24));
            const hourLeft =  Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    
            return (`${dayLeft}일  ${hourLeft}시간`);
        }
        return;
    }

    return(
        <div className="w-64 h-[340px] p-2 flex flex-col bg-zinc-50 rounded-lg duration-500 hover:scale-105 hover:shadow-xl">
            <div className="w-[240px] h-[240px] flex items-center overflow-hidden relative">
                <Img src={data && data.thumbnailImgUrl} type={"normal"} width={240} height={240}/>
                { data.itemStatus === "판매완료" && 
                    <div className="absolute inset-0 w-full h-full bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center">
                        <div className="font-semibold text-2xl text-white">판매 완료</div>
                    </div>
                }
            </div>
            <div className="flex flex-row mt-1.5 ">
                <div className="flex-1 justify-start text-lg font-semibold">{data.title}</div>
                <div className="flex flex-row text-sm ">
                    <div className="flex flex-row items-center mr-2">
                        <PersonSVG width={"16px"} height={"17px"}/>
                        <span className="ml-1">{data.bidCount}</span>
                    </div>
                    <div className="flex flex-row items-center ml-2">
                        <BookmarkSVG width={"12px"} height={"12px"}/>
                        <span className="ml-1">{data.likeCount}</span>
                    </div>
                </div>
            </div>
            <div className="text-sm">
                <StatusPrice bidStatus={data.itemStatus} highestPrice={data.highestPrice} hopePrice={data.hopePrice}/>
            </div>
            <div className="text-sm font-light mt-2">{formatDate(data.expiredAt)}남음</div>
        </div>
    )
}

export default HomeItem;