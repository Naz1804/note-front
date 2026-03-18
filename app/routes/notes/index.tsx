
import { useLoaderData } from 'react-router';
import type { Route } from './+types/index';
import { getTokenFromRequest } from '~/util/cookie';
import { getAllNotes } from '~/util/noteApi';
import ListNote from '~/components/ListNote';

interface NotesData {
  allNotes: Note[];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);

  const res = await getAllNotes('/' , token);
  return res.json();
}

function notesPage() {
  const data = useLoaderData<NotesData>();

  return (
    <section className='section-padding h-nav'>
      <h1 className='text-preset-1 mb-4'>All Notes</h1>

      {data.allNotes.length > 0 ? data.allNotes.map(note => (
        <ListNote key={note.id} 
        endpoint={`/notes/${note.id}`} 
        title={note.title} 
        tags={note.tags} 
        time={note.updated_at}/>
      )) : 
      
      <div className="bg-theme border-2 border-neutral-200 dark:border-neutral-700 rounded-lg p-2">
        <p className='text-preset-5'>
          You don't have any notes yet. Start a new note to capture your thoughts and ideas.
        </p>
      </div>

      }
    </section>
  )
}

export default notesPage
