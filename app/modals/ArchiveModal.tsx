import ArchiveIcon from 'app/assets/images/icon-archive.svg?react'
import RecoverIcon from 'app/assets/images/icon-restore.svg?react'

import { useState } from 'react'
import { useFetcher } from 'react-router'
import { toast } from 'sonner'
import { useMediaQuery } from '~/util/useMediaQuery'


const ArchiveModal = ({ noteId, archived }: { noteId: number, archived: boolean }) => {
    const fetcher = useFetcher();
    const [archiveModal, setarchiveModal] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleRecover = () => {
        fetcher.submit(
            {intent: 'archive' },
            {
                method: 'PATCH',
                action: `/notes/${noteId}`
            }
        );
        toast.success('Note restored to active notes.')
    };

  return (
    <>
    {archived ? 
    <button onClick={handleRecover} className={`${!isMobile && 'border-btn'}`}>
        <RecoverIcon className='w-4.5 h-4.5 dark:text-neutral-300' />
        <p className='hidden lg:block text-nowrap'>Recover Note</p>
    </button>
    :
    <button onClick={() => setarchiveModal(!archiveModal)} 
    className={`${!isMobile && 'border-btn'}`}>
        <ArchiveIcon className='w-4.5 h-4.5 dark:text-neutral-300' />
        <p className='hidden lg:block text-nowrap'>Archive Note</p>
    </button>}

    {archiveModal && 
    <div className="overlay">

        <div className='modal'>
            <div className="flex items-start gap-4 p-5">
                <div className="bg-neutral-100 dark:bg-neutral-600 rounded-lg p-2">
                    <ArchiveIcon className='w-6 h-6.5' />
                </div>

                <div className="">
                    <h4 className='text-preset-3'>Archive Note</h4>

                    <p className='text-preset-5 text-neutral-700 dark:text-neutral-200'>
                        Are you sure you want to archive this note? 
                        You can find it in the Archived Notes section and restore it anytime.
                    </p>
                </div>
            </div>

            <div className='w-full h-0.5 bg-neutral-200 dark:bg-neutral-600 '/>

            <fetcher.Form method='patch' action={`/notes/${noteId}`}
            className='flex items-center py-4 px-5 justify-end gap-4'>

                <input type="hidden" name='intent' value='archive' />

                <button className='grey-btn text-preset-4' onClick={() => setarchiveModal(!archiveModal)}>
                    Cancel
                </button>

                <button type='submit' className='blue-btn text-preset-4' 
                disabled={archived} onClick={() => {toast.success('Note archived.')}}>
                    Archive Note
                </button>
            </fetcher.Form>
        </div>
    </div>}
    </>
  )
}

export default ArchiveModal