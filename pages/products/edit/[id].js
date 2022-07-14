import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '@/components/Layout'
import styles from '@/styles/SellProduct.module.css'
import { API_URL } from '@/config/index'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

export default function EditProductPage({ product }) {

  console.log(product)

  const router = useRouter()
  const [values, setValues] = useState({
    name: product.data.attributes.name,
    location: product.data.attributes.location,
    zipCode: product.data.attributes.zipCode,
    deliveryOption: product.data.attributes.deliveryOption,
    price: product.data.attributes.price,
    isNew: product.data.attributes.isNew,
    description: product.data.attributes.description,
    category: product.data.attributes.category.data.id,
  })

  //Get last image from the array of media a Product has
  let last = 0
  if(product.data.attributes.media.data !== null) {
    last = product.data.attributes.media.data.length -1
  }
  const [imagePreview, setImagePreview] = useState(
    product.data.attributes.media.data ? product.data.attributes.media.data[last].attributes.formats.thumbnail.url : null
  )
  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type } = e.target

    if(type === 'checkbox') {
    setValues({...values, [name]: e.target.checked})
    } else {
      setValues({ ...values, [name]: value })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // [X]TODO: Extra validation

    const changedProduct = { data: values }
    console.log(changedProduct)
    const res = await fetch(`${API_URL}/api/products/${product.data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changedProduct)
    })
    if(!res.ok) {
      console.log('oops! Something went wrong')
    } else {
      const responseProduct = await res.json()
      console.log(responseProduct)
      router.push(`/products/${responseProduct.data.attributes.slug}`)
    }
  }

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/products/${product.data.id}?populate=%2A`)
    const updatedProduct = await res.json()
    console.log(updatedProduct)

    //Get last image from the array of media a Product has
    let lastImgIndex = 0
    if(updatedProduct.data.attributes.media.data !== null) {
      lastImgIndex = updatedProduct.data.attributes.media.data.length -1
    }
    setImagePreview(updatedProduct.data.attributes.media.data[lastImgIndex].attributes.formats.thumbnail.url)
    setShowModal(false)
  }
 
  return (
    <Layout>
      <h1>Edit product</h1>

        <form className={styles.form} onSubmit={handleSubmit}>

          <label htmlFor='name'>What are you selling?</label>
          <input className={styles.inName} type='text' name='name' id='name' value={values.name} onChange={handleInputChange} />

          <div className={styles.rowInputs}>
              <div className={styles.inputCol}>
                <label htmlFor='price'>How much would it cost?</label>
                <input className={styles.inPrice} type='text' name='price' id='price' value={values.price} onChange={handleInputChange} />
              </div>

              <div className={styles.inputCol}>
                <label htmlFor='isNew'>This product is:</label>
                <input className={styles.checkboxNew} type='checkbox' name='isNew' id='isNew' value={values.isNew} onChange={handleInputChange} />
              </div>
          </div>

          <div className={styles.rowInputs}>
              <div className={styles.inputCol}>
                <label htmlFor='location'>Where is it located?</label>
                <input type='text' name='location' id='location' value={values.location} onChange={handleInputChange} />
              </div>
              <div className={styles.inputCol}>
                <label htmlFor='zipCode'>Zip code</label>
                <input className={styles.inZip} type='text' name='zipCode' id='zipCode' value={values.zipCode} onChange={handleInputChange} />
              </div>
              <div className={styles.inputCol}>
                <label htmlFor='delivery'>Would you deliver?</label>
                <input className={styles.checkboxDelivery} type='checkbox' name='deliveryOption' id='deliveryOption' value={values.deliveryOption} onChange={handleInputChange} />
              </div>
          </div>

          <label htmlFor='description'>Describe the product and its conditions</label>
          <textarea className={styles.textArea} name='description' id='description' rows='6' value={values.description} onChange={handleInputChange} ></textarea>

          <button className={`primaryButton ${styles.submitButton}`}>Update product</button>
        </form>

        <h3>Product Image</h3>
        {imagePreview ? (
          <div className={styles.imgContainer}>
            <Image
              className={styles.image} 
              src={imagePreview}
              priority={true}
              alt='product image'
              layout='fill'
              objectFit='cover'   
            />
          </div>
        ) : (
          <p>No image uploaded!</p>
        )}
        <div className={styles.productControls}>
          <button className={`${styles.largeButton} primaryAccentButton`} onClick={() => setShowModal(true)}>
              Set image
          </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload productId={product.data.id} imageUploaded={imageUploaded} />
      </Modal>

    </Layout>
  )
}

export async function getServerSideProps({params: {id}, req}) {
  const res = await fetch(`${API_URL}/api/products/${id}?populate=%2A`)
  const product = await res.json()

  console.log(req.headers.cookie)

  return {
    props: {
      product
    }
  }
}