import { useLocation } from "react-router"
import ListNote from "./ListNote"
import CreateNote from "./CreateNote";

interface Props {
  allNotes: Note[];
}

const NoteList = ({ allNotes }:  Props ) => {
  const location = useLocation();

  const isArchive = location.pathname.includes('/archive');

  return (
    <section className="list-size h-note border-color hidden lg:block overflow-y-auto scrollbar-hide">
      <CreateNote />

      {isArchive && 
      <p className='text-preset-5 text-neutral-700 dark:text-neutral-200 pt-2 mb-4'>
        All your archived notes are stored here. You can restore or delete them anytime.
      </p>
      }

      {allNotes.length > 0 ? 
      
        allNotes.map(note => (
          <ListNote key={note.id} 
          endpoint={note.archived ? `/archive/${note.id}` : `/notes/${note.id}`} 
          title={note.title} tags={note.tags} time={note.updated_at}/>
        ))

        : 

        <div className="bg-theme border-2 border-neutral-200 dark:border-neutral-700 rounded-lg p-2">
          {isArchive ? 
          <p className='text-preset-5'>
            No notes have been archived yet. Move notes here for safekeeping, or
            <span className='underline'> create a new note</span>
          </p>
          :
          <p className='text-preset-5'>
            You don't have any notes yet. Start a new note to capture your thoughts and ideas.
          </p>
          }
        </div>
      }
    </section>
  )
}

export default NoteList

