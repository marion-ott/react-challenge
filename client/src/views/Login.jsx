import React, {useState} from 'react'
import styled from 'styled-components'
import variables from './../global/variables.scss'
import { findDOMNode } from 'react-dom'
import API from './../utils/API'
import Switch from './../ui/Switch'
import Form from './../components/Form'
import formData from '../utils/formData'
import idValidation from './../utils/idValidation'

const Login = styled.div`
  .Login {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      max-height: 630px;
      padding-bottom: 40px;
      z-index: 1;
    }

    .logoContainer {
      max-width: 115px;
      width: 100%;
      margin-bottom: 50px;
    }

    &-background {
      width: 50%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
      left: ${({ isAdmin }) => (isAdmin ? 'auto' : 0)};
      right: ${({ isAdmin }) => (isAdmin ? 0 : 'auto')};
      max-width: ${({ isAdmin }) => (isAdmin ? '445px' : '555px')};
      background-image: ${({ isAdmin }) =>
        isAdmin
          ? "url('/assets/images/teacher.png')"
          : "url('/assets/images/student.png')"};
      position: absolute;
      z-index: 0;
    }
  }
`


const fields = formData.login

export default (props) => {
  
  const handleLogin = async e => {
    e.persist()
    e.preventDefault()

    const inputs = findDOMNode(e.target).querySelectorAll('.formData')
    const body = {}

    /**
     * Check for refacto using hook useRef
     */
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

    body.role = props.isAdmin ? 'admin' : 'user'
    const response = await API.login(body)
    
    if (response.status === 'success') {
      const hash = await idValidation.hash(response.userId)
      localStorage.setItem('hetic_user', hash)
      props.handleLogin(true)
      // TODO: handle loader after login success
    }
  }

  return (
    <Login isAdmin={props.isAdmin}>
      <div className='Login'>
        <div className='container'>
          <div className='logoContainer'>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/LOGO.png`}
              alt='Logo'
            />
          </div>
          <Switch onClick={props.handleClick} isAdmin={props.isAdmin} />
          <Form onSubmit={handleLogin} fields={fields} />
        </div>
        <div className='Login-background'></div>
      </div>
    </Login>
  )
}
