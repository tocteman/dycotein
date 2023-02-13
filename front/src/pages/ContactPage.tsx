import { useState, useEffect } from 'react'
import { apiGet } from '../lib/fetcher'
import { useLocation, useRoute, Link } from 'wouter'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import ContactPageTitle from '../components/ContactPageTitle'
import PhoneCard from '../components/PhoneCard'
import AddPhoneForm from '../components/AddPhoneForm'
import { flagEmoji } from '../lib/utils'


const ContactPage = () => {
  const [contact, setContact] = useState(null)
  const [location, setLocation] = useLocation()
  const [match, params] = useRoute("/contacts/:id");
  const [displayPhoneForm, setDisplayPhoneForm] = useState(false)

  useEffect(( ) => {
    apiGet(`contacts/${params.id}`)
    .then(res => {
      setContact(res)
    })
    .catch(err => {
      toast.error(err.message)
    })
  }, [])


  if (!contact) return <Loader/>

  const nationality = contact.nationality.data[0]
  const phones = contact?.phoneNumbers?.data ?? []
  const fullName = `${contact?.first_name} ${contact?.last_name}`

  return (
    <div>
      <ContactPageTitle title={fullName}/>
      <hr className="border-2 border-gray-700 my-4"/>

      <div className="flex space-x-4">
        <h2>
        {flagEmoji(nationality.flag)}
        </h2>
        <h2>{nationality.name}</h2>
      </div>
      <hr className="border-2 border-gray-700 my-4"/>

      <div className="my-4 flex flex-col space-y-6">
        {phones.map(phone => (
          <PhoneCard phone={phone} key={phone.id} isBig={true}/>
        )) }
      </div>
      {!displayPhoneForm &&
      <button onClick={() => setDisplayPhoneForm(true)} className="main-btn">
        Añadir Teléfono
      </button>
      }
      {displayPhoneForm && 
      <AddPhoneForm
      contact={contact}
      setDisplayPhoneForm={setDisplayPhoneForm}
      />
      }
    </div>
  )
}

export default ContactPage
