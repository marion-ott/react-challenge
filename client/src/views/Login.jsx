import React, {useState} from 'react'
import { findDOMNode } from 'react-dom'
import API from './../utils/API'
import Switch from './../ui/Switch'
import Form from './../components/Form'
import styles from './Views.scss'
import formData from '../utils/formData'

const fields = formData.login

export default (props) => {
  const [studentProfile, setProfile] = useState(false) 
  
  const handleLogin = async e => {
    e.persist()
    e.preventDefault()

    const inputs = findDOMNode(e.target).querySelectorAll('.formData')
    const body = {}

    inputs.forEach(input => {
      if (input.value !== '') {
        body[input.name] = input.value
      } else {
        //TODO: error handling
      }
    })

    if (Object.keys(body).length !== inputs.length) {
      //TODO: error handling
      return false
    }

    body.role = 'user'
    const response = await API.login(body)
    
    if (response.status === 'success') {
      props.handleLogin(true)
      // TODO: handle loader after login success
    }
  }

  return (
    <div className='Login'>
      <div className='container'>
        <div className='logoContainer'>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/LOGO.png`}
            alt='Logo'
          />
        </div>
        <Switch />
        <Form onSubmit={handleLogin} fields={fields} />
      </div>
      <div 
        className={`Login-background ${studentProfile ? 'student' : 'teacher'}`}
        style={{backgroundImage: `url(${studentProfile 
          ? `${process.env.PUBLIC_URL}/assets/images/student.png`
          : `${process.env.PUBLIC_URL}/assets/images/teacher.png`})`}}
      ></div>
    </div>
  )
}
