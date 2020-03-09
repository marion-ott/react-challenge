module.exports = (user, skills) => {
  user.skills.map(userSkill => {
    let relevantSkill = skills.find(skill => skill._id == userSkill.skill_id)
    userSkill.name = relevantSkill.name
  })
  return user
}
