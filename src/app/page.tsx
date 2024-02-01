import Search from "@/components/Search";
import NoData from "../../public/svg/NoData";
import HomeItem from "@/components/HomeItem";

export default function Home() {

  const hotItemsData = [
    {id: 1, title: "자전거", view: 10, liked: 8, price: 100000, thumbnail: null},
    {id: 2, title: "인형", view: 2, liked: 5, price: 5000, thumbnail: null},
    {id: 3, title: "돼지저금통", view: 10, liked: 8, price: 100000, thumbnail: null},
    {id: 4, title: "목걸이", view: 7, liked: 5, price: 5000, thumbnail: null},
    {id: 5, title: "귀걸이", view: 109, liked: 8, price: 106500, thumbnail: null},
    {id: 6, title: "책", view: 2, liked: 5, price: 5000, thumbnail: null},
    {id: 7, title: "오토바이", view: 0, liked: 8, price: 60000, thumbnail: null},
    {id: 8, title: "입장권", view: 2, liked: 5, price: 5000, thumbnail: null},
    {id: 9, title: "휴지", view: 10, liked: 8, price: 35890, thumbnail: null},
    {id: 10, title: "인형2", view: 22, liked: 5, price: 4000000, thumbnail: null},

  ]

  return (
    <div className="flex min-h-screen flex-col ">
      <div className="flex flex-col text-left ">
        <p className="text-xs pb-2 font-light">다양한 중고 상품들을 <span className="font-semibold text-MAIN_COLOR">파밍순</span>에서 겟!</p>
        <h1 className="pb-2">필요한 물건부터</h1>
        <h1 className="pb-2">구하지 못했던 한정 상품까지</h1>
      </div>
      <div className="flex flex-row items-center justify-between">

        <div className="w-3/6">
          <Search />
        </div>
        <div className="ml-5 whitespace-nowrap">
          <input type="checkbox" />
          <label className="px-2 outline-none">판매 중인 상품</label>
          <select className="bg-zinc-200 rounded-md w-24 text-sm py-1 ml-5 outline-none">
            <option className="pl-2">최신순</option>
            <option className="pl-2">인기순</option>
            <option className="pl-2">고가순</option>
            <option className="pl-2">저가순</option>
          </select>
        </div>
      </div>
      <div className="py-2 min-h-fit mt-5 flex flex-col justify-center items-center ">
      { hotItemsData ? 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          {hotItemsData.map((item, idx) => (
            <HomeItem key={idx} data={item}/>
          ))}
        </div> :
        <>
          <NoData width={"300px"} height={"300px"}/>
          <p className="my-3">새로운 중고 상품들을 판매해보세요.</p>
          <button className="rounded-md bg-MAIN_COLOR text-white px-8 py-1 hover:bg-DEEP_MAIN">판매 하기</button>
        </>
      }    
      </div>
    </div>
  )
}
