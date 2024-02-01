import Image from "next/image";
import SSEItem from "./SSEItem";
import noAlarm  from "@/../public/svg/noAlarm.svg";


const SSEModal = () => {
    const isData = false;
    return(
        <div className="absolute top-0 left-52 w-[371px] border-r border-LINE_BORDER whitespace-nowrap bg-white shadow-md z-50 py-10 min-h-screen">
            <h1 className="font-semibold mb-8 px-5">알림</h1>
            <div className="mt-5 flex flex-col px-3">
                <SSEItem />
                {isData && 
                    <div className="mt-20 flex flex-col justify-center items-center text-sm font-normal">
                        <Image src={noAlarm} alt={"no alarma notice"} width={200}/>
                        아직 새로운 알림이 없습니다. 
                    </div>
                }
            </div>
            
        </div>
    )
}

export default SSEModal;