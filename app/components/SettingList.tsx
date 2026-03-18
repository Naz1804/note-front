import SunIcon from 'app/assets/images/icon-sun.svg?react'
import FontIcon from 'app/assets/images/icon-font.svg?react'
import LockIcon from 'app/assets/images/icon-lock.svg?react'
import LogoutIcon from 'app/assets/images/icon-logout.svg?react'

import { useFetcher } from 'react-router'
import { useMediaQuery } from '~/util/useMediaQuery'
import SideNavLink from './SideNavLink'

const SettingList = () => {
  const fetcher = useFetcher();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleLogout = () => {
    fetcher.submit(
      { intent: 'logout' },
      { method: 'post' }
    );
  }

  return (
    <section className={isMobile ? "section-padding h-nav" : 'list-size h-note border-color px-4 py-5'}>
      <h1 className="text-preset-1 mb-4">Settings</h1>

      <div className="flex flex-col gap-2">
        <SideNavLink to='/setting/color' icon={SunIcon} children='Color Theme' />

        <SideNavLink to='/setting/font' icon={FontIcon} children='Font Theme' />

        <SideNavLink to='/setting/change-password' icon={LockIcon} children='Change Password' />

        <div className="w-full h-0.5 bg-neutral-200 dark:bg-neutral-800"/>

        <button onClick={handleLogout} className="focus-link cursor-pointer">
          <LogoutIcon className='w-5 h-5'/>
          <p className='text-preset-4'>Logout</p>
        </button>
      </div>
    </section>
  )
}

export default SettingList