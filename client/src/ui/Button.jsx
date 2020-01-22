import styled from 'styled-components'

const Button = styled.button`
  padding: 16px 15px;
  font-weight: bold;
  color: #ffffff;
  border-radius: 7px;
  background-color: ${props => (props.primary ? '#8CB369' : '#F7774A')};
`

export default Button
