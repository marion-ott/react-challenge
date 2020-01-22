const Skill = require('./../models/skillModel')
const User = require('./../models/userModel')
const catchAsync = require('./../services/catchAsync')

exports.getSkills = catchAsync(async (req, res) => {
    const skills = await Skill.find()
    res.status(200).json({
        status: 'success',
        data: {
            skills
        }
    })
})

exports.getSkill = catchAsync(async (req, res) => {
    const skill = await Skill.findById(req.params.id)
    res.status(200).json({
        status: 'success',
        data: {
            skill
        }
    })
})

exports.addSkill = catchAsync(async (req, res, next) => {
    const newSkill = await Skill.create(req.body)
    const newUserSkill = {
        skill_id: newSkill._id
    }
    await User.updateMany({
        'role': {
            $eq: 'user'
        }
    }, {
        $push: {
            skills: newUserSkill
        }
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        status: 'success',
        data: {
            skill: newSkill
        }
    })
})

exports.updateSkill = catchAsync(async (req, res) => {
    await Skill.findByIdAndUpdatete(req.params.id, {
        name: req.body.name
    })
    res.status(200).json({
        status: 'success'
    })
})

exports.deleteSkill = catchAsync(async (req, res) => {
    await Skill.findByIdAndDelete(req.params.id)
    await User.updateMany({
        'role': {
            $eq: 'user'
        }
    }, {
        $pull: {
            skills: { skill_id: { $eq: req.params.id } }
        }
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        status: 'success'
    })
})
