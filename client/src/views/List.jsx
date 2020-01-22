import React, {useState, useEffect} from 'react'
import API from './../utils/API'
import Profile from './../views/Profile'
import ListItem from './../components/ListItem'
import Input from './../ui/Input'
import formData from '../utils/formData'

const fields = formData.search

export default () => {
  const [students, setStudents] = useState(null)
  const [list, setList] = useState(null)
  const [student, setStudent] = useState(null)
  const [displayList, setDisplayList] = useState(true)

  useEffect(
    _ => {
      (async function getData() {
        await API.getAllUsers()
          .then(response => {
            setStudents(response.data.data.users)
            setList(response.data.data.users)
          })
      })()
    },
    []
  )

  const onClick = id => {
    const selectedStudent = list.find(student => student._id === id)
    setStudent(selectedStudent)
    setDisplayList(false)
  }

  const onChange = (e) => {
    const searchValue = e.target.value.toLowerCase()
    if(searchValue === '') {
      setList(students)
      return false
    }

    const filteredList = students.filter(
      student =>
        student.firstName.toLowerCase().startsWith(searchValue) ||
        student.lastName.toLowerCase().startsWith(searchValue) ||
        student.occupation.toLowerCase().includes(searchValue)
    )
    
    setList(filteredList)
  }

  if(list === null) {
    return (
      <div>loading</div>
    )
  }

  // TODO: either change route on click or allow list display on list nav btn clicked
  if(!displayList && student) {
    return (
      <Profile id={student._id} />
    )
  }

  return (
    <div className='StudentList'>
      <h2>Liste 2020</h2>
      <div className='StudentList-search'>
        <Input data={fields.input} onChange={onChange} />
      </div>
      <div>
        <div className='StudentList-table'>
          <div className='StudentList-cellName'>Nom</div>
          <div className='StudentList-cellGroup'>Groupe</div>
          <div className='StudentList-cellJob'>Poste</div>
        </div>
        {list.map((student, i) => (
          <ListItem key={i} student={student} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}
