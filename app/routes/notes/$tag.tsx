import { useLoaderData, useParams } from 'react-router'
import type { Route } from './+types/$tag';
import { getTokenFromRequest } from '~/util/cookie';
import { getTag } from '~/util/noteApi';
import ListNote from '~/components/ListNote';
import BackBtn from '~/components/BackBtn';
import NoteList from '~/components/NoteList';

interface NotesData {
  allNotes: Note[];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);

  const res = await getTag(token, params.tag);
  return res.json();
}

const tag = () => {
  const data = useLoaderData<NotesData>();
  const { tag } = useParams();

  return (
    <>
    <section className="section-padding h-nav">
      <BackBtn text='Go Back' />

      <h1 className='text-preset-1 my-4 text-neutral-600 dark:text-neutral-400'>
        Note Tagged: 
        <span className='text-neutral-950 dark:text-white'>
          {' '}{tag}
        </span>
      </h1>

      <p className='text-preset-5 text-neutral-700 dark:text-neutral-300 mb-4'>
        All notes with the {' '}
        <span className='text-neutral-950 dark:text-white'>"{tag}"</span>
        {' '} tag are shown here.

      </p>

      {data.allNotes.map(note => (
        <ListNote key={note.id} 
        endpoint={note.archived ? `/archive/${note.id}` : `/notes/${note.id}`}
        title={note.title} 
        tags={note.tags} 
        time={note.updated_at}/>
      ))}
    </section>

    <NoteList allNotes={data.allNotes} />
    </>
  )
}

export default tag