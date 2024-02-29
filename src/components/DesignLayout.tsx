"use client"

import SSEModal from '@/components/navModal/SSEModal';
import SearchModal from '@/components/navModal/SearchModal';
import { menuState } from '@/stores/NavMenuState'
import { useRecoilValue } from 'recoil'
import LoginTokenModal from './modal/LoginTokenModal';
import { tokenState } from '@/stores/tokenModal';
// import NotificationItem from './sse/NotificationItem';
// import { showNotificationAtom } from '@/stores/showNotification';


export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const optionMenu = useRecoilValue(menuState);
  //onOff가 true 인 것만 가져오기
  const activeMenus = optionMenu.filter(el => el.onOff);

  //실시간 알림 상단 알림 바 
  // const showNotification = useRecoilValue(showNotificationAtom);

  //token만료
  const isToken = useRecoilValue(tokenState);

  return (
    <main className="flex-1 py-8 px-5 min-h-screen overflow-y-auto">
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
