import Img from "@/common/Img"

const SendChat = () => {
    return(
        <div className="flex flex-row justify-end">
            <div className="text-md font-normal p-2 rounded-md bg-[#7BC4AF] shadow-md">
                안녕하세요, 언제 거래 가능하세요?
            </div>
            <div className="ml-5"><Img type={"circle"} src={undefined} width={35} height={35} /></div>
        </div>
    )
}

export default SendChat