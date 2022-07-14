import { API_URL } from '@/config/index'
import cookie from 'cookie'

const user = async (req, res) => {
  if(req.method === 'GET') {
    if(!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized' })
      return
    }
    //If cookie is set then: parse the cookie and get the jwt-token
    const { token } = cookie.parse(req.headers.cookie)
    //Use the token to send to Strapi 
    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const user = await strapiRes.json()

    if(strapiRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User forbidden!' })
    }


  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed!` })
  }
}
export default user