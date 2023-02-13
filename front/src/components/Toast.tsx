import { Fragment } from 'react'
import { Toaster, resolveValue } from 'react-hot-toast';
import { CheckIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react'

const Toast = () => {
  return (
    <Toaster>
      {(t) => (
      <Transition
        show={t.visible}
        as={Fragment}
        enter="transition-opacity ease-in duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={ 
            `text-white flex items-center space-x-4 px-4 py-2 rounded-lg
            ${t.type === 'success' ? 'bg-green-500' : 'bg-red-700' }`
          }
        >
            <div className="h-5 w-5 mr-2">
            {t.type === 'success' && <CheckIcon/> }
            {t.type === 'error' && <XCircleIcon/> }
            </div>
          {resolveValue(t.message, t)}
        </div>
        </Transition>
      )}
    </Toaster>
  )
}

export default Toast
