import { useState } from 'react'
import { useLocation } from 'wouter'
import { apiPost } from '../lib/fetcher'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [location, setLocation] = useLocation()

  const login = async (event) => {
    event.preventDefault()
    const payload = {
      email,
      password,
      strategy: "local"
    }
    apiPost('authentication', payload)
    .then(({accessToken}) => {
      window.localStorage.setItem("accessToken", accessToken) 
      toast.success("Autenticado correctamente")
      setLocation("/")
    })
    .catch(err => {
      console.log({err})
      toast.error("Error!")
    })
  }

  return (
    <div className="flex flex-col space-y-8">
      <h1>Login</h1>
      <form onSubmit={login} className="flex flex-col space-y-4 max-w-sm">
        <div className="input-group">
          <label htmlFor="password">Usuario</label>
          <input type="text" 
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Clave</label>
          <input 
          type="password" 
          name="password"
          label={password}
          onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="main-btn" >Ingresar</button>

      </form>

    </div>
  )
}

export default LoginPage
