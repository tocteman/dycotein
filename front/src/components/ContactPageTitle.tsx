import { useLocation } from 'wouter'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

const ContactPageTitle = ({title}: {title: string}) => {

  const [location, setLocation] = useLocation()

  return (
    <div className="flex space-x-2">
      <button onClick={() => setLocation("/")}>
        <div className="h-12 w-12">
          <ChevronLeftIcon/>
        </div>
      </button>
      <h1>{title}</h1>
    </div>
  )
}

export default ContactPageTitle
