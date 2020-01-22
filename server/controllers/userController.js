const User = require('./../models/userModel')
const Skill = require('./../models/skillModel')
const catchAsync = require('./../services/catchAsync')
const AppError = require("../services/appError")

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User
        .find({
            _id: {
                $ne: req.user._id
            }
        })
        .sort({ 'lastName': 1 })
        .select('-password -role -firstConnection')

    const currentUser = await User.find(req.user._id)
    const skills = await Skill.find()
    
    res.status(200).json({
        status: 'success',
        data: {
            users,
            currentUser,
            skills
        }
    })
})

exports.getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })

    return res.status(200).json({
        status: 'success',
        data: {}
    })
})

exports.updateUser = catchAsync(async (req, res, next) => {
    if(req.user.role === 'user') {
        if (req.params.id.toString() !== req.user._id.toString()) {
            return next(new AppError('Vous n\'avez pas les droits pour effectuer cette action.'), 401);
        }
        if (req.body.role) {
            req.body.role = 'user'
        }
    }

    if(req.body.password) {
        let user = await User.findOne({ _id: req.params.id })
        user.password = req.body.password
        user.save()
    } else {
        await User.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true
            }
        )
    }

    res.status(200).json({
        status: 'Success'
    });
})

exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    res.status(200).json({
        status: 'Success',
        data: {
            user: newUser
        }
    });
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new AppError('Aucun utilisateur trouvé avec cet identifiant.'), 404);
    }

    res.status(204).json({
        status: 'Success',
        data: null
    });
})
