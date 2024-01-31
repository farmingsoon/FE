import Img from "@/common/Img";
import BookmarkSVG from "../../public/svg/BookmarkSVG";

const BidSoldItem = () => {
    return(
        <div className="p-2 my-0.5 font-semibold text-sm flex flex-row items-center rounded-md bg-[#6D6D6D] scale-105" >
            <span className="z-10 absolute -top-1 right-4"><BookmarkSVG width={"45px"} height={"40px"} fillColor={"#FF7171"}/>
                <span className="absolute top-2 left-3 font-medium text-white text-xs">낙찰</span>
            </span>
            <div className="overflow-hidden rounded-full"><Img type={"circle"} src={undefined} width={40} height={40} /></div>
            <span className="text-TEXT_BLACK ml-3 w-80">사용자 님이 <span className="text-MAIN_COLOR">27,000</span>원을 제시하였습니다. </span>
        </div>  
    )
}

export default BidSoldItem;