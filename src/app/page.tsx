"use client";
import Search from "@/components/Search";
import NoData from "../../public/svg/NoData";
import HomeItem from "@/components/HomeItem";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState } from "@/stores/searchOptionState";
import { axiosCall } from "@/util/axiosCall";
import { tokenState } from "@/stores/tokenModal";

export interface MerchanTypes {
  itemId: number;
  title: string;
  thumbnailImgUrl: string;
  description: string;
  expiredAt: string;
  highestPrice: number;
  hopePrice: number;
  lowestPrice: number;
  itemStatus: "경매중" | "경매종료" | "판매완료";
  bidCount: number;
  viewCount: number;
  likeCount: number;
}


export default function Home() {
  const [ homeData, setHomeData ] = useState<MerchanTypes[]>([]);
  const [ searchOption,  ] = useRecoilState(searchState)
  const [ sortCode, setSortCode ] = useState("recent");
  const [ isCheckBox, setIsCheckBox ] = useState(false);
  const recoilToken = useRecoilValue(tokenState);
  console.log(recoilToken);

  const handleSortCode = (e:any) => {
    setSortCode(e.target.value);

  }

  const handleCheckBox = (e:any) => {
    const isCheck = e.target.checked;
    console.log(isCheck)
    setIsCheckBox(isCheck);
  }

  const getHomeData = async () => {
    try { 
      //검색 
      const categoryRes = `/api/items?sortCode=${sortCode}&category=${searchOption.option}&keyword=${searchOption.keyword}`;
      const normalRes = `/api/items?sortCode=${sortCode}&keyword=${searchOption.keyword}`;
      //일반 조회 
      const originRes = `/api/items?sortCode=${sortCode}`;


      if( searchOption.keyword !== "" &&  searchOption.option === "category"){
        const res = await axiosCall(categoryRes, "GET");
        console.log(res)
        setHomeData(res.items);

      } else if( searchOption.keyword !== "" &&  searchOption.option === "") {
        const res =  await axiosCall(normalRes, "GET");
        console.log(res);
        setHomeData(res.items);
        
      } else {
        const res = await axiosCall(originRes, "GET");
        console.log(res);
        setHomeData(res.items);

      }

      // const res = await axios.get(`${BASE_URL}/api/items`);

    } catch(err){
      console.log(`홈 상품 아이템 조회 ${err}`)
    }
  };

  useEffect(() => {
    getHomeData();
    
    if(isCheckBox){
      const parsedData = homeData.filter((el)=> {
        el.itemStatus !== "판매완료"
      });

      setHomeData(parsedData);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOption.keyword, sortCode, isCheckBox])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col text-left ">
        <p className="text-xs pb-2 font-light">다양한 중고 상품들을 <span className="font-semibold text-MAIN_COLOR">파밍순</span>에서 겟!</p>
        <h1 className="pb-2">필요한 물건부터</h1>
        <h1 className="pb-2">구하지 못했던 한정 상품까지</h1>
      </div>
      <div className="flex flex-row items-center justify-between pb-10">

        <div className="w-3/6 relative">
          <Search />
        </div>
        <div className="ml-5 whitespace-nowrap pt-5">
          <input type="checkbox" onChange={handleCheckBox}/>
          <label className="px-2 outline-none">판매 중인 상품</label>
          <select 
            className="bg-zinc-200 rounded-md w-24 text-sm py-1 ml-5 outline-none"
            value={sortCode}
            onChange={handleSortCode}
            >
            <option className="pl-2" value="recent" >최신순</option>
            <option className="pl-2" value="hot" >인기순</option>
            <option className="pl-2" value="highest" >고가순</option>
            <option className="pl-2" value="lowest" >저가순</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        { homeData.length > 0 ? 
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-4 mt-10 mb-5">
             {homeData.map((item, idx) => (
              <Link href={`/product/detail/${item.itemId}`} key={`link ${idx}`}>
                <HomeItem key={idx} data={item} />
              </Link>
            ))}
          </div> :
          <div className="flex justify-center flex-col items-center mt-20">
            <NoData width={"300px"} height={"300px"}/>
            <p className="my-3">새로운 중고 상품들을 판매해보세요.</p>
            <Link href={"/product/edit"}><button className="rounded-md bg-MAIN_COLOR text-white px-8 py-1 hover:bg-DEEP_MAIN">판매 하기</button></Link>
          </div>
        }    
      </div>
    </div>
  )
}
