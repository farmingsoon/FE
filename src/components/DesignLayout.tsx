"use client"

import SSEModal from '@/components/navModal/SSEModal';
import SearchModal from '@/components/navModal/SearchModal';
import { menuState } from '@/stores/NavMenuState'
import { useRecoilValue } from 'recoil'


export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const optionMenu = useRecoilValue(menuState);
  //onOff가 true 인 것만 가져오기
  const activeMenus = optionMenu.filter(el => el.onOff)
  return (
    <main className="flex-1 py-8 px-5 h-screen overflow-y-auto">
      {children}
      {activeMenus.map((el, idx) => {
      if(el.menu === "search") {
        return <SearchModal key={`${el.menu} with ${idx}`}/>
      }
      if(el.menu === "alarm") {
        return <SSEModal key={`${el.menu} with ${idx}`}/>
      }
    })}
    </main>
  )
}


   
{/* <html lang="ko">
  <body className="flex flex-row">
    <RecoilRootProvider >
      <Navbar />
      <main className="flex-1 py-8 px-5 h-screen overflow-y-auto">
      {children}
      </main>  
    </RecoilRootProvider>
    </body>
</html> */}