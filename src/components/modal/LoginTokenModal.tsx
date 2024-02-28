import { loginSelector } from "@/stores/loginState";
import { tokenState } from "@/stores/tokenModal";
import LocalStorage from "@/util/localstorage";
import { useRouter } from "next/navigation";
import { useRecoilState, useResetRecoilState } from "recoil";


const LoginTokenModal = () => {
    const resetToken = useResetRecoilState(tokenState);
    const [ ,setLoginState] = useRecoilState(loginSelector);
    const router = useRouter();

    const handleClick = (e:any) => {
        e.preventDefault();
        setLoginState((prev) => ({
            ...prev,
            isLogin: false
        }))
        LocalStorage.setItem("loginState", "false");
        router.push("/login")
        resetToken();
    };


    return(
        <div className="fixed inset-0 ml-52 z-10 flex items-end justify-center w-screen min-h-full p-4 overflow-y-auto text-center transition-opacity bg-gray-500 bg-opacity-75 sm:items-center sm:p-0">
            <div className="relative flex flex-col items-center px-8 pb-10 pt-5 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-fit " style={{ marginLeft: '-12rem' }} >
                <div className="text-2xl font-sembold text-center mb-8">알림</div>
                <div className="font-normal text-center mb-20">로그인 후 사용 가능합니다. 로그인을 해주세요! </div>
                <button onClick={handleClick} className="h-10 w-40 rounded-lg bg-MAIN_COLOR text-[#f6f4f4] hover:bg-DEEP_MAIN">로그인 하러 가기 </button>
            </div>
        </div>
    )
}

export default LoginTokenModal;