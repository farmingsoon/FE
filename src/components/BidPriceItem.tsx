import Img from "@/common/Img";
import { useState } from "react";
import CheckBox from "../../public/svg/CheckBox";

const BidPriceItem = () => {
    const [check, setCheck] = useState(true);
    const btnStyle = "bg-white border border-LINE_BORDER rounded-md px-3 mx-1.5 py-1 font-semibold text-sm my-3 hover:bg-zinc-200";
    const checkBoxStyle = check ? `bg-POINT_RED relative` : ``;

    const handleClick = () => {
        setCheck(!check);
    }

    return(
        <div className="py-2 my-0.5 font-semibold text-sm flex flex-row items-center">
            <div className="overflow-hidden rounded-full"><Img type={"circle"} src={undefined} width={40} height={40} /></div>
            <span className="text-TEXT_BLACK ml-3 w-80">사용자 님이 <span className="text-MAIN_COLOR">27,000</span>원을 제시하였습니다. </span>
            <div className={`border rounded-full w-6 h-6 mr-2 overflow-hidden ${checkBoxStyle}`} onClick={handleClick}>
                {check && <span className="absolute top-1.5 left-1.5"><CheckBox width={"10px"} height={"10px"}/></span>}
                <input className="appearance-none" type="checkbox"/>
            </div>
            <button className={btnStyle} >채팅</button>
            <button className={btnStyle} >삭제</button>
        </div>
    )
}

export default BidPriceItem;