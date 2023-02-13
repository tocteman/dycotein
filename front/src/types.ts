export type Contact = {
  id: number,
  first_name: string,
  last_name: string,
  country_id: number
}

export type Phone = {
  id: number,
  type: string,
  phone: string
}

export type Country = {
  id: number,
  name: string,
  flag: string
}
