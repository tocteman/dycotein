import { useState, useEffect } from 'react'
import { apiGet, apiDelete } from '../lib/fetcher'
import { Link, useLocation } from 'wouter'
import toast from 'react-hot-toast'

const DirectoryPage = () => {

  const [ contacts, setContacts] = useState<any[]>([])
  const [location, setLocation ] = useLocation()

  useEffect(() => {
    apiGet('contacts')
    .then(allContacts => setContacts(allContacts))
    .catch(err => toast.error(err.message))
  }, [])
  
  return (
    <div>
      <h1>
        Directorio
      </h1>

      {contacts?.data?.map(contact => (
        <div>
        {contact.first_name}
        </div>
      ))}
    </div>
  )

}

export default DirectoryPage
