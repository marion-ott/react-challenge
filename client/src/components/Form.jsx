import React from 'react'
import styled from 'styled-components'
import Input from './../ui/Input'
import Button from './../ui/Button'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 64px 83px 40px;
  border-radius: 13px;
  background-color: #ffffff;
`

export default ({ onSubmit, fields }) => (
  <Form onSubmit={onSubmit}>
    <div style={{ marginBottom: 'calc(40px - 24px)' }}>
      {fields.inputs.map((input, i) => (
        <Input key={i} data={input} />
      ))}
    </div>
    <Button primary>{fields.button.label}</Button>
  </Form>
)
