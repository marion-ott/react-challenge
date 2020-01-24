import React, {useState, useEffect} from 'react'
import API from './../utils/API'
import idValidation from './../utils/idValidation'
import Card from './../components/Card'
import Skill from './../components/Skill'
import Loader from './../ui/Loader'
import Title from './../ui/Title'

export default ({id = null, backToList = null, isAdmin}) => {
  const [edit, setEdit] = useState(false)
  const [editing, setEditing] = useState(false)
  const [student, setStudent] = useState(null)
  
  useEffect(_ => {
    (async function getCurrentUser() {
      await API.getUser(id).then(async response => {
        const user = response.data.user
        /** check if user is logged to allow data edit mode */
        //TODO: add condition if logged user is an admin
        const canEdit = await idValidation.verify(user._id, localStorage.getItem('hetic_user'))
        setEdit(canEdit)
        setStudent(user)
      })
    })()
  }, [id])  

  if(!student) {
    return(<Loader />)
  }

  return (
    <section className='Profile'>
      {!edit && (
        <div className='Profile-back' onClick={backToList}>
          <p>Retour à la liste</p>
        </div>
      )}
      <div className='Profile-container'>
        <Card user={student} editing={editing} />
        <div className='Profile-skills'>
          {edit && (
            <div className='EditContainer'>
              {!editing ? (
                <span className='Edit' onClick={() => setEditing(true)}>Éditer mon profil</span>
              ) : (
                <>
                  <span className='Cancel' onClick={() => setEditing(false)}>Annuler</span>
                  <span className='Submit' onClick={() => setEditing(false)}>Valider</span>
                </>
              )}
            </div>
          )}
          <Title title='Compétences'/>
          <div className='Profile-list'>
            {student.skills.map((skill, i) => (
              <Skill
                isAdmin={isAdmin}
                key={i}
                skill={skill}
                editing={editing}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
