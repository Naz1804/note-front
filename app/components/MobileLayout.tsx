import { Outlet } from "react-router"
import CreateNote from "~/components/CreateNote"
import Navbar from "~/components/Navbar"
import LogoIcon from 'app/assets/images/logo.svg?react'

const mobileLayout = () => {

  return (
    <div>
      <header className='bg-neutral-100 dark:bg-neutral-700 px-4 py-3'>
        <LogoIcon />
      </header>

      <Outlet />

      <CreateNote />
      <Navbar />
    </div>
  )
}

export default mobileLayout