import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import variables from './../global/variables.scss'
import API from './../utils/API'

const Header = styled.header`
  margin: 0 auto;

  &.wrapper {
    padding-top: 0;
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    font-size: 18px;
    font-weight: 600;
    color: ${variables.white};
    border-bottom: 1px solid rgba($color: ${variables.white}, $alpha: 0.3);
  }

  div,
  li {
    padding-bottom: 9px;
    border-bottom: 2px solid rgba($color: ${variables.white}, $alpha: 0);
    transition: ease .2s all;
  }

  li:not(:first-child) {
    margin-left: 20px;
  }

  li.active,
  div.active,
  li:hover,
  div:hover {
    border-bottom: 2px solid rgba($color: ${variables.white}, $alpha: 0.8);
  }

  ul {
    display: flex;
    height: 100%;
  }

`

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
    <Header className='wrapper'>
      <nav>
        <ul>
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
    </Header>
  )
}
