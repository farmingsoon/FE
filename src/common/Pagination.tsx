"use client"
import { useEffect, useState } from "react";
import ArrowLeft from "../../public/svg/ArrowLeft";
import ArrowRight from "../../public/svg/ArrowRight";

interface paginationTypes {
    pageInfo: {
        totalPageSize: number;
        totalElementSize: number;
        page: number;
        hasNext: boolean;
        hasPrevious: boolean;
        pagesize: number;
        elementSize: number;
    };
    activeBtn: number;
    setActiveBtn: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ pageInfo, activeBtn, setActiveBtn }: paginationTypes) => {
    const clickBtn = `text-DEEP_MAIN p-1`;
    const [ curPage, setCurPage ] = useState<number[]>([]);
    const btnLimit = 5



    useEffect(() => {
        const slicedPage = (totalPage: number, limit: number ) => {
            const pageBtnNum = Array.from({length: totalPage}, (_, idx) => idx + 1);

            return Array.from({length: Math.ceil(totalPage / limit)}, () => pageBtnNum.slice(0, limit));
        };

        if(pageInfo){
            const sliceBtnNum = slicedPage(pageInfo.totalPageSize, btnLimit);
            const formatBtns = sliceBtnNum[Math.floor((pageInfo.page - 1) / btnLimit )]
            console.log("페이지네이션 : ", formatBtns)
            setCurPage(formatBtns);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageInfo.page, activeBtn])

    const handleClickBtn = ( pageNum: number ) => {
        setActiveBtn(pageNum);
    };

    const handlePrev = () => {
        if(pageInfo.hasPrevious === false) return null;

        const prevPage = activeBtn - 1;
        setActiveBtn(prevPage);

    }
    
    const handleNext = () => {
        if(pageInfo.hasNext === false) return null;

        const nextPage = activeBtn + 1;
        setActiveBtn(nextPage);
    }

    return(
        <div className="flex flex-col">
        <div className="flex flex-row justify-center bg-pink-400">
            <div className="bg-zinc-200 rounded-md flex justify-center h-fit p-2 " ><ArrowLeft width={"14px"} height={"14px"} onClick={handlePrev} /></div>
            <div>
                {curPage.length > 0 && curPage.map((pageBtn, Idx) => (
                    <button key={Idx} className={`ml-2 ${activeBtn === Idx ?  clickBtn : "" }`} onClick={() => handleClickBtn(pageBtn)}>
                        {pageBtn}
                    </button>
                ))}
            </div>
            <div className="bg-zinc-200 rounded-md flex justify-center h-fit p-2 ml-2" ><ArrowRight width={"14px"} height={"14px"} onClick={handleNext} /></div>
        </div>
        <div className="">{curPage}</div>
        <div>{pageInfo.page}</div>
        </div>
    )
}

export default Pagination;