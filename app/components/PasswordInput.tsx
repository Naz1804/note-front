import CloseEyeIcon from 'app/assets/images/icon-hide-password.svg?react'
import InfoIcon from 'app/assets/images/icon-info.svg?react'
import EyeIcon from 'app/assets/images/icon-show-password.svg?react'
import { useState } from 'react'

interface Props {
  label: string;
  id: string;
  info: boolean;
}

const PasswordInput = ({ label, id, info } : Props) => {
  const [showPassword, setshowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor="password" className="text-preset-4">{label}</label>
      </div>

      <div className="flex justify-between primary-input">
        <input type={showPassword ? "text" : "password"} name={id} id={id} minLength={8} required
        className="outline-none w-full pr-2"/>

        <button type="button" onClick={() => setshowPassword(!showPassword)} className="cursor-pointer">
          {showPassword ? 
          <CloseEyeIcon className='text-neutral-500 w-5' /> 
          : 
          <EyeIcon className='text-neutral-500 w-5'/>}
        </button>
      </div>

      {info && <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
        <InfoIcon className='w-4.5' />
        <p className="text-preset-6">At least 8 chracters</p>
      </div>}
    </div>
  )
}

export default PasswordInput