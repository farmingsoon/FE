import { useState } from "react";
import debounce from 'lodash.debounce';
import TriangleDown from "../../public/svg/TriangleDown";
import { useRecoilState } from "recoil";
import { searchState } from "@/stores/searchOptionState";
import { menuState } from "@/stores/NavMenuState";

import { recentKeywordSelector } from "@/stores/recentKeywordState";

const Search = () => {
    const [ openOption, setOpenOption ] = useState(false);
    const [ selectOption, setSelectOption ] = useRecoilState(searchState);
    const [ navMenuState, setNavMenuState ] = useRecoilState(menuState);
    const [ , setRecentKeyword ] = useRecoilState(recentKeywordSelector);
    const [ inputText, setInputText ] = useState(""); 

    const handleOpen = (  ) => {
        setOpenOption(!openOption)
    };
    const handleKeyDown = debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
        //메인 홈에서 검색하는 경우 
        if(event.key === "Enter" && navMenuState[0].onOff === false) {
            event.preventDefault();
            const target = event.target as HTMLInputElement;
            const keyword = target.value.trim(); // 앞뒤 공백 제거 
            setSelectOption((prev) => ({
                ...prev,
                keyword: keyword
            }));

            //setRecentKeyword((prev) => ([ ...prev, target.value]));
            setRecentKeyword((prev) => {
                const update =  [...prev, target.value];
                return update;         
            });
            setInputText("");
        }; 

        //모달창에서 검색하는 경우 
        if(event.key === "Enter" && navMenuState[0].onOff === true){
            event.preventDefault();
            const target = event.target as HTMLInputElement;
            setSelectOption((prev) => ({
                ...prev,
                keyword: target.value
            }));
            setRecentKeyword((prev) => {
                const update =  [...prev, target.value];
                return update;         
            });
            setInputText("");
            const newMenuState = [{menu: "search", onOff: false}, {menu: "alarm", onOff: false}]

            setNavMenuState(newMenuState);
        };
    }, 500);
    

    const handleOption = ( option: string ) => {
        setSelectOption((prev) => ({
            ...prev,
            option: option
        }) );
        setOpenOption(false);
    };


    return(
        <div className="w-full absolute ">
            <div className="bg-white border border-LINE_BORDER rounded-lg w-full flex flex-row text-sm h-10 overflow-hidden items-center ">
                <button className="px-3 whitespace-nowrap flex flex-row items-center" onClick={handleOpen}>
                    {/* <LocationPin width={"15px"} height={"15px"}/>   */}
                    <p className="pr-3 text-MAIN_COLOR">{selectOption.option === "category" ? "카테고리" : "전체"}</p>
                    <TriangleDown width={"13px"} height={"15px"}/>
                </button>
                <input 
                    value={inputText}
                    className="font-light w-full px-2 outline-none text-xs" 
                    placeholder="찾으시는 상품명, 카테고리를 입력하세요."
                    onChange={(e) => {setInputText(e.target.value)}}
                    onKeyDown={(e) => { handleKeyDown(e)}}
                    ></input>
            </div>
            { openOption && (
                        <ul className="relative top-0.5 flex flex-col w-20 text-center bg-MAIN_COLOR text-indigo-50 border-zinc-300 rounded-lg font-normal text-xs  z-20">
                            <li className="py-3 border-b border_LINE_BORDER hover:text-white"><button onClick={() => {handleOption("")}}>전체</button></li>
                            <li className="py-3 hover:text-white"><button onClick={() => {handleOption("category")}}>카테고리</button></li>
                        </ul>
                ) }
        </div>
    )
}

export default Search;