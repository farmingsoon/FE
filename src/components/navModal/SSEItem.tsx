import Img from "@/common/Img";
import { SSEDatasTypes } from "./SSEModal";
import notificationSVG from "@/../public/svg/notificationSVG.svg";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useRecoilState } from "recoil";
import { menuState } from "@/stores/NavMenuState";

interface SSEItemTypes {
    data: SSEDatasTypes
}

const SSEItem = ({data}: SSEItemTypes) => {
    const notificationId = data.notificationId;
    const itemId = data.itemId;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [ , setCloseModal] = useRecoilState(menuState);
    const router = useRouter();

    const handleRead = async () => {
        const PATCHurl = `${BASE_URL}/api/notifications/${notificationId}`;
        const data = {};
        const config = { withCredentials: true }

        try { 
            const res = await axios.patch(PATCHurl, data, config);
            if(res.status === 200){
                console.log("읽음 처리 성공");
                const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: false}];
                setCloseModal(newMenu);
                router.push(`/product/detail/${itemId}`)
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <div className="flex flex-row justify-between py-2 my-1 items-center cursor-pointer duration-500 hover:scale-105 hover:shadow-xl" onClick={handleRead}>
            <div className=""><Img type={"circle"} src={notificationSVG} width={25} height={25} /></div>
            <div className="font-normal text-sm mx-3 whitespace-normal">
                <span>{data.message} </span>
                {/* <span className="font-light text-xs text-DARK_GRAY ml-1 text-center"> 31분전</span> */}
            </div>
        </div>
    )
}

export default SSEItem;