import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'

export default function RegisterPage() {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { register, error, setError } = useContext(AuthContext)

  useEffect(() => {
    {error && toast.error(error)}
    return setError(null)
  }, [error, setError])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== passwordConfirm) {
      toast.error('Passwords don\'t match!')
      return
    }
    
    register({ email, username, password })
  }

  return (
    <Layout title='Flea Market | Register'>
      <h1>Registration</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', maxWidth: '40%'}}>
        <label htmlFor='email'>Email Address</label>
        <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        
        <label htmlFor='username'>Choose a username</label>
        <input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>

        <label htmlFor='password'>Create your password</label>
        <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

        <label htmlFor='passwordConfirm'>Confirm your password</label>
        <input type='password' name='passwordConfirm' id='passwordConfirm' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>

        <input type='submit' value='Register' />
      </form>
      <p>Do you have an account already? <Link href='/account/login'>Login</Link></p>
    </Layout>
  )
}