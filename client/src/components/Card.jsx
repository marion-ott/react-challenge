import React, {useState, useEffect} from 'react'
import API from './../utils/API'

export default ({user = null, editMode}) => {
  const [student, setStudent] = useState(user)

  useEffect(_ => {
    setStudent(user)
  }, [user])

  if(!student) {
    return(<div>loading</div>)
  }

  return (
    <div className='Card'>
      <div className='Card-banner'></div>
      <div className='Card-content'>
        <div className='Card-picture row'></div>
        <h4 className='row'>{`${student.firstName} ${student.lastName}`}</h4>
        <div className='Card-promotion row'>
          <span>Promotion</span>
          <p>WEB - {student.promotion}</p>
        </div>
        <div className='Card-job row'>
          <span>Poste</span>
          {editMode ? (
            <p className='edit'>
              <input
                type='text'
                id='editJob'
                placeholder='Poste'
                defaultValue={student.job}
              />
              <input
                type='text'
                id='editCompany'
                placeholder='Entreprise'
                defaultValue={student.company}
              />
            </p>
          ) : (
            <p>
              <strong>
                {student.occupation !== ''
                  ? student.occupation
                  : 'Non renseigné'}
              </strong>
              &nbsp;chez{' '}
              <strong>
                {student.company ? student.company : 'Non renseigné'}
              </strong>
            </p>
          )}
        </div>
        <div className='Mail row'>
          <span>Adresse mail</span>
          <a href='/'>{student.email}</a>
        </div>
      </div>
    </div>
  )
}
