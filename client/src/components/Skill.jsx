import React from 'react'
import styled from 'styled-components'
import variables from './../global/variables.scss'

const CardSkill = styled.div`
  padding: 0 20px;
  margin-bottom: 16px;
  width: calc(50% - 20px);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: ${variables.white};
  border-radius: 13px;
  border: ${({ isAdmin }) =>
    isAdmin ? '2px solid #096fac' : '2px solid #da643a'};
  background-color: ${({ isAdmin }) => (isAdmin ? '#27a3ed' : '#ff885f')};

  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  .Note {
    margin-left: 20px;
    font-size: 40px;
  }

  select {
    color: ${variables.darkgrey};
    width: 40px;
    height: 35px;
  }
`

const options = ['A', 'B', 'C', 'D', 'E', 'F']

export default ({ skill, editing, isAdmin }) => (
  <CardSkill isAdmin={isAdmin}>
    <p>{skill.name}</p>
    {editing ? (
      <select
        name={skill.name}
        className='editSkill'
        data-skillid={skill.skill_id}
        defaultValue={options.find(option => option === skill.level)}>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <span className='Note'>{skill.level}</span>
    )}
  </CardSkill>
)
