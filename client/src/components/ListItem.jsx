import React from 'react'
import './Components.scss'

export default ({student, onClick}) => {
  return (
    <li className='StudentItem' onClick={() => onClick(student._id)}>
      <div className='StudentItem-cellName'>{`${student.firstName} ${student.lastName}`}</div>
      <div className='StudentItem-cellGroup'>Groupe 2</div>
      <div className='StudentItem-cellJob'>
        {student.occupation ? student.occupation : 'Non renseigné'}
      </div>
    </li>
  )
}
