import { useLoaderData } from 'react-router';
import { getTokenFromRequest } from '~/util/cookie';
import type { Route } from './+types/archived';
import { getAllNotes } from '~/util/noteApi';
import ListNote from '~/components/ListNote';

interface NotesData {
  allNotes: Note[];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);

  const res = await getAllNotes('/archived', token);
  return res.json();
}

function archivePage() {
  const data = useLoaderData<NotesData>();

  return (
    <section className='section-padding h-nav'>
      <h1 className='text-preset-1'>Archived Notes</h1>

      <p className='text-preset-5 text-neutral-700 dark:text-neutral-200 pt-2 mb-4'>
        All your archived notes are stored here. You can restore or delete them anytime.
      </p>

      {data.allNotes.length > 0 ? data.allNotes.map(note => (
        <ListNote key={note.id} 
        endpoint={`/archive/${note.id}`} 
        title={note.title} 
        tags={note.tags} 
        time={note.updated_at}/>
      )) :

      <div className="bg-theme border-2 border-neutral-200 dark:border-neutral-700 rounded-lg p-2">
        <p className='text-preset-5'>
          No notes have been archived yet. Move notes here for safekeeping, or
          <span className='underline'> create a new note</span>
        </p>
      </div>
      }
    </section>
  )
}

export default archivePage
