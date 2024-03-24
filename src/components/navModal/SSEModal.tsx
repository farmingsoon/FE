"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SSEItem from "./SSEItem";
import noAlarm  from "@/../public/svg/noAlarm.svg";
import axios from "axios";
import { useRecoilState } from "recoil";
import { sseNotiSelectorFamily } from "@/stores/sseNotiState";
import Close from "../../../public/svg/Close";
import { menuState } from "@/stores/NavMenuState";

export interface SSEDatasTypes {
    itemId: number;
    message: string;
}

const SSEModal = () => {
    const [sseDatas, setSSEDatas ] = useState<SSEDatasTypes[]>([])
    const [mounted, setMounted] = useState(false);
    const [ , setAlarmPing ] = useRecoilState(sseNotiSelectorFamily("notiPING"));
    const [ , setCloseModal] = useRecoilState(menuState);

    const getSSEData = async () => {
        const url = "https://server.farmingsoon.site/api/notifications/me";
        const config = { withCredentials: true };

        try { 
            const res = await axios.get(url, config);
            if(res.status === 200){
                const data = res.data.result.notifications;
                console.log(data);
                setSSEDatas(data)
            }
        } catch (err){
            console.log(err);
        }
    };

    const handleReadAll = async () => {
        const url = "https://server.farmingsoon.site/api/notifications";
        const data = {};
        const config = { withCredentials: true };
        try { 
            const res = await axios.patch(url, data, config);
            if(res.status === 200){
                console.log("전체 읽음 처리 ")
                setAlarmPing((cur) => ({ ...cur, sseState: false }))
                await getSSEData();
            }
        } catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        setMounted(true);
        getSSEData();

    },[]);

    const handleClose = () => {
        const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: false}];
        setCloseModal(newMenu)
    };



    return(
        <div className="absolute top-0 left-0 sm:left-52 w-full sm:w-[371px] border-r border-LINE_BORDER whitespace-nowrap bg-white shadow-md z-50 py-10 min-h-[772px] sm:min-h-screen ">
            <div className="absolute top-0 right-0 p-3 hover:bg-zinc-200 rounded-lg" onClick={handleClose}><Close width={"18px"} height={"18px"} /></div>
            <h1 className="font-semibold mb-8 px-5">알림</h1>
            <div className="mt-5 flex flex-col px-3">
                <div 
                    className="h-fit text-xs font-light text-end hover:font-normal cursor-pointer pb-2 border-b border-LINE_BORDER"
                    onClick={handleReadAll}
                    >전체 읽음</div>
                {( mounted && sseDatas && sseDatas.length > 0) ? 
                    sseDatas.map((notifi, idx) => (
                        <SSEItem key={idx} data={notifi} />
                    ))
                    : 
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
