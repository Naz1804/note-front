import { Outlet } from 'react-router'

function layout () {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-700'>
        <Outlet />
    </div>
  )
}

export default layout