
import { sseNotiSelectorFamily } from "@/stores/sseNotiState";
import { useRecoilState } from "recoil";

const NotificationItem = ( {msg, type}: { msg: string, type: "alarm" | "chat" } ) => {
    const [ , setAlarmMSG ] = useRecoilState(sseNotiSelectorFamily("notiMSG"));
    const [ , setChatMSG ] = useRecoilState(sseNotiSelectorFamily("chatMSG"));

    const handleClose = () => {
        if(type === "alarm"){
            setAlarmMSG((cur) => ({
                ...cur, 
                sseState: false,
            }));
        }

        if(type === "chat"){
            setChatMSG((cur) => ({
                ...cur,
                sseState: false,
            }))
        }
    }

    return(
        <div className="absolute top-10 right-10 rounded-lg shadow-lg p-5 text-sm fonr-normal bg-DEEP_MAIN animate-slide-in-and-out cursor-pointer z-50"
            onClick={handleClose}>
            <div className="text-zinc-100 ">  
                {msg}
            </div>
        </div>
    )

}

export default NotificationItem;