import Img from "@/common/Img";
import StatusPrice from "./StatusPrice";
import { MypageTypes } from "@/app/mypage/page";
import { useRouter } from "next/navigation";

interface MineItemTypes {
    type: "bidded" | "sold";
    data: MypageTypes;
}

const MineItem = ({type, data}: MineItemTypes) => {
    const router = useRouter();
    // const formatPrice = (price: number) => {
    //     return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    // }

    const formatDate = (date: string) => {
        const expiredAtDate = new Date(date);
        const curDate = new Date();
        const timeLeft = expiredAtDate.getTime() - curDate.getTime();

        const dayLeft = Math.floor(timeLeft /  (1000 * 60 * 60 * 24));
        const hourLeft =  Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

        return (`${dayLeft}일  ${hourLeft}시간`);
    }

    return(
        <div className="my-2 flex flex-row whitespace-nowrap" 
            onClick={(e) => {e.preventDefault(); router.push(`/product/detail/${data && data.itemId}`)}} >
            <div className="overflow-hidden mr-3 "><Img src={data.thumbnailImgUrl} type={"normal"} width={96} height={96}/></div>
            <div className="flex-1 flex flex-col text-base  py-3 justify-around min-w-64">
                <div>{data.title}</div>
                {/* <div className="text-sm font-light">현재최고가<span className="text-POINT_BLUE font-semibold"> ₩ {data && formatPrice(data.price)}</span> 원</div> */}
                <StatusPrice bidStatus={data.itemStatus} highestPrice={data.highestPrice} hopePrice={data.hopePrice} />
                <div className="text-xs font-light  ">{data && formatDate(data.expiredAt)}</div>
            </div>
            {type === "bidded" 
                ? <button className="text-POINT_BLUE font-semibold text-sm">입찰 내역 보기</button>
                : <button className="text-POINT_BLUE font-semibold text-sm">채팅 내역 보기</button>
            }

        </div>
    )
}

export default MineItem;