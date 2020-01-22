import React from 'react'
// import ReactDom from 'react-dom'
import styled from 'styled-components'

const Border = styled.div`
  display: flex;
  align-items: center;
  width: 52px;
  min-height: 28px;
  height: 28px;
  margin: auto auto 56px;
  padding: 0 5px;
  border: solid 1px #ffffff;
  border-radius: 13.5px;
  transition: ease 0.3s all;
`

const Circle = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 100px;
  background-color: #ffffff;
  pointer-events: none;
`

export default () => (
  <Border>
    <Circle />
  </Border>
)
