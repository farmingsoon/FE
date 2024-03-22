import { Dispatch, SetStateAction } from "react";


interface BasicModalTypes {
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const BasicModal = ({setOpenModal}: BasicModalTypes) => {

    return(
        <div className="fixed inset-0 ml-52 z-10 flex items-end justify-center w-screen min-h-full p-4 overflow-y-auto text-center transition-opacity bg-gray-500 bg-opacity-75 sm:items-center sm:p-0 duration-500 ease-in-out">
            <div className="relative p-16 overflow-hidden text-center transition-all transform bg-white rounded-lg shadow-xl w-fit" style={{ marginLeft: '-12rem' }} >
                <p className="text-xl">현재 서비스 준비 중입니다 </p>
                <p className="mt-5 mb-7 text-sm">빠른 시일 내에 멋진 서비스로 돌아올께요 : )</p>
                <button className="text-xs px-10 py-2 border bg-MAIN_COLOR text-white rounded-lg hover:bg-DEEP_MAIN" onClick={() => setOpenModal(false)}>닫기</button>
            </div>
        </div>
    )
};

export default BasicModal;