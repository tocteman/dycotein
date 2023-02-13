import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useLocation } from 'wouter'
import PhoneCard from './PhoneCard'

const ContactCard = ({contact}) => {

  const [location, setLocation] = useLocation()
  const phones = contact.phoneNumbers?.data ?? []
  
  return (
    <div className="p-4 border-2 border-black rounded shadow flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <h2>{contact.first_name}</h2>
          <h2>{contact.last_name}</h2>
        </div>
        <button
        onClick={() => setLocation(`/contacts/${contact.id}`)}>
          <div className="w-8 h-8">
            <ChevronRightIcon/>
          </div>
        </button>
      </div>
      <div>
        {phones.map(phone => (
          <PhoneCard phone={phone} key={phone.id}/>
        ))}
        
      </div>
      

    </div>
    
  )
}

export default ContactCard
