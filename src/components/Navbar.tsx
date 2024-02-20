"use client"; 
import { useEffect, useState } from "react";
import Link from "next/link";
import BellSVG from "../../public/svg/BellSVG";
import CategorySVG from "../../public/svg/CategorySVG";
import ChatSVG from "../../public/svg/ChatSVG";
import Hamburger from "../../public/svg/Hamburger";
import HomeSVG from "../../public/svg/HomeSVG";
import SearchSVG from "../../public/svg/SearchSVG";
import TagSVG from "../../public/svg/TagSVG";
import NavDropdown from "./NavDropdown";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuState } from "@/stores/NavMenuState";
import { searchState } from "@/stores/searchOptionState";
import LOGO from "@/../public/img/Logo.png";
import Image from "next/image";

import { loginState } from "@/stores/loginState";

const Navbar = () => {
    const [openDrop, setOpenDrop] = useState(false);
    const [menusState, setMenusState ] = useRecoilState(menuState);
    const [ ,setSearchOption ] = useRecoilState(searchState)
    const isLogin = useRecoilValue(loginState);
    const [ mounted, setMounted ] = useState<boolean>(false);
    const btnStyle = "flex flex-row items-center w-fit whitespace-nowrap mb-6"

    const handleClick = () => {
        setOpenDrop(!openDrop)
    };

    const handleOpenModal = ( menuTab: string ) => {
        if(menuTab === "search"){
            const newMenu = [{menu: "search", onOff: !menusState[0].onOff }, {menu: "alarm", onOff: false}];
            setMenusState(newMenu)
        }

        if(menuTab === "alarm"){
            const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: !menusState[1].onOff}];
            setMenusState(newMenu)
        }
    };

    const handleNavCategory = ( selectMenu: string ) => {

        if(selectMenu){
            setSearchOption({
                option: "category",
                keyword: selectMenu,
            }) 
        };


    };

    useEffect(() => {
        setMounted(true);
    }, [])

    return(
        <nav className="flex flex-col shadow-lg w-52 pt-8 sticky top-0 h-screen ">
            <Link href="/"><Image src={LOGO} width={180} alt="logo image" style={{margin: "auto"}}/></Link>
            <ul className="flex-1 px-3 mt-10">
                <li>
                    <Link href="/">
                        <button className={btnStyle}>
                            <HomeSVG width={"12px"} height={"12px"}/>
                            <span className="pl-2 hover:text-DEEP_MAIN">홈</span>
                        </button>
                    </Link>
                </li>
                <li>
                    <button className={btnStyle} onClick={() => handleOpenModal("search")}>
                        <SearchSVG width={"12px"} height={"12px"}/>
                        <span className="pl-2 hover:text-DEEP_MAIN">검색</span>
                    </button>
                </li>
                <li>
                    <button className="flex flex-row items-center w-fit whitespace-nowrap mb-2">
                        <CategorySVG width={"12px"} height={"12px"}/>
                        <span className="pl-2 ">카테고리</span>
                    </button>
                </li>
                <ul className="px-8 grid gap-y-3 whitespace-nowrap mb-6">               
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("의류")} >- 의류</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("신발")} >- 신발</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("악세사리")} >- 악세사리</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("가구")} >- 가구</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("전자제품")} >- 전자제품</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("앨범")} >- 앨범</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("악기")} >- 악기</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("펫용품")} >- 펫용품</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("기타")} >- 기타</button></li>
                </ul>                
                <li>
                    <Link href="/chat">
                        <button className={btnStyle}>
                            <ChatSVG width={"12px"} height={"12px"} />
                            <span className="pl-2 hover:text-DEEP_MAIN">채팅</span>
                        </button>
                    </Link>
                </li>
                <li>
                    <button className={btnStyle} onClick={() => handleOpenModal("alarm")}>
                        <BellSVG width={"12px"} height={"12px"}/>
                        <span className="pl-2 hover:text-DEEP_MAIN">알림</span>
                    </button>
                </li>
                <li>
                    <Link href="/product/edit">
                        <button className={btnStyle}>
                            <TagSVG width={"12px"} height={"12px"}/>
                            <span className="pl-2 hover:text-DEEP_MAIN">판매하기</span>
                        </button>
                    </Link>
                </li>
            </ul>
            {/* <div className="flex flex-row ml-5 mb-5">
                <Link href="/login"><button className=" mr-5 hover:text-MAIN_COLOR">로그인</button></Link>
                <button className="hover:text-MAIN_COLOR ml-5" onClick={handleLoginOut}>로그아웃</button>
            </div> */}

            { mounted && isLogin.isLogin
                ? <button className="px-3 mb-5 " onClick={handleClick}><Hamburger width={"25px"} height={"25px"}/></button>
                : <Link href="/login"><button className="mb-5 ml-5 hover:text-MAIN_COLOR text-sm">로그인</button></Link>

            }
            {openDrop && <NavDropdown handleClick={handleClick}/>}
        </nav>
    )
}

export default Navbar;
