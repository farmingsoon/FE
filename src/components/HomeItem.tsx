import Img from "@/common/Img";
import PersonSVG from "../../public/svg/PersonSVG";
import BookmarkSVG from "../../public/svg/BookmarkSVG";
import { MerchanTypes } from "@/app/page";

export interface HomeItemTypes {
    data: MerchanTypes;
}

const HomeItem = ({data}: HomeItemTypes) => {

    const formatPrice = String(data.highestPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //상태 값에 맞게 가격 적용 조정 필요 

    return(
        <div className="w-64 h-[340px] p-2 flex flex-col bg-zinc-50 rounded-lg duration-500 hover:scale-105 hover:shadow-xl">
            <Img src={null} type={"normal"} width={240} height={240}/>
            <div className="flex flex-row mt-1.5">
                <div className="flex-1 justify-start text-lg font-semibold">{data.title}</div>
                <div className="flex flex-row text-sm ">
                    <div className="flex flex-row items-center mr-2">
                        <PersonSVG width={"16px"} height={"17px"}/>
                        <span className="ml-1">{data.bidSize}</span>
                    </div>
                    <div className="flex flex-row items-center ml-2">
                        <BookmarkSVG width={"12px"} height={"12px"}/>
                        <span className="ml-1">00</span>
                    </div>
                </div>
            </div>
            <div className="text-sm">현재최고가<span className="text-POINT_BLUE"> ₩ {data && formatPrice}</span> 원</div>
            <div className="text-sm font-light mt-2">서울 ・ 3일 2시간 남음</div>
        </div>
    )
}

export default HomeItem;