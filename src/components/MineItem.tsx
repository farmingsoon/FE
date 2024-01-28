import Img from "@/common/Img";

interface MineItemTypes {
    type: "bidded" | "sold";
    data: {
        id: number;
        title: string;
        view: number;
        liked: number;
        price: number;
        thumbnail: undefined | null | string;
    }
}

const MineItem = ({type, data}: MineItemTypes) => {
    return(
        <div className="my-2 flex flex-row whitespace-nowrap">
            <div className="w-24 h-24 mr-3 "><Img src={null} type={"normal"}/></div>
            <div className="flex-1 flex flex-col text-base  py-3 justify-around min-w-64">
                <div>{data.title}</div>
                <div className="text-sm font-light">현재최고가<span className="text-POINT_BLUE font-semibold"> ₩ {data && String(data.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> 원</div>
                <div className="text-xs font-light ">서울 ・ 3일 2시간 남음</div>
            </div>
            {type === "bidded" 
                ? <button className="text-POINT_BLUE font-semibold text-sm">입찰 내역 보기</button>
                : <button className="text-POINT_BLUE font-semibold text-sm">채팅 내역 보기</button>
            }

        </div>
    )
}

export default MineItem;