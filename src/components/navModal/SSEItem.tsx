import Img from "@/common/Img";

const SSEItem = () => {
    return(
        <div className="flex flex-row justify-between my-1 items-center">
            <div><Img type={"circle"} src={undefined} width={40} height={40} /></div>
            <div className="font-normal text-sm mx-3 whitespace-normal">
                <span>낙찰에 성공했습니다. 판매자와 채팅을 시작해보세요. </span>
                <span className="font-light text-xs text-DARK_GRAY ml-1 text-center"> 31분전</span>
            </div>
            <div><Img type={"normal"} src={undefined} width={60} height={40} /></div>
        </div>
    )
}

export default SSEItem;