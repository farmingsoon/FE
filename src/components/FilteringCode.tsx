import { sortCodeAtom } from "@/stores/sortCodeState";
import { useRecoilState } from "recoil";


const FilteringCode = () => {
    const [ sortCodeState, setSortCodeState ] = useRecoilState(sortCodeAtom);

    const handleCheckBox = (e:any) => {
        const isCheck = e.target.checked;
        // console.log("체크박스 유무 : " , isCheck);
        setSortCodeState((prev) => ({
            ...prev,
            isCheckBox: isCheck
        }));
    };

    const handleSortCode = (e:any) => {
        const newCode = e.target.value;
        setSortCodeState((prev) => ({
            ...prev,
            sortCode: newCode,
        }));
    };

    return(
        <div className="ml-5 whitespace-nowrap pt-5">
            <input type="checkbox" onChange={handleCheckBox}/>
            <label className="px-2 outline-none">판매 완료된 상품</label>
            {sortCodeState.isCheckBox === true 
                ? 
                <select
                    className="bg-zinc-200 rounded-md w-24 text-sm py-1 ml-5 outline-none"
                    value={sortCodeState.sortCode}
                    onChange={handleSortCode}
                >
                    <option className="pl-2" value="recent" >최신순</option>
                    <option className="pl-2" value="hot" >인기순</option>
                    <option className="pl-2" value="highest" >고가순</option>
                    <option className="pl-2" value="lowest" >저가순</option>
                </select>
                : 
                <select
                    className="bg-zinc-200 rounded-md w-24 text-sm py-1 ml-5 outline-none"
                    value={sortCodeState.sortCode}
                    onChange={handleSortCode}
                >
                    <option className="pl-2" value="recent" >최신순</option>
                    <option className="pl-2" value="hot" >인기순</option>
                    <option className="pl-2" value="deadline" >마감 임박순</option>
                </select>

            }
        </div>
    )
}

export default FilteringCode;