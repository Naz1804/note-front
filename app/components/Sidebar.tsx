import LogoIcon from 'app/assets/images/logo.svg?react'
import HomeIcon from 'app/assets/images/icon-home.svg?react'
import ArchiveIcon from 'app/assets/images/icon-archive.svg?react'
import TagIcon from 'app/assets/images/icon-tag.svg?react'

import SideNavLink from './SideNavLink'

interface Props {
  tags: string[];
}

const Sidebar = ({ tags }:  Props ) => {
  return (
    <aside className='max-w-[272px] xl:w-full h-screen 
    p-4 text-preset-4 flex flex-col gap-1
    border-r-2 border-color text-nowrap'>

      <LogoIcon className='my-3'/>

      <SideNavLink to='/notes' icon={HomeIcon} children='All Notes'/>

      <SideNavLink to='/archive' icon={ArchiveIcon} children='Archived Notes'/>

      <div className="bg-line w-full h-0.5"/>

      <h5 className='py-2 text-neutral-500'>Tags</h5>

      <div className="overflow-y-auto scrollbar-hide">
        {tags.map((tags, index) => (
          <SideNavLink to={`/notes/tags/${tags}`} icon={TagIcon} children={tags} key={index}/>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar