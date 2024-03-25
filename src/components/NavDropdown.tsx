import { loginSelector } from "@/stores/loginState";
import { tokenState } from "@/stores/tokenModal";
import { rotateRefresh } from "@/util/axiosCall";
import LocalStorage from "@/util/localstorage";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

interface DropDownTypes {
    handleClick: () => void;
}

const NavDropdown = ( {handleClick}:DropDownTypes ) => {
    const [ , setLogin ] = useRecoilState(loginSelector);
    const [, setOpenTokenModal] = useRecoilState(tokenState);
    const BASER_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const btnStyle = "";


    const handleLoginOut = async (e:any) => {
        e.preventDefault();
        const url = `${BASER_URL}/api/members/refresh-token/logout`;
        const data = {};
        const config = { withCredentials: true }

        try {
            const res = await axios.post(url, data, config);
            if(res.status === 200){
                setLogin((prev) => ({
                    ...prev,
                    isLogin: false,
                }));
                localStorage.removeItem("memberId");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("loginState");
                LocalStorage.setItem("loginState", String(false));
                router.push("/");
            };
            handleClick();


        } catch (err){
            console.log(err);
            rotateRefresh().then(() => {
                axios.post(url, data, config);
            }).catch((err) => {
                if(err.message === "RefreshTokenUnauthorized"){
                    setOpenTokenModal({tokenExpired: true})
                }
            })
        }
    };

    return(
        <div className="shadow-lg border-zinc-50 rounded-lg pt-3 pb-1 px-4 w-52 absolute top-16 right-6 h-fit sm:bottom-14 sm:left-8 sm:top-auto sm:right-auto z-30 bg-white">
            <ul className=" text-base">
                <Link href={"/likeItem"}>
                    <li className="py-3 hover:text-MAIN_COLOR"  >
                        <button className={btnStyle} onClick={() => {handleClick();}}>보관 상품</button>
                    </li>
                </Link>
                <Link href={`/mypage`}>
                    <li className="py-3 hover:text-MAIN_COLOR border-b border-LINE_BORDER">
                        <button className={btnStyle}   onClick={() => {handleClick();}}>프로필</button>
                    </li>
                </Link>
                <li className="py-3 hover:text-MAIN_COLOR">
                    <button className={btnStyle} onClick={handleLoginOut}>로그아웃</button>
                </li>
            </ul>
        </div>
    )
}

export default NavDropdown;