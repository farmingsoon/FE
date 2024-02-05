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

    return(
        <div className="w-64 h-[340px] p-2 flex flex-col bg-zinc-50 rounded-lg duration-500 hover:scale-105 hover:shadow-xl">
            <div className="h-[240px] flex items-center">
                <Img src={data && data.thumbnailImgUrl} type={"normal"} width={240} height={240}/>
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
            <div className="text-sm font-light mt-2">서울 ・ 3일 2시간 남음</div>
        </div>
    )
}

export default HomeItem;