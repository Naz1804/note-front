import SearchIcon from 'app/assets/images/icon-search.svg?react';
import SettingIcon from 'app/assets/images/icon-settings.svg?react'

import { Link, useLocation, useParams } from 'react-router';

interface Props {
  inputValue?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ inputValue, handleSearch }: Props) => {
  const location = useLocation();
  const { tag } = useParams();
  const isArchive = location.pathname.includes('/archive');
  const isTag = location.pathname.includes('/tags');
  const isSetting = location.pathname.includes('/setting');
  const isSearch = location.pathname.includes('/search')

  let title;

  if (isArchive) {
    title = 'Archived Notes';
  } else if (isTag) {
    title = tag;
  } else if (isSetting) {
    title = 'Settings'
  } else if (isSearch) {
    title = inputValue
  } else {
    title = 'All Notes'
  }

  return (
    <header className="hidden lg:flex items-center gap-6 px-8 w-full h-20
    border-b-2 border-color">

      <h1 className="text-preset-1">
        {(isSearch || isTag) &&  
        <span className='text-neutral-600 dark:text-neutral-400'>
          {isTag ? 'Notes Tagged:' : 'Showing results for:'}
        </span>}
        {' '} {title}
      </h1>

      <div className="flex justify-between primary-input my-4 ml-auto">
        <SearchIcon className='text-neutral-500' />

        <input type="search" value={inputValue} onChange={handleSearch}
        className='outline-none w-full pl-2' placeholder='Search by title or tags...'/>
      </div>

      <Link to='/setting'>
        <SettingIcon />
      </Link>
    </header>
  )
}

export default SearchBar