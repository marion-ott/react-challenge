import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import variables from './../global/variables.scss'
import API from './../utils/API'
import Loader from './../ui/Loader'
import Profile from './../views/Profile'
import ListItem from './../components/ListItem'
import Input from './../ui/Input'
import Title from './../ui/Title'
import formData from '../utils/formData'


const List = styled.div`
  margin: 0 auto;
  width: 100%;

  .search {
    margin-bottom: 20px;
  }

  .table {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 24px;
    font-weight: bold;
    font-size: 20px;
    color: ${variables.white};
    opacity: 0.7;
  }

  .cellName {
    -webkit-box-flex: 2;
    -ms-flex: 2;
    flex: 2;
  }

  .cellGroup {
    margin-left: 25px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .cellJob {
    margin-right: 25px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
`


const fields = formData.search

export default withRouter((props) => {
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
    const url = selectedStudent.email.replace('@hetic.net', '').replace('.', '-')
    props.history.push(`/list/${url}`)
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

  const backToList = () => {
    props.history.push('/list')
    setDisplayList(true)
  }

  if(list === null) {
    return (
      <Loader />
    )
  }

  // TODO: either change route on click or allow list display on list nav btn clicked
  if(!displayList && student) {
    return (
      <Profile id={student._id} backToList={backToList} />
    )
  }

  return (
    <List>
      <Title title='Liste 2020' />
      <div className='search'>
        <Input data={fields.input} onChange={onChange} />
      </div>
      <div>
        <div className='table'>
          <div className='cellName'>Nom</div>
          <div className='cellGroup'>Groupe</div>
          <div className='cellJob'>Poste</div>
        </div>
        {list.map((student, i) => (
          <ListItem key={i} student={student} onClick={onClick} />
        ))}
      </div>
    </List>
  )
})
