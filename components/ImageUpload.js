import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/SellProduct.module.css'

export default function ImageUpload({ productId, imageUploaded}) {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'api::product.product')
    formData.append('refId', productId)
    formData.append('field', 'media')

    console.log([...formData])
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })
    if(res.ok) {
      console.log(res)
      imageUploaded()
    } else {
      console.log('error')
    }

  }
  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' />
      </form>
    </div>
  )
}