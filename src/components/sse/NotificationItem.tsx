import { showNotificationSelctor } from "@/stores/showNotification";
import { useRecoilState } from "recoil";

const NotificationItem = ( {msg}: { msg: string } ) => {
    const [, setShowNotification ] = useRecoilState(showNotificationSelctor);

    const handleClose = () => {
        setShowNotification(false);
    }

    return(
        <div className="absolute top-10 right-10 rounded-lg shadow-lg p-5 text-sm fonr-normal bg-DEEP_MAIN animate-slide-in-and-out cursor-pointer"
            onClick={handleClose}>
            <div className="text-zinc-100 ">  
                {msg}
            </div>
        </div>
    )

}

export default NotificationItem;