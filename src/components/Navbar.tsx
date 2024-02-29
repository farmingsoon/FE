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
import { sseNotiSelectorFamily } from "@/stores/sseNotiState";
// import { sseNotiState } from "@/stores/sseNotification";
// import { sseChattingPing } from "@/stores/sseChatPingState";

const Navbar = () => {
    const [openDrop, setOpenDrop] = useState(false);
    const [menusState, setMenusState ] = useRecoilState(menuState);
    const [ ,setSearchOption ] = useRecoilState(searchState)
    const isLogin = useRecoilValue(loginState);
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ subDrop, setSubDrop ] = useState(false);
    // const gotNewNotification = useRecoilValue(sseNotiState);
    // const gotNewChatNotification = useRecoilValue(sseChattingPing);
    const [gotNewAlarm ,  ] = useRecoilState(sseNotiSelectorFamily("notiPING"));
    const [gotNewChat , setChatPing ] = useRecoilState(sseNotiSelectorFamily("chatPING"));
    const btnStyle = "flex flex-row items-center w-fit whitespace-nowrap mb-6";

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
            setMenusState(newMenu);
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

    const handleSubOpen = () => {
        setSubDrop(!subDrop);
    };

    //알림 끄기 
    const handleOffChatPing = () => {
        setChatPing((cur) => ({ ...cur, sseState: false }));
    }

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
                    <button 
                        className="flex flex-row items-center w-fit whitespace-nowrap mb-2"
                        onClick={handleSubOpen}
                        >
                        <CategorySVG width={"12px"} height={"12px"}/>
                        <span className="pl-2 ">카테고리</span>
                    </button>
                </li>
                {subDrop && (
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
                )}            
                <li className="pt-4">
                    <Link href="/chat">
                        <button className={btnStyle} onClick={handleOffChatPing}>
                            <ChatSVG width={"12px"} height={"12px"} />
                            <span className="pl-2 hover:text-DEEP_MAIN">채팅</span>
                            { gotNewChat.sseState && 
                                <span className="relative flex h-2 w-2 -top-2 -right-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-MAIN_COLOR opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-MAIN_COLOR"></span>
                                </span>
                            }
                        </button>
                    </Link>
                </li>
                <li>
                    <button className={btnStyle} onClick={() => handleOpenModal("alarm")}>
                        <BellSVG width={"12px"} height={"12px"}/>
                        <span className="pl-2 hover:text-DEEP_MAIN">알림</span>
                        { gotNewAlarm.sseState && 
                            <span className="relative flex h-2 w-2 -top-2 -right-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-MAIN_COLOR opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-MAIN_COLOR"></span>
                            </span>
                        }
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
            <div className="bg-white sticky bottom-0 shadow-custom-top">
                { mounted && isLogin.isLogin
                    ? <button className="px-3 py-2 " onClick={handleClick}><Hamburger width={"25px"} height={"25px"}/></button>
                    : <Link href="/login"><button className="py-2 ml-5 hover:text-MAIN_COLOR text-sm">로그인</button></Link>

                }
            </div>
            {openDrop && <NavDropdown handleClick={handleClick}/>}
        </nav>
    )
}

export default Navbar;
