import React from 'react'

const options = ['A', 'B', 'C', 'D', 'E', 'F']

export default ({skill, edit}) => (
  <div className='CardSkill'>
    <p>{skill.name}</p>
    {edit ? (
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
  </div>
)
