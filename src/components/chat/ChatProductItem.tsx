import Img from "@/common/Img";

const ChatProductItem = () => {
    return(
        <div className="flex flex-row w-full bg-[#F4F4F4] p-3">
            <Img type={"normal"} src={undefined} width={45} height={45 } />
            <div className="flex-1 ml-3">
                <div className="font-normal text-md mb-1">카메라 팝니다. : title</div>
                <div className="text-xs font-light">현재 최고가 
                    <span className="font-normal text-MAIN_COLOR mx-1 ">₩ 100,000</span>원
                </div>
            </div>
        </div>
    )
}

export default ChatProductItem;