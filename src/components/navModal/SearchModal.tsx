
import Search from "../Search";
import RecentSearchItem from "./RecentSearchItem";

const SearchModal = () => {
    return(
        <div className="absolute top-0 left-52 w-[371px] border-r border-LINE_BORDER whitespace-nowrap bg-white shadow-md z-50 py-10 min-h-screen">
            <h1 className="font-semibold mb-8 px-5">검색</h1>
            <div className="px-5 "><Search /></div>
            <div className="mt-5 border-t border-LINE_BORDER px-5">
                <div className="flex flex-row justify-between font-semibold pt-5 pb-10">
                    <div className="text-lg">최근 검색 항목</div>
                    <button className="text-MAIN_COLOR text-xs font-normal">모두지우기</button>
                </div>
                <div className="px-3">
                    <RecentSearchItem />

                </div>
            </div>
        </div>
    )
}

export default SearchModal;