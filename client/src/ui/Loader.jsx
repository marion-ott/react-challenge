import React from 'react'
import styled from 'styled-components'

const Loader = styled.svg`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  circle {
    fill: none;
    stroke: white;
    stroke-width: 3px;
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    transform-origin: center center;
    animation: load 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }
  @keyframes load {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }
    100% {
      transform: rotate(360deg);
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }
`

export default () => {
  return(
    <Loader>
      <circle cx='50%' cy='50%' r='20'></circle>
    </Loader>
  )
}
