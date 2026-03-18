import { Link, useParams } from "react-router"
import { useMediaQuery } from "~/util/useMediaQuery";

import PlusIcon from 'app/assets/images/icon-plus.svg?react'

const CreateNote = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { id } = useParams();

  if (isMobile && !id) {
    return (
      <Link to='/notes/create' 
      className="bg-blue-500 rounded-full flex items-center justify-center 
      w-12 h-12 md:w-16 md:h-16
      absolute bottom-18 md:bottom-24 right-4 md:right-8.5 z-10 shadow-lg shadow-black/30">
        <PlusIcon />
      </Link>
    )
  }

  return (
    <Link to='/notes/create'>
      <button className="blue-btn text-preset-4 w-full mb-4 text-nowrap">
        + Create New Note
      </button>
    </Link>
  )
}

export default CreateNote