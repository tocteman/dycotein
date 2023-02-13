const apiBaseUrl = import.meta.env.VITE_API_URL
const token = () =>  window.localStorage.getItem("accessToken")

export const apiGet = (suffix: string, params: string = '') => {
  const url = `${apiBaseUrl}/${suffix}${params}`
  return  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
   },
  })
  .then(handleResponse)
}
export const apiPost = async (suffix: string, body: any) => {
  const url = `${apiBaseUrl}/${suffix}`
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(handleResponse)
}
export const apiPatch = async (suffix: string, body: any) => {
  const url = `${apiBaseUrl}/${suffix}`
  return await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(handleResponse)
}

export const apiDelete = async (suffix: string) => {
  const url = `${apiBaseUrl}/${suffix}`
  return await fetch(url, { 
      method: "DELETE", credentials: 'include'
  })
  .then(handleResponse)
}

const parseResponseMessage = text => {
  if (!text) return "Error"
  let parsed = null
  try {
    parsed = JSON.parse(text)
  } catch (e) {
    parsed = text
  }
  return parsed 
}

const handleResponse = response => {
  return response.text()
  .then(text => {
      const data = parseResponseMessage(text)
        if (!response.ok) {
            const resError = (data && data.message) || response?.statusText;
            return Promise.reject(data ?? resError);
        }
        return data
    })
}
