import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import API from './../utils/API'

const links = [
  {
    url: '/',
    label: 'Mon profil'
  },
  {
    url: '/list',
    label: 'Liste'
  }
]

export default () => {
  const onClick = e => {
    e.preventDefault()
    API.logout()
    window.location = '/'
  }
  return (
    <header className='Header wrapper'>
      <nav className='Header-nav'>
        <ul className='Header-links'>
          {links.map(({ url, label }, i) => (
            <li key={i}>
              <Link to={url}>{label}</Link>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={onClick}>Se déconnecter</button>
        </div>
      </nav>
    </header>
  )
}
