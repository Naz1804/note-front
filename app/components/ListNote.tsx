import { NavLink } from 'react-router'
import formatDate from '~/util/timezone'

interface Props {
    endpoint: string;
    title: string;
    tags: string[];
    time: string;
}

const ListNote = ({ endpoint, title, tags, time }: Props) => {

  return (
    <NavLink to={endpoint} className={({ isActive }) => 
    `flex flex-col gap-3 px-2 pt-2 mt-1 rounded-md 
    hover:bg-neutral-100 dark:hover:bg-neutral-800 
    ${isActive && 'bg-theme'}`}>
        
        <h3 className='text-preset-3'>{title}</h3>

        <div className="flex gap-1">
            {tags.map((tag, index) => (
                <div key={index} 
                className="bg-neutral-200 dark:bg-neutral-700 
                rounded-sm px-1.5 py-0.5 w-fit">
                    <p className='text-preset-6'>{tag}</p>
                </div>
            ))}
        </div>

        <p className='text-preset-6 text-neutral-700 dark:text-neutral-200'>{formatDate(time)}</p>

        <div className="bg-line w-full h-0.5"/>
    </NavLink>
  )
}

export default ListNote