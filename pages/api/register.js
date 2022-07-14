import { API_URL } from '@/config/index'
import cookie from 'cookie'

const register = async (req, res) => {
  if(req.method === 'POST') {
    const { username, email, password } = req.body

    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    const userData = await strapiRes.json()

    if(strapiRes.ok) {
      //Set the cookie (on the server)
      res.setHeader('Set-Cookie',
      cookie.serialize('token', userData.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        maxAge: 60 * 60 * 24 * 7, //valid cookie for a week
        sameSite: 'strict',
        path: '/'
      })
    )


      res.status(200).json({user: userData.user})
    } else {
      res.status(userData.error.status).json({message: userData.error.message})
    }

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} is not allowed!` })
  }
}
export default register