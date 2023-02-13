import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useLocation } from 'wouter'
import PhoneCard from './PhoneCard'
import { flagEmoji } from '../lib/utils'

const ContactCard = ({contact}) => {

  const [location, setLocation] = useLocation()
  const phones = contact.phoneNumbers?.data ?? []

  const nationality = contact.nationality.data[0]
  
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
      <div className="flex justify-between items-end">
        <div className="flex flex-col space-y-2">
          {phones.map(phone => (
            <PhoneCard phone={phone} key={phone.id}/>
          ))}
        </div>
        <div>
            {flagEmoji(nationality.flag)}
        </div>

      </div>
      

    </div>
    
  )
}

export default ContactCard
