import React from 'react'
import styled from 'styled-components'
import variables from './../global/variables.scss'

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 40px;
  font-weight: 600;
  color: ${variables.white};
`

export default ({title}) => (
  <Title>{title}</Title>
)
