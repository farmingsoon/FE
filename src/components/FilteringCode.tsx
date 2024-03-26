import { sortCodeAtom } from "@/stores/sortCodeState";
import { useRecoilState } from "recoil";


interface selectionTypes {
    sortCodeState : any;
    handleSortCode: (e:any) => void;
}

const FilteringCode = () => {
    const [ sortCodeState, setSortCodeState ] = useRecoilState(sortCodeAtom);

    const handleCheckBox = (e:any) => {
        const { id, checked } = e.target;
        // console.log("체크 박스 : ", id, checked);
        if(id === "bidding" && checked ){
            setSortCodeState((prev) => ({
                ...prev,
                isCheckBox: "BIDDING"
            }));
        } else if(id === "soldout" && checked ) {
            setSortCodeState((prev) => ({
                ...prev,
                isCheckBox: "SOLDOUT"
            }));
        } else {
            setSortCodeState((prev) => ({
                ...prev,
                isCheckBox: null
            }))
        }

    };

    const handleSortCode = (e:any) => {
        const newCode = e.target.value;
        setSortCodeState((prev) => ({
            ...prev,
            sortCode: newCode,
        }));
    };

    return (
        <div className="sm:ml-5 whitespace-nowrap pt-5 ">
            <input type="checkbox" id="bidding" checked={sortCodeState.isCheckBox === "BIDDING"} onChange={handleCheckBox}/>
            <label className="px-2 mr-3 outline-none">경매중인 상품</label>
            <input type="checkbox" id="soldout" checked={sortCodeState.isCheckBox === "SOLDOUT"} onChange={handleCheckBox}/>
            <label className="px-2 outline-none">판매 완료된 상품</label>
            {
                // 정렬 옵션은 isCheckBox 상태에 따라 결정됩니다.
                sortCodeState.isCheckBox === "SOLDOUT"
                ? <SelectOptionSoldOut sortCodeState={sortCodeState.sortCode} handleSortCode={handleSortCode}/> 
                : sortCodeState.isCheckBox === "BIDDING"
                    ? <SelectOptionBidding sortCodeState={sortCodeState.sortCode} handleSortCode={handleSortCode}/>
                    : <SelectOptionDefault sortCodeState={sortCodeState.sortCode} handleSortCode={handleSortCode}/>
            }
        </div>
    );
}

const SelectOptionSoldOut = ({sortCodeState, handleSortCode}:selectionTypes) => (
    <select
            className="bg-zinc-200 rounded-md sm:w-24 w-18 text-sm py-1 ml-5 outline-none"
            value={sortCodeState}
            onChange={handleSortCode}
        >
            <option className="pl-2" value="recent" >최신순</option>
            <option className="pl-2" value="hot" >인기순</option>
            <option className="pl-2" value="highest" >고가순</option>
            <option className="pl-2" value="lowest" >저가순</option>
    </select>
);

const SelectOptionBidding = ({sortCodeState, handleSortCode}:selectionTypes) => (
    <select
            className="bg-zinc-200 rounded-md sm:w-24 w-18 text-sm py-1 ml-5 outline-none"
            value={sortCodeState}
            onChange={handleSortCode}
        >
            <option className="pl-2" value="recent">최신순</option>
            <option className="pl-2" value="hot">인기순</option>
            <option className="pl-2" value="deadline">마감 임박순</option>
    </select>
);

const SelectOptionDefault = ({sortCodeState, handleSortCode}:selectionTypes ) => (
    <select
        className="bg-zinc-200 rounded-md sm:w-24 w-18 text-sm py-1 ml-5 outline-none"
        value={sortCodeState}
        onChange={handleSortCode}
    >
        <option className="pl-2" value="recent">최신순</option>
        <option className="pl-2" value="hot">인기순</option>
    </select>  
)

export default FilteringCode;