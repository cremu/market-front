import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import styles from '@/styles/SellProduct.module.css'
import { API_URL } from '@/config/index'

export default function Add() {
  const router = useRouter()

  const [values, setValues] = useState({
    name: '',
    location: '',
    zipCode: '',
    deliveryOption: false,
    price: '',
    isNew: false,
    description: '',
    category: 4
  })

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

    const newProduct = { data: values }
    console.log(newProduct)

    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    if(!res.ok) {
      //console.log('oops! Something went wrong')
    } else {
      const responseProduct = await res.json()
      console.log(responseProduct)
      router.push(`/products/${responseProduct.data.attributes.slug}`)
    }
  }
 
  return (
    <Layout>
      <h1>Add a product</h1>

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

          <button className={`primaryButton ${styles.submitButton}`}>Start the sale!</button>
        </form>

    </Layout>
  )
}