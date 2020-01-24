import React from 'react'
import styled from 'styled-components'


const ListItem = styled.li`
  display: flex;
  height: 45px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 16px;
  transition: ease 0.2s all;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  }

  .cellName {
    margin-left: 25px;
    color: #4f4f4f;
    font-weight: bold;
    align-self: center;
    flex: 2;
  }

  .cellGroup {
    font-weight: 300;
    color: #4f4f4f;
    align-self: center;
    flex: 1;
  }

  .cellJob {
    margin-right: 25px;
    font-weight: 300;
    color: #4f4f4f;
    align-self: center;
    flex: 1;
  }
`

export default ({student, onClick}) => {
  return (
    <ListItem onClick={() => onClick(student._id)}>
      <div className='cellName'>{`${student.firstName} ${student.lastName}`}</div>
      <div className='cellGroup'>Groupe 2</div>
      <div className='cellJob'>
        {student.occupation ? student.occupation : 'Non renseigné'}
      </div>
    </ListItem>
  )
}
