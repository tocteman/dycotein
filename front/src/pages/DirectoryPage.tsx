import { useState, useEffect } from 'react'
import { apiGet, apiDelete } from '../lib/fetcher'
import { Link, useLocation } from 'wouter'
import ContactCard from '../components/ContactCard'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import { flagEmoji } from '../lib/utils'

const DirectoryPage = () => {

  const [ contacts, setContacts] = useState<any>([])
  const [location, setLocation ] = useLocation()
  const [ countries, setCountries ] = useState<any>([])

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken")
    if (!token) {
      setLocation('/login')
    }
    apiGet('contacts')
    .then(allContacts => setContacts(allContacts))
    .catch(err => {
      if(err.message === "jwt malformed") {
        setLocation('/login')
      } else {
        toast.error(err.message)
      }
    })
  }, [])

  const logout = () => {
    window.localStorage.removeItem("access_token")
    setLocation('/login')
  }
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between">
        <h1> Directorio </h1>
        <button onClick={() => setLocation("/add_contact")}>
          <h1> + </h1>
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        {(!contacts.data || contacts?.data?.length < 1) && <Loader/>}
        {contacts?.data?.map(contact => (
          <ContactCard contact={contact} key={contact.id}/>
        ))}
      </div>
        <button 
      className="text-red-300 text-xl"
      onClick={logout}
      >
        Salir
      </button>
    </div>
  )

}

export default DirectoryPage
