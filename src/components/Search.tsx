import LocationPin from "../../public/svg/LocationPin";
import TriangleDown from "../../public/svg/TriangleDown";

const Search = () => {
    return(
        <div className="w-[430px]">
            <div className="bg-white border border-LINE_BORDER rounded-lg w-full flex flex-row text-sm h-10 overflow-hidden items-center">
                <button className="px-3 whitespace-nowrap flex flex-row items-center">
                    <LocationPin width={"15px"} height={"15px"}/>  
                    <p className="px-3 text-MAIN_COLOR">전체</p>
                    <TriangleDown width={"13px"} height={"15px"}/>
                </button>
                <input className="font-light w-full px-2 outline-none" placeholder="찾으시는 상품명, 판매자, 카테고리를 입력하세요."></input>
            </div>
        </div>
    )
}

export default Search;