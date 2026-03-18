import SearchIcon from 'app/assets/images/icon-search.svg?react'
import ListNote from '~/components/ListNote';
import SearchBar from '~/components/SearchBar';

import type { Route } from './+types/search'
import { getTokenFromRequest } from '~/util/cookie'
import { Link, useLoaderData, useSearchParams } from 'react-router';
import { searchNote } from '~/util/noteApi';
import { useEffect, useState } from 'react';
import CreateNote from '~/components/CreateNote';

interface NotesData {
  allNotes: Note[];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);

  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!query) return  { allNotes: [] };

  const res = await searchNote(token, query) 
  return res.json();
}

const search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useLoaderData<NotesData>();
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({ q: inputValue });
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <>
    <section className="section-padding h-nav flex flex-col lg:hidden">
      <h1 className='text-preset-1'>Search</h1>


      <div className="flex justify-between primary-input my-4">
        <SearchIcon className='text-neutral-500' />

        <input type="search" value={inputValue} onChange={handleSearch}
        className='outline-none w-full pl-2' placeholder='Search by title or tags...'/>
      </div>

      {inputValue.length > 0 && 
      <p className='text-preset-5 text-neutral-700 dark:text-neutral-300 mb-4'>
        All notes matching {' '}
        <span className='text-neutral-950 dark:text-white'>"{inputValue}" </span>
        {' '} are displayed below.
      </p>
      }

      {data.allNotes.length == 0 && inputValue.length > 0 &&
        <div className="bg-theme rounded-lg p-2
        border-2 border-neutral-200 dark:border-neutral-700 ">
          <p className='text-preset-5'>
            No notes match your search. Try a different keyword or {' '}
            <Link to='/notes/create' className='underline'>create a new note</Link>
          </p>
        </div>
      }

      {data.allNotes.map(note => (
        <ListNote key={note.id} 
        endpoint={note.archived ? `/archive/${note.id}` : `/notes/${note.id}`}
        title={note.title} 
        tags={note.tags} 
        time={note.updated_at}/>
      ))}
    </section>

    {/* DESKTOP VIEW */}
    
    <div className="w-full hidden lg:block">
      <SearchBar inputValue={inputValue} handleSearch={handleSearch} />

      <section className="list-size h-note border-color hidden lg:block">
        <CreateNote />

        {data.allNotes.length == 0 && inputValue.length > 0 &&
          <div className="bg-theme rounded-lg p-2
          border-2 border-neutral-200 dark:border-neutral-700 ">
            <p className='text-preset-5'>
              No notes match your search. Try a different keyword or {' '}
              <Link to='/notes/create' className='underline'>create a new note</Link>
            </p>
          </div>
        }

        {data.allNotes.length == 0 && inputValue.length == 0 &&
          <div className="bg-theme rounded-lg p-2
          border-2 border-neutral-200 dark:border-neutral-700 ">
            <p className='text-preset-5'>
              Search by title or tags
            </p>
          </div>
        }

        {data.allNotes.map(note => (
          <ListNote key={note.id} 
          endpoint={note.archived ? `/archive/${note.id}` : `/notes/${note.id}`}
          title={note.title} 
          tags={note.tags}
          time={note.updated_at}/>
        ))}
      </section>
    </div>
    </>
  )
}

export default search