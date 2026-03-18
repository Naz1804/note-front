import BackIcon from 'app/assets/images/icon-arrow-left.svg?react';
import { useNavigate } from 'react-router';


const BackBtn = ({ text }: {text: string}) => {
  const navigate = useNavigate()

  function handleBtnBack() {
    navigate(-1)
  }

  return (
    <button onClick={handleBtnBack} 
    className='flex items-center gap-1 text-preset-4 lg:hidden
    text-neutral-600 dark:text-neutral-300'>
      <BackIcon className='w-4.5 h-4.5'/>
      {text}
    </button>
  )
}

export default BackBtn