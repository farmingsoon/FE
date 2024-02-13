"use client"; 
import { useState } from "react";
import Link from "next/link";
import BellSVG from "../../public/svg/BellSVG";
import CategorySVG from "../../public/svg/CategorySVG";
import ChatSVG from "../../public/svg/ChatSVG";
import Hamburger from "../../public/svg/Hamburger";
import HomeSVG from "../../public/svg/HomeSVG";
import SearchSVG from "../../public/svg/SearchSVG";
import TagSVG from "../../public/svg/TagSVG";
import NavDropdown from "./NavDropdown";
import { useRecoilState } from "recoil";
import { menuState } from "@/stores/NavMenuState";
import LocalStorage from "@/util/localstorage";
import { searchState } from "@/stores/searchOptionState";
// import { loginSelector } from "@/stores/loginState";

const Navbar = () => {
    const [openDrop, setOpenDrop] = useState(false);
    const [menusState, setMenusState ] = useRecoilState(menuState);
    const [ ,setSearchOption ] = useRecoilState(searchState)
    const isLogin = LocalStorage.getItem("loginState");
    const btnStyle = "flex flex-row items-center w-fit whitespace-nowrap mb-6"
    // console.log(login.isLogin)
    const handleClick = () => {
        setOpenDrop(!openDrop)
    };

    const handleOpenModal = ( menuTab: string ) => {

        // const newMenu = menusState.map((el) => {
        //     if(el.menu === menuTab){
        //         return {...el, onOff: !el.onOff};
        //     }
        //     return el;
        // });
        

        if(menuTab === "search"){
            const newMenu = [{menu: "search", onOff: !menusState[0].onOff }, {menu: "alarm", onOff: false}];
            setMenusState(newMenu)
        }

        if(menuTab === "alarm"){
            const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: !menusState[1].onOff}];
            setMenusState(newMenu)
        }

        // setMenusState(newMenu);
    };

    const handleNavCategory = ( selectMenu: string ) => {

        if(selectMenu){
            setSearchOption({
                option: "category",
                keyword: selectMenu,
            }) 
        };


    }

    return(
        <nav className="flex flex-col shadow-lg w-52 pt-8 sticky top-0 h-screen ">
            <Link href="/"><h1 className="mb-5">FARMINGSOON</h1></Link>
            <ul className="flex-1 px-3">
                <li>
                    <Link href="/">
                        <button className={btnStyle}><HomeSVG width={"12px"} height={"12px"}/><span className="pl-2 hover:text-DEEP_MAIN">홈</span>
                        </button>
                    </Link>
                </li>
                <li>
                    <button className={btnStyle} onClick={() => handleOpenModal("search")}><SearchSVG width={"12px"} height={"12px"}/><span className="pl-2 hover:text-DEEP_MAIN">검색</span>
                    </button>
                </li>
                <li>
                    <button className="flex flex-row items-center w-fit whitespace-nowrap mb-2"><CategorySVG width={"12px"} height={"12px"}/><span className="pl-2 ">카테고리</span>
                    </button>
                </li>
                <ul className="px-8 grid gap-y-3 whitespace-nowrap mb-6">               
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("의류")} >- 의류</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("신발")} >- 신발</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("악세사리")} >- 악세사리</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("가구")} >- 가구</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("앨범")} >- 앨범</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("악기")} >- 악기</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("펫용품")} >- 펫용품</button></li>
                    <li><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("기타")} >- 기타</button></li>
                </ul>                
                <li>
                    <Link href="/chat">
                        <button className={btnStyle}><ChatSVG width={"'12px"} height={"12px"} /><span className="pl-2 hover:text-DEEP_MAIN">채팅</span>
                        </button>
                    </Link>
                </li>
                <li>
                    <button className={btnStyle} onClick={() => handleOpenModal("alarm")}><BellSVG width={"12px"} height={"12px"}/><span className="pl-2 hover:text-DEEP_MAIN">알림</span>
                    </button>
                </li>
                <li>
                    <Link href="/product/edit">
                        <button className={btnStyle}><TagSVG width={"12px"} height={"12px"}/><span className="pl-2 hover:text-DEEP_MAIN">판매하기</span>
                        </button>
                    </Link>
                </li>
            </ul>
            { isLogin
                ? <button className="px-3 mb-5 " onClick={handleClick}><Hamburger width={"25px"} height={"25px"}/></button>
                : <Link href="/login"><button className="mb-5 ml-5 hover:text-MAIN_COLOR">로그인</button></Link>

            }
            {openDrop && <NavDropdown handleClick={handleClick}/>}
        </nav>
    )
}

export default Navbar;
