import Img from "@/common/Img";
import { SSEDatasTypes } from "./SSEModal";
import notificationSVG from "@/../public/svg/notificationSVG.svg";
import { axiosCall } from "@/util/axiosCall";

interface SSEItemTypes {
    data: SSEDatasTypes
}

const SSEItem = ({data}: SSEItemTypes) => {
    const notificationId = data.itemId

    const handleRead = async () => {
        const url = `/api/notifications/${notificationId}`;
        const data = {};
        const config = { withCredentials: true }

        try { 
            const res = await axiosCall(url, "PATCH", data, config );
            if(res.status === 200){
                console.log("읽음 처리 성공")
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <div className="flex flex-row justify-between my-1 items-center" onClick={handleRead}>
            <div className=""><Img type={"circle"} src={notificationSVG} width={25} height={25} /></div>
            <div className="font-normal text-sm mx-3 whitespace-normal">
                <span>{data.message} </span>
                {/* <span className="font-light text-xs text-DARK_GRAY ml-1 text-center"> 31분전</span> */}
            </div>
        </div>
    )
}

export default SSEItem;