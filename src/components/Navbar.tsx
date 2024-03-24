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
import { useRouter } from "next/navigation";
import { amendMenuSelector } from "@/stores/selectMenu";
import ArrowDown from "../../public/svg/ArrowDown";
import ArrowUp from "../../public/svg/\bArrowUp";
import { homePageSelector } from "@/stores/homePage";
import smLogo from "@/../public/img/smLogo.png";


const Navbar = () => {
    const [openDrop, setOpenDrop] = useState(false);
    const [menusState, setMenusState ] = useRecoilState(menuState);
    const [ ,setSearchOption ] = useRecoilState(searchState)
    const isLogin = useRecoilValue(loginState);
    const [ mounted, setMounted ] = useState<boolean>(false);
    const [ subDrop, setSubDrop ] = useState(false);
    const router = useRouter();

    const [gotNewAlarm ,  ] = useRecoilState(sseNotiSelectorFamily("notiPING"));
    const [gotNewChat , setChatPing ] = useRecoilState(sseNotiSelectorFamily("chatPING"));
    const btnStyle = "flex flex-row items-center w-fit whitespace-nowrap mb-6 cursor-pointer";
    const [ menuTab, setMenuTab ] = useRecoilState(amendMenuSelector);
    const [ , setHomePage ] = useRecoilState(homePageSelector);
    const clickStyle = `text-DEEP_MAIN `;


    const handleClick = () => {
        setOpenDrop(!openDrop)
    };

    const handleOpenModal = ( menuTab: string ) => {
        setMenuTab(menuTab);
        if(menuTab === "search"){
            const newMenu = [{menu: "search", onOff: !menusState[0].onOff }, {menu: "alarm", onOff: false}];
            setMenusState(newMenu)
        }

        if(menuTab === "alarm"){
            const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: !menusState[1].onOff}];
            setMenusState(newMenu);
        }
    };

    //맨 처음 페이지로 초기화 이동
    const resetHome = () => {
        setMenuTab("home");
        setHomePage({page: 0});
        setSearchOption({option: "", keyword: ""})
        const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: false}];
        setMenusState(newMenu)
        router.push("/");
    };

    const handleNavCategory = ( selectMenu: string ) => {
        setHomePage({page: 0});
        setMenuTab(selectMenu);
        const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: false}];
        setMenusState(newMenu);
        if(selectMenu){
            setSearchOption({
                option: "category",
                keyword: selectMenu,
            }) 
        };
    };

    const clickSoldItem = () => {
        const newMenu = [{menu: "search", onOff: false }, {menu: "alarm", onOff: false}];
        setMenusState(newMenu);
        setMenuTab("soldItem");
        router.push("/product/edit");
    }

    const handleSubOpen = () => {
        setSubDrop(!subDrop);
    };

    //알림 끄기 
    const handleOffChatPing = () => {
        setMenuTab("chatRoom")
        setChatPing((cur) => ({ ...cur, sseState: false }));
    }

    useEffect(() => {
        setMounted(true);
        setMenuTab("home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <nav className="flex flex-row sm:flex-col sm:shadow-lg sm:w-52 sm:pt-8 sm:sticky sm:top-0 sm:h-screen bg-MAIN_COLOR sm:bg-white shadow-custom-top rounded-t-[20px] sm:rounded-none ">
            <div className="hidden sm:block"><Image src={LOGO} width={180} alt="logo image" style={{margin: "auto", cursor: "pointer" }} onClick={resetHome}/></div>    
            <ul className="flex-1 px-3 mt-3 sm:mt-10 sm:ml-5 flex flex-row sm:flex-col">
                <li className={`basis-1/5 grid justify-items-center sm:justify-start pt-4 sm:pt-0 ${menuTab === "home" ? clickStyle : ""}`}>
                    <button className={btnStyle} onClick={resetHome}>
                        <HomeSVG width={"20px"} height={"20px"}/>
                        <span className="hidden sm:block sm:visible pl-2 hover:text-DEEP_MAIN">홈</span>
                    </button>
                </li>
                <li className={`basis-1/5 grid justify-items-center sm:justify-start pt-4 sm:pt-0 ${menuTab === "search" ? clickStyle : ""}`}>
                    <button className={btnStyle} onClick={() => handleOpenModal("search")}>
                        <SearchSVG width={"20px"} height={"20px"}/>
                        <span className="hidden sm:block pl-2 hover:text-DEEP_MAIN">검색</span>
                    </button>
                </li>
                <li className="basis-1/5 grid justify-items-center sm:justify-start  ">
                    <button 
                        className="flex flex-row items-center w-fit whitespace-nowrap mb-2"
                        onClick={handleSubOpen}
                        >
                        <CategorySVG width={"20px"} height={"20px"}/>
                        <span className="hidden sm:block pl-2 pr-5">카테고리</span>
                        <div className="ml-2 sm:ml-0">
                            {subDrop ? <ArrowDown width={"13px"} height={"13px"} /> : <ArrowUp width={"13px"} height={"13px"} />}
                        </div> 
                    </button>
                </li>
                {subDrop && (
                <ul className="basis-1/5 sm:px-8 sm:grid sm:gap-y-3 whitespace-nowrap sm:mb-6 grid justify-items-center sm:justify-start ">               
                    <li className={menuTab === "의류" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("의류")} >- 의류</button></li>
                    <li className={menuTab === "신발" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("신발")} >- 신발</button></li>
                    <li className={menuTab === "악세사리" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("악세사리")} >- 악세사리</button></li>
                    <li className={menuTab === "가구" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("가구")} >- 가구</button></li>
                    <li className={menuTab === "전자제품" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("전자제품")} >- 전자제품</button></li>
                    <li className={menuTab === "앨범" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("앨범")} >- 앨범</button></li>
                    <li className={menuTab === "악기" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("악기")} >- 악기</button></li>
                    <li className={menuTab === "펫용품" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("펫용품")} >- 펫용품</button></li>
                    <li className={menuTab === "기타" ? clickStyle : ""}><button className="pl-2 font-normal text-sm hover:text-DEEP_MAIN" onClick={() => handleNavCategory("기타")} >- 기타</button></li>
                </ul>    
                )}
                <li className={`basis-1/5  grid justify-items-center sm:justify-start pt-4 sm:pt-0 ${menuTab === "soldItem" ? clickStyle : ""}`}>
                    <button className={btnStyle} onClick={clickSoldItem}>
                        <TagSVG width={"20px"} height={"20px"}/>
                        <span className="hidden sm:block pl-2 hover:text-DEEP_MAIN">판매하기</span>
                    </button>
                </li>            
                <li className={`basis-1/5 grid justify-items-center sm:justify-start pt-4 sm:pt-0 ${menuTab === "chatRoom" ? clickStyle + "sm:pt-4" : "sm:pt-4"}`}>
                    <Link href="/chat">
                        <button className={btnStyle} onClick={handleOffChatPing}>
                            <ChatSVG width={"20px"} height={"20px"}/>
                            <span className="hidden sm:block pl-2 hover:text-DEEP_MAIN">채팅</span>
                            { gotNewChat.sseState && 
                                <span className="relative flex h-2 w-2 -top-2 -right-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-MAIN_COLOR opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-MAIN_COLOR"></span>
                                </span>
                            }
                        </button>
                    </Link>
                </li>
                <li className={`basis-1/5 grid justify-items-center sm:justify-start pt-4 sm:pt-0 ${menuTab === "alarm" ? clickStyle : ""}`}>
                    { mounted && isLogin.isLogin ? 
                        (<button className={btnStyle} onClick={() => handleOpenModal("alarm")}>
                                <BellSVG width={"20px"} height={"20px"}/>
                                <span className="hidden sm:block pl-2 hover:text-DEEP_MAIN">알림</span>
                                { gotNewAlarm.sseState && 
                                    <span className="relative flex h-2 w-2 -top-2 -right-1">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-MAIN_COLOR opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-MAIN_COLOR"></span>
                                    </span>
                                }
                        </button>)
                        : null
                    }
                </li>

            </ul>
            <div className="flex flex-row justify-between sm:justify-start w-full items-center px-2 sm:sticky absolute top-0 py-3 sm:bottom-0 sm:shadow-custom-top bg-transparent backdrop-blur z-30">
                <div className="sm:hidden"><Image src={smLogo} width={50} alt="mobile logo image" style={{margin: "auto", cursor: "pointer" }} onClick={resetHome}/></div>
                { mounted && isLogin.isLogin
                    ? <button className="px-3 py-2 " onClick={handleClick}><Hamburger width={"25px"} height={"25px"}/></button>
                    : <Link href="/login"><button className=" py-2 ml-5 hover:text-MAIN_COLOR text-sm sm:border-none border-2 border-MAIN_COLOR rounded-full px-3 ">로그인</button></Link>

                }
            </div>
            {openDrop && <NavDropdown handleClick={handleClick}/>}
        </nav>
    )
}

export default Navbar;
