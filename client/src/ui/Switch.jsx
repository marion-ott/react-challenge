import React from 'react'
import styled from 'styled-components'

const Switch = styled.div`
  position: relative;
  margin: auto auto 56px;
  .toggle {
    width: 52px;
    min-height: 28px;
    height: 28px;
    border: solid 1px #ffffff;
    border-radius: 13.5px;
    transition: ease 0.3s all;
    position: relative;
    cursor: pointer;
    div {
      width: 19px;
      height: 19px;
      border-radius: 100px;
      background-color: #ffffff;
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: ${({ isAdmin }) => (isAdmin ? 'calc(100% - 5px)' : '5px')};
      right: ${({ isAdmin }) => (isAdmin ? '5px' : 'calc(100% - 5px)')};
      transform: ${({ isAdmin }) =>
        isAdmin ? 'translate(-100%, -50%)' : 'translate(0, -50%)'};
      transition: ease 0.3s all;
    }
  }
  span {
    position: absolute;
    white-space: nowrap;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.02em;
    color: #fff;
    cursor: default;
    &:first-child {
      right: 150%;
      opacity: ${({ isAdmin }) => (isAdmin ? 0.7 : 1)};
    }
    &:last-child {
      left: 150%;
      opacity: ${({ isAdmin }) => (isAdmin ? 1 : 0.7)};
    }
  }
`

export default ({ onClick, isAdmin }) => (
  <Switch onClick={onClick} isAdmin={isAdmin}>
    <span className='student'>Je suis étudiant</span>
    <div className='toggle'>
      <div></div>
    </div>
    <span className='teacher'>Je suis intervenant</span>
  </Switch>
)
