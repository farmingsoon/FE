import { loginSelector } from "@/stores/loginState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

interface DropDownTypes {
    handleClick: () => void;
}

const NavDropdown = ( {handleClick}:DropDownTypes ) => {
    const [ , setLogin ] = useRecoilState(loginSelector);
    const router = useRouter();
    const btnStyle = ""


    const handleLoginOut = (e:any) => {
        e.preventDefault();
        handleClick();
        setLogin((prev) => ({
            ...prev,
            isLogin: false,
        }));
        localStorage.removeItem("memberId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loginState");
        router.push("/");
    };

    return(
        <div className="shadow-lg border-zinc-50 rounded-lg pt-3 pb-1 px-4 w-52 absolute bottom-12 left-8 z-20 bg-white">
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