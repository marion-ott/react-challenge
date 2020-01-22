import React, {useState, useEffect} from 'react'
import API from './../utils/API'
import Card from './../components/Card'
import Skill from './../components/Skill'

export default ({id = null}) => {
  const [edit, setEdit] = useState(false)
  const [student, setStudent] = useState(null)
  
  useEffect(_ => {
    (async function getCurrentUser() {
      await API.getUser(id).then(response => {
        console.log(response)
        setStudent(response.data.user)
      })
    })()
  }, [id])

  if(!student) {
    return(<div>loading</div>)
  }

  return (
    <section className='Profile'>
      <Card user={student} editMode={edit} />
      <div className='Profile-skills'>
        <h2>Compétences</h2>
        {edit && (
          <div className='EditContainer'>
            {!this.state.editMode ? (
              <span className='Edit' onClick={this.editMode}>
                Éditer
              </span>
            ) : (
              <>
                <span className='Cancel' onClick={this.editMode}>
                  Annuler
                </span>
                <span className='Submit' onClick={this.onSubmit}>
                  Valider
                </span>
              </>
            )}
          </div>
        )}
        <div className='Profile-list'>
          {student.skills.map((skill, i) => (
            <Skill
              role={student.role}
              key={i}
              skill={skill}
              editMode={edit}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
