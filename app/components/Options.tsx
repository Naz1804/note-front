import { Form } from 'react-router';
import BackBtn from './BackBtn';
import { useMediaQuery } from '~/util/useMediaQuery';
import { toast } from 'sonner';

interface settingOptions {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface Props {
  title: string;
  name: string;
  active: string;
  options: settingOptions[];
}

const Options = ({ title, name, active, options}: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className={isMobile ? 
    "section-padding h-nav flex flex-col" : 
    'flex flex-col p-8 w-full max-w-[528px]'}>
      
      <BackBtn text='Setting'/>

      <h1 className="text-preset-1 mt-4">{title} Theme</h1>

      <p className='text-preset-5 text-neutral-700 dark:text-neutral-300 mt-2'>Choose your {title} theme:</p>

      <Form method='patch' id='setting-form' className="flex flex-col gap-4 mt-5">
        {options.map(option => (
          <label htmlFor={option.id} key={option.id} 
          className="border-2 border-color rounded-xl p-4 flex items-center gap-4 
          has-checked:bg-neutral-100 dark:has-checked:bg-neutral-800">

            <div className="bg-white dark:bg-neutral-950 
            border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-2">
              {option.icon}
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className='text-preset-4'>{option.title}</h4>
              <p className='text-preset-6'>{option.description}</p>
            </div>

            <input type="radio" name={name} id={option.id} value={option.id} defaultChecked={active === option.id}
            className='ml-auto outline-none peer'/>
          </label>
        ))}
      </Form>

      <button type='submit' form='setting-form'  className='blue-btn ml-auto mt-5 text-preset-4'
      onClick={() => {toast.success('Settings updated successfully!')}}>
        Apply Changes
      </button>
    </section>
  )
}

export default Options