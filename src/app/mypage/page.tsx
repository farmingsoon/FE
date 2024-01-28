import Img from "@/common/Img";
import MineItem from "@/components/MineItem";

export default function Login() {
    const mineItemDatas = [
        {id: 1, title: "자전거", view: 10, liked: 8, price: 100000, thumbnail: null},
        {id: 2, title: "인형", view: 2, liked: 5, price: 5000, thumbnail: null},
        {id: 3, title: "돼지저금통", view: 10, liked: 8, price: 100000, thumbnail: null},
        {id: 4, title: "목걸이", view: 7, liked: 5, price: 5000, thumbnail: null},
        {id: 5, title: "귀걸이", view: 109, liked: 8, price: 106500, thumbnail: null},
        // {id: 6, title: "책", view: 2, liked: 5, price: 5000, thumbnail: null},
        // {id: 7, title: "오토바이", view: 0, liked: 8, price: 60000, thumbnail: null},
        // {id: 8, title: "입장권", view: 2, liked: 5, price: 5000, thumbnail: null},
        // {id: 9, title: "휴지", view: 10, liked: 8, price: 35890, thumbnail: null},
        // {id: 10, title: "인형2", view: 22, liked: 5, price: 4000000, thumbnail: null},
    ]

    return(
        <div className="flex min-h-screen flex-col">
            <div className="p-4 border border-LINE_BORDER rounded-lg flex flex-row items-center max-w-[800px]">
                <div className="w-16 h-16 rounded-full overflow-hidden"><Img src={null} type={"circle"}/></div>
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