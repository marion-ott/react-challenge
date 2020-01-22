import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  max-width: ${props => (props.maxWidth ? '330px' : 'none')};
  width: 100%;
  margin-bottom: 24px;
  padding: 13px 16px;
  background-color: #ececec;
  border-radius: 8px;
`

export default ({ data: { value, type, placeholder, name }, onChange }) => (
  <Input
    className='formData'
    name={name}
    type={type}
    defaultValue={value}
    placeholder={placeholder}
    onChange={onChange && onChange}
  />
)
