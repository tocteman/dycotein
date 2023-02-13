import { useState, useEffect } from 'react'
import { apiPost, apiGet } from '../lib/fetcher'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import { flagEmoji } from '../lib/utils'
import ContactPageTitle from '../components/ContactPageTitle'

const AddContactPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nationality, setNationality] = useState("")
  const [location, setLocation] = useLocation()
  const [countries, setCountries] = useState<any>([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  const add = async (event) => {
    event.preventDefault()
    const payload = {
      first_name: firstName,
      last_name: lastName,
      country_id: selectedCountry?.id
    }
    apiPost('contacts', payload)
    .then(res => {
      toast.success("Contacto Añadido")
      setLocation(`contacts/${res.id}`)
    })
    .catch(err => {
      toast.error(err.message)
    })
  }

  useEffect(() => {
    apiGet('countries')
    .then(availableCountries => setCountries(availableCountries))
    .catch(err => toast.error(err.message))
  }, [])

  return (
    <div className="flex flex-col space-y-6">
      <ContactPageTitle title="Añadir Contacto"/>
      <form onSubmit={add} className="flex flex-col space-y-4">
        <div className="input-group">
          <label htmlFor="first-name">Nombre</label>
          <input
          type="text"
          name="first-name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="first-name">Apellido</label>
          <input
          type="text"
          name="last-name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 mt-4">
      {(!countries.data || countries?.data?.length < 1) && <Loader/>}
        {countries?.data?.map(x => (
          <div 
          key={`${x.id}`}
          className={ `border-2 border-black rounded-full p-4 text-2xl w-20 h-20 cursor-pointer ${selectedCountry === x ? "bg-gray-700" : "bg-gray-800"}`} 
          onClick={() => setSelectedCountry(x)}
          >
            <div className="text-2xl mt-1.5 ml-1.5">
            {flagEmoji(x.flag)}
            </div>
          </div>
        ))}
        </div>
        <button className="main-btn">
          Guardar
        </button>

      </form>
    </div>
  )

}

export default AddContactPage

