import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'


export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error, setError } = useContext(AuthContext)

  useEffect(() => {
    {error && toast.error(error)}
    return setError(null)
  }, [error, setError])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title='Flea Market | Login'>
      <h1>Log In</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', maxWidth: '40%'}}>
        <label htmlFor='email'>Email Address</label>
        <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor='password'>Create your password</label>
        <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

        <input type='submit' value='Login' />
      </form>
      <p>Don&apos;t have an account yet? <Link href='/account/register'>Register</Link></p>
    </Layout>
  )
}