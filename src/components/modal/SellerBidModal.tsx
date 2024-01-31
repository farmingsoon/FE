import { ModalTypes } from "@/types/Modal";
import Close from "../../../public/svg/Close";
import BidPriceItem from "../BidPriceItem";

const SellerBidModal = ({handleOpen}: ModalTypes) => {
    return(
        <div className="fixed inset-0 ml-52 z-10 flex items-end justify-center w-screen min-h-full p-4 overflow-y-auto text-center transition-opacity bg-gray-500 bg-opacity-75 sm:items-center sm:p-0">
            <div className="relative px-8 pb-10 pt-5 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-fit" style={{ marginLeft: '-12rem' }} >
                <div className="p-1 rounded-md float-end hover:bg-zinc-100" onClick={handleOpen}><Close width={"25px"} height={"25px"}/></div>
                <div className="text-xl mb-2 font-semibold mt-8">입찰 내역 </div>
                <div className="font-light text-sm">현재 입찰들어온 내역입니다. </div>
                <div className="text-sm flex flex-row mt-8">
                    <div className="font-light whitespace-nowrap mr-6"><span className="font-semibold text-POINT_BLUE">평균가</span> 185,000원</div>
                    <div className="font-light whitespace-nowrap mr-6"><span className="font-semibold text-MAIN_COLOR">최저가</span> 185,000원</div>
                    <div className="font-light whitespace-nowrap"><span className="font-semibold text-POINT_RED">최고가</span> 185,000원</div>
                </div>
                <div className="my-3 border-b border-LINE_BORDER"></div>
                <div className="divide-x-2 text-xs font-light my-5">
                    <button className={`pr-2`}>고가순</button>
                    <button className={`pl-2`}>저가순</button>
                </div>
                <div className="flex flex-col mb-8">
                    <BidPriceItem />
                </div>
                <div className="flex flex-col items-center">
                    <button className="mt-14 bg-MAIN_COLOR hover:bg-DEEP_MAIN text-white px-8 py-2 rounded-md text-sm ">입찰하기</button>
                </div>     
            </div>
        </div>
    )
}

export default SellerBidModal;