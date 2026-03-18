import TagIcon from 'app/assets/images/icon-tag.svg?react'
import type { Route } from './+types/tags'
import { getTagsNote } from '~/util/noteApi';
import { Link, useLoaderData } from 'react-router';
import { getTokenFromRequest } from '~/util/cookie';

interface NotesData {
  tags: string[];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = getTokenFromRequest(request);

  const res = await getTagsNote(token);
  return res.json()
}

const tags = () => {
  const data = useLoaderData<NotesData>();

  return (
    <section className="section-padding h-nav">
      <h1 className='text-preset-1 mb-4'>Tags</h1>

      {data.tags.map((tags, index) => (
        <Link to={`/notes/tags/${tags}`} key={index} className="">
          <div className="flex items-center py-3 gap-2 text-neutral-700 dark:text-neutral-300">
            <TagIcon className='w-5 h-5' />

            <p className='text-preset-4'>{tags}</p>
          </div>

          <div className='w-full h-0.5 bg-line'/>
        </Link>
      ))}
    </section>
  )
}

export default tags