"use client"

import SSEModal from '@/components/navModal/SSEModal';
import SearchModal from '@/components/navModal/SearchModal';
import { menuState } from '@/stores/NavMenuState'
import { useRecoilValue } from 'recoil'
import LoginTokenModal from './modal/LoginTokenModal';
import { tokenState } from '@/stores/tokenModal';


export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const optionMenu = useRecoilValue(menuState);
  //onOff가 true 인 것만 가져오기
  const activeMenus = optionMenu.filter(el => el.onOff);

  //token만료
  const isToken = useRecoilValue(tokenState);

  return (
    <main className="sm:flex-1 overflow-x-hidden px-2 sm:py-8 pt-36 sm:pt-10 sm:px-5 min-h-screen overflow-y-auto">
      {/* {showNotification && <NotificationItem />} */}
      {children}
      {activeMenus.map((el, idx) => {
      if(el.menu === "search") {
        return <SearchModal key={`${el.menu} with ${idx}`}/>
      }
      if(el.menu === "alarm") {
        return <SSEModal key={`${el.menu} with ${idx}`}/>
      }
      })}
      {isToken.tokenExpired ===true &&  <LoginTokenModal />}
    </main>
  )
}
