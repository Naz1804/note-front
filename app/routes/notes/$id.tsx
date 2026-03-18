import { Form, redirect, useActionData, useLoaderData } from 'react-router'
import type { Route } from './+types/$id'
import { getTokenFromRequest } from '~/util/cookie'
import { archiveNote, deleteNote, getNote, updateNote } from '~/util/noteApi'
import { useRef, useState, useEffect } from 'react'
import { useMediaQuery } from '~/util/useMediaQuery'
import { toast } from 'sonner'

import TagIcon from 'app/assets/images/icon-tag.svg?react'
import ClockIcon from 'app/assets/images/icon-clock.svg?react'

import formatDate from '~/util/timezone'
import DeleteModal from '~/modals/DeleteModal'
import ArchiveModal from '~/modals/ArchiveModal'
import BackBtn from '~/components/BackBtn'


interface NotesData {
  note: Note;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  
  const token = getTokenFromRequest(request);

  const id = params.id;

  const res = await getNote(token, id);
  return res.json();
}

export async function action({ request, params }: Route.ActionArgs) {
  const token = getTokenFromRequest(request);
  const formData = await request.formData();
  const intent = formData.get('intent')
  const id = params.id;

  switch(intent) {
    case 'archive':
      await archiveNote(token, id);
      return redirect(`/notes/${id}`)
    
    case 'delete':
      await deleteNote(token, id);
      return redirect('/notes');
    
    case 'update':
      const data = {
        title: formData.get('title'),
        tags: formData.get('tags'),
        content: formData.get('content')
      };

      const res = await updateNote(token, id, data);
      return { success: true, ...res};

    default:
      return { error: 'Unknown action'}
  }
}


const NotePage = () => {
  const data = useLoaderData<NotesData>();
  const actionData = useActionData<{ success?: boolean}>();
  const [hasChanges, setHasChanges] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)')

  const note = data.note;
  if (!note) return <div>Note not found</div>

  useEffect(() => {
    if(actionData?.success) {
      setHasChanges(false)
    }
  }, [actionData])
  

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    
    const changed = 
      formData.get('title') !== note.title ||
      formData.get('content') !== note.content ||
      formData.get('tags') !== note.tags.join(', ');
    
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
    <section  className={isMobile ? "section-padding h-nav" : "hidden lg:flex w-full h-note"}>

      <div className={isMobile ? "flex items-center text-preset-5 gap-4" : 'hidden'}>
        <BackBtn text='Go Back' />

        <DeleteModal noteId={note.id} />
        
        
        <ArchiveModal noteId={note.id} archived={note.archived} />

        <button type='button' onClick={handleCancel} className='text-neutral-600'>
          Cancel
        </button>

        <button type='submit' form='note-form' disabled={!hasChanges} onClick={handleToast}
        className='text-blue-500 disabled:text-neutral-300'>
          Save Note
        </button>
      </div>

      <div className="w-full h-0.5 bg-line my-3 lg:hidden"/>


      <div className={isMobile ? '' : 'px-6 py-5 w-full flex flex-col'}>
        <Form method='patch' id='note-form' onChange={handleChange} ref={formRef} key={note.id}>
          <input type="hidden" name='intent' value='update' />

          <input type='text' name='title' id='title' defaultValue={note.title} 
          className='text-preset-1 outline-none w-full' required/>

          <div className="flex items-center pt-3 text-preset-6 gap-6">
            <div className="flex flex-col gap-2.5 text-nowrap dark:text-neutral-300">
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
              <textarea id='tags' name='tags' defaultValue={note.tags.join(', ')}
                placeholder='Add tags separated by commas (e.g work, Planning)' 
                className='outline-none w-full h-4 resize-none overflow-hidden placeholder:text-neutral-400' 
              />
              <p>{formatDate(note.updated_at)}</p>
            </div>
          </div>

          <div className="w-full h-0.5 bg-line my-3"/>

          <textarea defaultValue={note.content} name='content' id='content'
          className='w-full outline-none resize-none text-preset-5 text-neutral-800 dark:text-neutral-100'
          style={{ overflow: "hidden" }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}/>
        </Form>

        <div className={isMobile ? 'hidden' : "w-full h-0.5 bg-line my-3 mt-auto"}/>

        <div className={isMobile ? 'hidden' : "flex items-center gap-4 text-preset-4"}>

          <button type='submit' form='note-form' className='blue-btn'
          disabled={!hasChanges} onClick={handleToast}>
            Save Note
          </button>

          <button type='button' onClick={handleCancel} className='grey-btn'>
            Cancel
          </button>
        </div>
      </div>

      <div className={isMobile ? 'hidden' : "max-w-[291px] xl:w-full border-l-2 border-color p-5 text-preset-4"}>
        <ArchiveModal noteId={note.id} archived={note.archived} />

        <DeleteModal noteId={note.id} />
      </div>
    </section>
  )
}

export default NotePage