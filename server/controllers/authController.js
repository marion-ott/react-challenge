const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const config = require("../config/config");
const catchAsync = require("../services/catchAsync")
const AppError = require("../services/appError")

// Create token to allow server/client connection
const signToken = id => {
    return jwt.sign({
        id
    }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_TIME
    });
};

exports.signup = catchAsync(async (req, res) => {
    // Specify each property to avoid user to add unwanted information
    // e.g: users granting themselves admin privileges
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    const token = signToken(newUser._id);

    res.status(200).json({
        status: "Succès",
        data: {
            user: newUser
        },
        token
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const {
        password,
        email,
        role
    } = req.body;

    if (!email || !password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        return next(new AppError('Veuillez entrer votre identifiant et votre mot de passe'), 400);
    }

    // On check si l'utilisateur existe en base
    const user = await User.findOne({
        email
    })

    if (!user || !(await user.authenticate(password, user.password))) {
        return next(new AppError('E-mail ou mot de passe incorrect'), 401);
    }

    if(user.role !== role) {
        return next(new AppError('Vous n\'avez pas sélectionné le bon profil.'))
    }
    
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        userId: user._id
    });
})

exports.checkLogIn = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization;
    }

    if (!token) {
        return next(new AppError('Vous n\'êtes pas connecté.'), 401);
    }

    // Token verification
    const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

    const currentUser = await User.findById(decoded.id).lean();
    if (!currentUser) {
        return next(new AppError('Cet utilisateur n\'existe pas ou n\'est pas connecté.'), 401);
    }
    
    req.user = currentUser;
    
    next()
})

exports.protect = catchAsync(async (req, res, next) => {
    if ((req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
        return next(new AppError('Vous n\'avez pas les droits pour effectuer cette action.'), 401);
    }

    next()
})
