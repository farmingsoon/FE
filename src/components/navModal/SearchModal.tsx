import { useRecoilValue } from "recoil";
import Search from "../Search";
import RecentSearchItem from "./RecentSearchItem";
import { recentKeywordState } from "@/stores/recentKeywordState";
import LocalStorage from "@/util/localstorage";


const SearchModal = () => {
    const recentKeyword = useRecoilValue(recentKeywordState);

    //낙관적 업데이트 적용.. 
    const handleDeleteAll = (e:any) => {
        e.preventDefault();
        LocalStorage.removeItem("recentKeyword");
    }


    return(
        <div className="absolute top-0 left-52 w-[371px] border-r border-LINE_BORDER whitespace-nowrap bg-white shadow-md z-50 py-10 min-h-screen">
            <h1 className="font-semibold pb-5 px-5 ">검색</h1>
            <div className="mx-auto w-11/12 relative"><Search /></div>
            <div className="relative top-10  h-full">
                <div className="mt-5 border-t border-LINE_BORDER px-5">
                    <div className="flex flex-row justify-between font-semibold pt-5 pb-5">
                        <div className="text-lg">최근 검색 항목</div>
                        <button className="text-MAIN_COLOR text-xs font-normal" onClick={(e) => handleDeleteAll(e)}>모두지우기</button>
                    </div>
                    <div className="px-3 flex flex-col-reverse">
                        {recentKeyword && recentKeyword.length > 0 && 
                            recentKeyword.map((keyword, idx) => (
                                <RecentSearchItem key={idx} keyword={keyword} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal;