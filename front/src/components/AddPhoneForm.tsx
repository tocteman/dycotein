import { useState, useEffect } from 'react'
import { apiPost } from '../lib/fetcher'
import { PHONE_TYPES } from '../lib/constants'
import {DevicePhoneMobileIcon, HomeModernIcon, BuildingOfficeIcon } from '@heroicons/react/20/solid'
import toast from 'react-hot-toast'
import { useLocation } from 'wouter'
import { Contact } from '../types'

type Props = {
  contact: Contact,
  setDisplayPhoneForm: any
}

const AddPhoneForm = ({contact, setDisplayPhoneForm}: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [ type, setType ] = useState("cellphone")
  const [ location, setLocation] = useLocation()

  const add = async (event) => {
    event.preventDefault()

    const payload = {
      phone: phoneNumber,
      type,
      contact_id: contact.id
    }
    apiPost('phone-numbers', payload)
    .then(res => {
      toast.success("teléfono añadido")
      setLocation("/")
    })
    .catch(err => toast.error(err.message))
  }

  return (
    <form onSubmit={add} className="flex flex-col space-y-4 w-full border-2 border-black rounded p-4">
      <div className="justify-between flex items-center">
        <h2>
          Añadir Teléfono
        </h2>
        <button onClick={() => setDisplayPhoneForm(false)}>
          <h2>
          X
          </h2>
        </button>
      </div>

      <div className="flex space-x-4">
        {PHONE_TYPES.map(x => (
          <div 
          key={x}
          className={ `border-2 border-black rounded-full p-4 w-16 h-16 cursor-pointer ${type === x ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-400"}`} 
          onClick={() => setType(x)}
          >
            {x === 'cellphone' && <DevicePhoneMobileIcon/>}
            {x === 'home' && <HomeModernIcon/>}
            {x === 'office' && <BuildingOfficeIcon/>}
          </div>
        ))}
      </div>
      <div className="input-group">
        <label htmlFor=" ">Número de Teléfono</label>
        <input type="tel" 
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        />
      </div>
      <button type="submit" className="main-btn">
        Guardar
      </button>
    </form>
  )

  

}

export default AddPhoneForm
