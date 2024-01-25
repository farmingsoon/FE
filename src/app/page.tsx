import Search from "@/components/Search";
import NoData from "../../public/svg/NoData";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <div className="flex flex-col text-left ">
        <p className="text-xs pb-2 font-light">다양한 중고 상품들을 <span className="font-semibold text-MAIN_COLOR">파밍순</span>에서 겟!</p>
        <h1 className="pb-2">필요한 물건부터</h1>
        <h1 className="pb-2">구하지 못했던 한정 상품까지</h1>
      </div>
      <div className="flex flex-row items-center">

        <div className="flex-1">
          <Search />
        </div>
        <div className="ml-5 whitespace-nowrap">
          <input type="checkbox" />
          <label className="px-2 outline-none">판매 중인 상품</label>
          <select className="bg-zinc-200 rounded-md w-24 text-sm py-1 ml-5 outline-none">
            <option className="pl-2">최신순</option>
            <option className="pl-2">인기순</option>
          </select>
        </div>
      </div>
      <div className="py-2 h-screen mt-5 flex flex-col justify-center items-center">
        <NoData width={"300px"} height={"300px"}/>
        <p className="my-3">새로운 중고 상품들을 판매해보세요.</p>
        <button className="rounded-md bg-MAIN_COLOR text-white px-8 py-1 hover:bg-DEEP_MAIN">판매 하기</button>
      </div>
    </main>
  )
}
