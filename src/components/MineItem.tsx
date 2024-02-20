import Img from "@/common/Img";
import StatusPrice from "./StatusPrice";
import { MypageTypes } from "@/app/mypage/page";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { mineItemSelector } from "@/stores/mineItem";

interface MineItemTypes {
    type: "bidded" | "sold";
    data: MypageTypes;
}

const MineItem = ({type, data}: MineItemTypes) => {
    const router = useRouter();
    const [ mineClick, setMineClick ] = useRecoilState(mineItemSelector);

    const formatDate = (date: string) => {
        const expiredAtDate = new Date(date);
        const curDate = new Date();
        const timeLeft = expiredAtDate.getTime() - curDate.getTime();

        const dayLeft = Math.floor(timeLeft /  (1000 * 60 * 60 * 24));
        const hourLeft =  Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

        return (`${dayLeft}일  ${hourLeft}시간`);
    };


    const handleClick = (itemId: number, highPrice:number, lowPrice:number, type: string) => {
        console.log("MineItem 버튼 클릭")
        console.log(mineClick)
        console.log(itemId)
        console.log(type)
        if(type === "seller"){
            setMineClick((prev) => ({
                ...prev,
                itemId: itemId,
                highestPrice: highPrice,
                lowestPrice: lowPrice,
                sellerBidOpen: true,
            }));
        };

        if(type === "buyer"){
            setMineClick((prev) => ({
                ...prev,
                itemId: itemId,
                highestPrice: highPrice,
                lowestPrice: lowPrice,
                buyerBidOpen: true,
            }));
        };
    }

    return(
        <div className="my-2 flex flex-row whitespace-nowrap" >
            <div className="flex flex-row flex-1" onClick={(e) => {e.preventDefault(); router.push(`/product/detail/${data && data.itemId}`)}} >
                <div className="overflow-hidden mr-3 "><Img src={data.thumbnailImgUrl} type={"normal"} width={96} height={96}/></div>
                <div className=" flex flex-col text-base  py-3 justify-around min-w-64">
                    <div>{data.title}</div>
                    <StatusPrice bidStatus={data.itemStatus} highestPrice={data.highestPrice} hopePrice={data.hopePrice} />
                    <div className="text-xs font-light  ">{data && formatDate(data.expiredAt)}</div>
                </div>
            </div>
            <div className="flex px-5">
                {type === "bidded" 
                    ? <button 
                        className="text-POINT_BLUE font-semibold text-sm" 
                        onClick={() => handleClick(data.itemId, data.highestPrice, data.lowestPrice, "seller")} 
                        >입찰 내역 보기
                    </button>
                    : <button 
                        className="text-POINT_BLUE font-semibold text-sm"
                        onClick={() => handleClick(data.itemId, data.highestPrice, data.lowestPrice, "buyer")} 
                        >채팅 내역 보기
                    </button>
                }
            </div>
        </div>
    )
}

export default MineItem;