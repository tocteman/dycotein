import {DevicePhoneMobileIcon, HomeModernIcon, BuildingOfficeIcon } from '@heroicons/react/20/solid'
type Phone = {
  id: number,
  type: 'cellphone' | 'home' | 'office',
  phone: string
}
type Props = {
  phone: Phone,
  isBig: boolean
}
const PhoneCard = ({phone, isBig}: Props) => {
  const { type } = phone
  return (
    <div className="flex space-x-2 items-center">
      <div className={`${isBig ? "h-12 w-12": "h-8 w-8" }`}>
        {type === 'cellphone' && <DevicePhoneMobileIcon/>}
        {type === 'home' && <HomeModernIcon/>}
        {type === 'office' && <BuildingOfficeIcon/>}
      </div>
      {isBig && <h2>{phone.phone}</h2>}
      {!isBig && <h4>{phone.phone}</h4>}
    </div>
  )
}

export default PhoneCard
