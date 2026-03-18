import ClockIcon from 'app/assets/images/icon-clock.svg?react'
import TagIcon from 'app/assets/images/icon-tag.svg?react'
import InfoIcon from 'app/assets/images/icon-info.svg?react';

import { Form, redirect } from "react-router"
import type { Route } from './+types/create';
import { getTokenFromRequest } from '~/util/cookie';
import { createNote } from '~/util/noteApi';
import { useState, useRef } from 'react';
import BackBtn from '~/components/BackBtn';
import { useMediaQuery } from '~/util/useMediaQuery';
import { toast } from 'sonner';

export async function action({ request }: Route.ActionArgs) {
  const token = getTokenFromRequest(request);
  const formData = await request.formData();

  const bodyObject = {
    title: formData.get('title'),
    tags: formData.get('tags'),
    content: formData.get('content')
  }
  
  const res = await createNote(token, bodyObject)

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message }
  }

  return redirect('/notes')
}

const create = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    
    const changed = 
      formData.get('title') !== '' ||
      formData.get('content') !== '' ||
      formData.get('tags') !== '';
    
    setHasChanges(changed);
  };

  const handleCancel = () => {
    formRef.current?.reset();
    setHasChanges(false);
  }

  const handleToast = () => {
    toast.success('Note saved successfully!')
  }

  return (
    <section className={isMobile ? "section-padding h-nav" : "hidden lg:flex w-full h-note"}>

      <Form method='post' onChange={handleChange} ref={formRef} 
      className={isMobile ? '' : 'px-6 py-5 w-full flex flex-col'}>
        
        <div className={isMobile ? "flex items-center text-preset-5 gap-4" : 'hidden'}>
          <BackBtn text='Go Back' />

          <button type='button' onClick={handleCancel} className='text-neutral-600 ml-auto'>
            Cancel
          </button>

          <button type='submit' disabled={!hasChanges} onClick={handleToast}
          className='text-blue-500 disabled:text-neutral-300'>
            Save Note
          </button>
        </div>

        <div className="w-full h-0.5 bg-line my-3 lg:hidden"/>

        <input type='text' name='title' id='title' placeholder='Enter a title...' 
        className='text-preset-1 outline-none' required/>

        {!isMobile && 
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <InfoIcon className='w-4.5' />
            <p className="text-preset-6">Title is required</p>
          </div>
        }

        <div className="flex items-center pt-3 text-preset-6 gap-6">
          <div className="flex flex-col gap-5.5 text-nowrap dark:text-neutral-300">
            <div className="flex items-center gap-1.5">
              <TagIcon className='w-4 h-4'/>
              <p>Tags</p>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon className='w-4 h-4'/>
              <p>Last edited</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            <textarea id='tags' name='tags'
            placeholder='Add tags separated by commas (e.g work, Planning)' 
            className='outline-none w-full resize-none overflow-hidden placeholder:text-neutral-400' 
            />
            <p className='text-neutral-400'>Not yet saved</p>
          </div>
        </div>

        <div className="w-full h-0.5 bg-line my-3"/>

        <textarea name='content' id='content'
        placeholder='Start typing your note here...' 
        className='w-full outline-none text-preset-5 text-neutral-800 dark:text-neutral-100 resize-none'
        rows={1} style={{ overflow: "hidden" }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}/>

        <div className={isMobile ? 'hidden' : "w-full h-0.5 bg-line my-3 mt-auto"}/>

        <div className={isMobile ? 'hidden' : "flex items-center gap-4 text-preset-4"}>

          <button type='submit' disabled={!hasChanges} onClick={handleToast} 
          className='blue-btn'>
            Save Note
          </button>

          <button type='button' onClick={handleCancel} className='grey-btn'>
            Cancel
          </button>
        </div>
      </Form>

      <div className={isMobile ? 'hidden' : "max-w-[291px] w-full border-l-2 border-color p-5 text-preset-4"}/>
    </section>
  )
}

export default create