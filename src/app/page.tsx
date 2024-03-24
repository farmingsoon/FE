"use client";
import Search from "@/components/Search";
import NoData from "../../public/svg/NoData";
import HomeItem from "@/components/HomeItem";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { searchState } from "@/stores/searchOptionState";
import { axiosCall } from "@/util/axiosCall";
import { useInfiniteScroll } from "@/util/useInfiniteScroll";
import { sortCodeAtom } from "@/stores/sortCodeState";
import FilteringCode from "@/components/FilteringCode";
import { homePageSelector } from "@/stores/homePage";
import axios from "axios";
import LocalStorage from "@/util/localstorage";
import { loginSelector } from "@/stores/loginState";

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
  likeStatus: boolean;
}


export default function Home() {
  const [ homeData, setHomeData ] = useState<MerchanTypes[]>([]);
  const [ searchOption,  ] = useRecoilState(searchState)
  const [ sortCodeState,  ] = useRecoilState(sortCodeAtom);
  const [ , setSelectOption ] = useRecoilState(searchState);
  const [ homePage, setHomePage ] = useRecoilState(homePageSelector);
  const [ pagination, setPagination ] = useState({
    // page: 0,
    hasNext: false,
    hasPrevious: true,
    totalPageSize: 0,
  });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [ finishFetch, setFinishFetch ] = useState(false);
  const isLogin = LocalStorage.getItem("loginState");
  const [, setLogin] = useRecoilState(loginSelector);


  const getHomeData = async (currentPage: number) => {
    try { 
      const categoryRes = `/api/items?page=${currentPage}&itemStatus=${sortCodeState.isCheckBox}&sortCode=${sortCodeState.sortCode}&category=${searchOption.keyword}`; //ok
      const normalRes = `/api/items?page=${currentPage}&itemStatus=${sortCodeState.isCheckBox}&sortCode=${sortCodeState.sortCode}&keyword=${searchOption.keyword}`;
      //일반 조회 
      const originRes = `/api/items?page=${currentPage}&itemStatus=${sortCodeState.isCheckBox}&sortCode=${sortCodeState.sortCode}`;
      const options = { withCredentials: true }

      if( searchOption.keyword !== "" &&  searchOption.option === "category"){
        const res = await axiosCall(categoryRes, "GET", {}, options);
        const resPagination = res.pagination;
        const resData = res.items;
        setHomePage({page: currentPage});
        setPagination({
          // page: currentPage,
          hasNext: resPagination.hasNext,
          hasPrevious: resPagination.hasPrevious,
          totalPageSize: resPagination.totalPageSize,
        });
        setSelectOption({ option : "" , keyword: ""}) // 검색 후 초기화 

        return resData;

      } else if( searchOption.keyword !== "" &&  searchOption.option === "") {
        const res =  await axiosCall(normalRes, "GET", {}, options);
        const resPagination = res.pagination;
        const resData = res.items;
        setHomePage({page: currentPage});
        setPagination({
          // page: currentPage,
          hasNext: resPagination.hasNext,
          hasPrevious: resPagination.hasPrevious,
          totalPageSize: resPagination.totalPageSize,
        });
        setSelectOption({ option : "" , keyword: ""})

        return resData;

      } else {
        const res = await axiosCall(originRes, "GET", {}, options);
        const resPagination = res.pagination;
        const resData = res.items;
        setHomePage({page: currentPage});
        setPagination({
          // page: currentPage,
          hasNext: resPagination.hasNext,
          hasPrevious: resPagination.hasPrevious,
          totalPageSize: resPagination.totalPageSize,
        });
        setSelectOption({ option : "" , keyword: ""})

        return resData;
      }
    } catch(err){
      console.log(`홈 상품 아이템 조회 ${err}`);
      return [];
    }
  };

  const loadMoreItems = async () => {
    if(pagination.totalPageSize -1 <= homePage.page ) {// 마지막 페이지 
      setFinishFetch(true);
      // setShowLoading(false);
      return;
    } 
    const nextPage = homePage.page + 1;
    const moreItems = await getHomeData(nextPage);
    setHomePage({page : nextPage})
    setHomeData(curItems => [...curItems, ...moreItems]);
  };

  const observerRef = useInfiniteScroll(loadMoreItems);

  useEffect(() => {

    const fetchHomeData = async () => {
      try { 
        const curPage = 0;
        const initialDatas = await getHomeData(curPage);
        setHomeData(initialDatas);

      } catch (err){
        console.log(err);
      }
    }

    fetchHomeData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOption.keyword, sortCodeState ]);


  //kakao 로그인 유저 정보 
  useEffect(() => {
    console.log("유저 정보 받기 - 로컬 상태 ", isLogin);

    const kakaoUserInfo = async () => {
      console.log("카카오 로그인 정보 얻는 함수 발동. ")
      try { 
        const kakaoUserInfo = await axios.get(`${BASE_URL}/api/members/info` , {withCredentials: true});
        console.log(kakaoUserInfo.data.result);
        const memberId = kakaoUserInfo.data.result.memberId;
        const nickname = kakaoUserInfo.data.result.nickname;
        const profileImgUrl = kakaoUserInfo.data.result.profileImgUrl;
        setLogin((prev)=> ({
          ...prev,
          isLogin: true,
          memberId: memberId,
      }));
        LocalStorage.setItem("memberId", String(memberId));
        LocalStorage.setItem("userName", nickname);
        LocalStorage.setItem("userProfileImg", profileImgUrl);

      } catch (err){
        console.log("카카오 로그인 에러 ", err)
        //403
      }
    }

    if(isLogin === "true"){
      kakaoUserInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])


  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col text-left ">
        <p className="text-xs pb-2 font-light">다양한 중고 상품들을 
          <span className="font-semibold text-MAIN_COLOR">파밍순</span>에서 겟!
        </p>
        <h1 className="pb-2">필요한 물건부터</h1>
        <h1 className="pb-2">구하지 못했던 한정 상품까지</h1>
      </div>
      <div className="flex flex-row items-center justify-between pb-10">

        <div className="w-3/6 relative">
          <Search />
        </div>
        <FilteringCode />
      </div>

      <div className="w-full">
        { homeData.length > 0 ? 
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-4 mt-10 mb-5">
             {homeData.map((item, idx) => (
                <Link href={`/product/detail/${item.itemId}`} key={`link ${idx}`}>
                  <HomeItem key={idx} data={item} />
                </Link>              
            ))}

            {!finishFetch && (<div ref={observerRef} className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center p-5 text-lg font-semibold text-gray-500 bg-gray-100 rounded-lg shadow animate-pulse">
              ...Loading
            </div>)}
            {finishFetch && (<div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center text-lg text-gray-500 "> 마지막 페이지입니다. </div>)}
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
