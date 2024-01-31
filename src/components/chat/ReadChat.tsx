import Img from "@/common/Img";

const ReadChat = () => {
    return(
        <div className="flex flex-row justify-start ">
            <div className="mr-5"><Img type={"circle"} src={undefined} width={35} height={35} /></div>
            <div className="text-md font-normal p-2 rounded-md bg-[#F4F4F4] shadow-md">
                안녕하세요.
            </div>
        </div>
    )
}

export default ReadChat;