"use client"; 
import Img from "@/common/Img";
import PersonSVG from "../../../../public/svg/PersonSVG";
import BookmarkSVG from "../../../../public/svg/BookmarkSVG";
import ArrowRight from "../../../../public/svg/ArrowRight";
import ArrowLeft from "../../../../public/svg/ArrowLeft";
import { useState } from "react";
import SellerBidModal from "@/components/modal/SellerBidModal";
// import BiddingModal from "@/components/modal/BiddingModal";

export default function ProductDetail() {
    const [biddOpen, setBiddOpen] = useState(false);
    const tempPrice = 10000000;
    const formatPrice = String(tempPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const handleOpen = () => {
        setBiddOpen(!biddOpen);
    }

    return(
        <div className="flex min-h-screen flex-col mb-5 max-w-[900px] min-w-[500px]">
            <div className="text-sm hover:text-DARK_GRAY cursor-pointer mb-3">목록으로</div>
            <div className="flex flex-row justify-center items-center">
                <ArrowLeft width={"25px"} height={"25px"} />
                <div className="overflow-hidden mx-5">
                    <Img src={null} type={"normal"} width={500} height={384} status={"bidding"}/>
                </div>
                <ArrowRight width={"25px"} height={"25px"} />
            </div>

            <div className="flex flex-col mt-5 whitespace-nowrap">
                <div className="flex flex-row justify-between items-center">
                    <div className="overflow-hidden rounded-full"><Img src={null} type={"circle"} width={40} height={40}/></div>
                    <div className="text-lg ml-2 flex-1">사용자1</div>
                    <PersonSVG width={"16px"} height={"17px"}/>
                    <span className="ml-1 mr-5">3</span>
                    <BookmarkSVG width={"12px"} height={"12px"}/>
                    <span className="ml-1">6</span>
                </div>
                <div className="flex flex-row justify-between text-xl mt-2">
                    <h1>카메라 팝니다.</h1>
                    <div className="text-sm ">
                        <button className="bg-white rounded-md px-5 py-1.5 border shadow-lg w-36 hover:bg-zinc-200">채팅하기</button>
                        <button 
                            className="bg-MAIN_COLOR rounded-md px-5 py-1.5 shadow-lg ml-3 w-36 hover:bg-DEEP_MAIN"
                            onClick={handleOpen}
                        >입찰하기
                        </button>
                    </div>
                </div>
                <div className="text-xs font-light my-1">서울 ・ 3일 2시간 남음</div>
                <div className="text-base  mt-3 mb-8">현재최고가<span className="text-POINT_BLUE"> ₩ {formatPrice}</span> 원</div>
                <div className="font-light text-sm">제품명 카메라 어쩌구 저쩌구 저쩌구저저꾸 </div>
            </div>
            {biddOpen && <SellerBidModal handleOpen={handleOpen} />}
        </div>
    )
}