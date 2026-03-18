import BinIcon from 'app/assets/images/icon-delete.svg?react'

import { useState } from 'react'
import { useFetcher } from 'react-router'
import { toast } from 'sonner';
import { useMediaQuery } from '~/util/useMediaQuery';

const DeleteModal = ({ noteId }: { noteId: number }) => {
    const fetcher = useFetcher();
    const [deleteModal, setdeleteModal] = useState(false)
    const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
    <button className={`ml-auto dark:text-neutral-300 ${!isMobile && 'border-btn mt-3'} `}
    onClick={() => setdeleteModal(!deleteModal)}>
        <BinIcon className='w-4.5 h-4.5'/>
        <p className='hidden lg:block text-nowrap'>Delete Note</p>
    </button>

    {deleteModal && 
    <div className="overlay">

        <div className='modal'>

            <div className="flex items-start gap-4 p-5">
                <div className="bg-neutral-100 dark:bg-neutral-600 rounded-lg p-2">
                    <BinIcon className='w-6 h-6.5' />
                </div>

                <div className="">
                    <h4 className='text-preset-3'>Delete Note</h4>

                    <p className='text-preset-5 text-neutral-700 dark:text-neutral-200'>
                        Are you sure you want to permanently delete this note? This action cannot be undone.
                    </p>
                </div>
            </div>

            <div className='w-full h-0.5 bg-neutral-200 dark:bg-neutral-600'/>

            <fetcher.Form method='delete' action={`/notes/${noteId}`}
            className='flex items-center py-4 px-5 justify-end gap-4'>
                <input type="hidden" name='intent' value='delete' />

                <button className='grey-btn text-preset-4' onClick={() => setdeleteModal(!deleteModal)}>
                    Cancel
                </button>

                <button type='submit' 
                className='rounded-lg text-white text-preset-4 
                bg-red-500 disabled:bg-red-100 py-3 px-4'
                onClick={() => {toast.success('Note permanently deleted.')}}>
                    Delete Note
                </button>
            </fetcher.Form>
        </div>
    </div> }
    </>
  )
}

export default DeleteModal