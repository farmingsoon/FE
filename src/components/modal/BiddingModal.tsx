import { useState } from "react";
import { useForm } from "react-hook-form";
import Close from "../../../public/svg/Close";

interface BidHookFormTypes {
    bid: number;
}

interface BiddModalTypes {
    handleOpen: () => void;
}

const BiddingModal = ({handleOpen}: BiddModalTypes ) => {
    const { register, setValue } = useForm<BidHookFormTypes>();
    const [bidValue, setBidValue] = useState("")

    const formatNumber = (value: string) => {
        return new Intl.NumberFormat().format(Number(value.replace(/,/g, '')));
    }

    const handleBidtoWon = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const formattedNum = formatNumber(value);
        setBidValue(formattedNum);
        setValue("bid", Number(value.replace(/,/g, '')))
    }


    return(
        <div className="fixed inset-0 ml-52 z-10 flex items-end justify-center w-screen min-h-full p-4 overflow-y-auto text-center transition-opacity bg-gray-500 bg-opacity-75 sm:items-center sm:p-0">
            <div className="relative px-8 pb-10 pt-5 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-fit" style={{ marginLeft: '-12rem' }} >
                <div className="p-1 rounded-md float-end hover:bg-zinc-100" onClick={handleOpen}><Close width={"25px"} height={"25px"}/></div>
                <div className="text-xl mb-2 font-semibold mt-8">입찰하기 </div>
                <div className="">입찰가를 입력 해주세요.</div>
                <form className="mt-8 flex flex-col items-center">
                    <div className="flex flex-row items-end">
                        <input 
                            {...register("bid")}
                            value={bidValue}
                            onChange={handleBidtoWon}
                            type="text" 
                            className="border border-LINE_BORDER px-3 py-1 rounded-lg text-2xl font-base text-right" 
                            placeholder="0"
                        />
                        <div className="font-light text-sm pl-2 whitespace-nowrap">원 (100원 단위)</div>
                    </div>
                    <button 
                        type="submit" 
                        className="mt-14 bg-MAIN_COLOR hover:bg-DEEP_MAIN text-white px-8 py-2 rounded-md text-sm "
                    >
                        입찰하기
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BiddingModal;