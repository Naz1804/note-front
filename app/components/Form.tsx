import { Form, Link } from "react-router"
import { useState } from "react";

import LogoIcon from 'app/assets/images/logo.svg?react'
import GoogleIcon from 'app/assets/images/icon-google.svg?react'
import EyeIcon from 'app/assets/images/icon-show-password.svg?react'
import CloseEyeIcon from 'app/assets/images/icon-hide-password.svg?react'
import InfoIcon from 'app/assets/images/icon-info.svg?react'

interface Props {
    title: string;
    desc: string;
    btn: string;
    account: string;
    signIn: string;
    linkTo: string;
    error?: string;
}

function FormDesign({ title, desc, btn, account, signIn, linkTo, error }: Props) {

  const [showPassword, setshowPassword] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-950 border-2 border-color rounded-xl 
    w-full max-w-135 min-h-155.75 py-12 px-4 sm:px-8 lg:px-12  flex flex-col mx-4">

      <LogoIcon className='object-contain w-23.75 h-7 mx-auto' />

      <div className="flex flex-col gap-2 self-center text-center mt-6">
        <h1 className="text-preset-1">{title}</h1>
        <p className="text-preset-5 text-neutral-600 dark:text-neutral-300">{desc}</p>
      </div>
    

      <Form method="post" className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-preset-4">Email Address</label>
          <input type="email" name="email" id="email" placeholder="email@example.com" className="primary-input" required/>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-preset-4">Password</label>
            {btn === 'Login' && <Link to='/register' 
            className="text-neutral-600 dark:text-neutral-400 text-preset-6 underline hover:text-blue-500">
              Forgot
            </Link>}
          </div>

          <div className="flex justify-between primary-input">
            <input type={showPassword ? "text" : "password"} name="password" id="password" required
            className="outline-none w-full pr-2"/>

            <button type="button" onClick={() => setshowPassword(!showPassword)} className="cursor-pointer">
              {showPassword ? <CloseEyeIcon className='text-neutral-500 w-5' /> : <EyeIcon className='text-neutral-500 w-5'/>}
            </button>
          </div>

          { btn === 'Sign Up' && <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <InfoIcon className='w-4.5' />
            <p className="text-preset-6">At least 8 chracters</p>
          </div>}
        </div>
        
        {error && <p className="text-red-500 text-preset-6">{error}</p>}
        <button type="submit" className="blue-btn">{btn}</button>
      </Form>


      <div className="bg-line w-full h-0.5 mt-4 mb-6"/>

      <div className="flex flex-col gap-4 text-center">
        <p className="text-preset-5 text-neutral-600 dark:text-neutral-300">Or log in with:</p>

        <Link to='/google' className="border-btn rounded-xl text-preset-3 justify-center">
          <GoogleIcon className='text-neutral-950 dark:text-white' />
          Google
        </Link>

        <div className="bg-line w-full h-0.5"/>

        <div className="flex justify-center gap-2 text-preset-5">
          <p className="text-neutral-600 dark:text-neutral-300">{account}</p>
          <Link to={linkTo} className="hover:text-blue-500">{signIn}</Link>
        </div>
      </div>
    </div>
  )
}

export default FormDesign