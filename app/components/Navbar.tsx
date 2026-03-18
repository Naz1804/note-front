import HomeIcon from 'app/assets/images/icon-home.svg?react'
import SearchIcon from 'app/assets/images/icon-search.svg?react'
import ArchiveIcon from 'app/assets/images/icon-archive.svg?react'
import TagIcon from 'app/assets/images/icon-tag.svg?react'
import SettingIcon from 'app/assets/images/icon-settings.svg?react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-neutral-950 w-full h-14 md:h-[74px] 
    absolute bottom-0 flex items-center justify-between px-4 sm:px-8 py-3
    border-t-2 border-color shadow-2xl shadow-black z-10">
        
        <NavLink to='/notes' end className={({ isActive }) => `nav-btn ${isActive && 'nav-active'}`}>
          <HomeIcon/>
          <p className='hidden md:block'>Home</p>
        </NavLink>

        <div className='hidden md:block bg-line w-0.5 h-full' />

        <NavLink to='/notes/search' className={({ isActive }) => `nav-btn ${isActive && 'nav-active'}`}>
          <SearchIcon/>
          <p className='hidden md:block'>Search</p>
        </NavLink>

        <div className='hidden md:block bg-line w-0.5 h-full' />

        <NavLink to='/archive' className={({ isActive }) => `nav-btn ${isActive && 'nav-active'}`}>
          <ArchiveIcon/>
          <p className='hidden md:block'>Archived</p>
        </NavLink>

        <div className='hidden md:block bg-line w-0.5 h-full' />
        
        <NavLink to='/notes/tags' className={({ isActive }) => `nav-btn ${isActive && 'nav-active'}`}>
          <TagIcon/>
          <p className='hidden md:block'>Tags</p>
        </NavLink>

        <div className='hidden md:block bg-line w-0.5 h-full' />

        <NavLink to='/setting' className={({ isActive }) => `nav-btn ${isActive && 'nav-active'}`}>
          <SettingIcon/>
          <p className='hidden md:block'>Settings</p>
        </NavLink>
    </nav>
  )
}

export default Navbar