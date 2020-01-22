const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema()

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'A student must have a first name']
    },
    lastName: {
        type: String,
        required: [true, 'A student must have a last name']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, 'A student must have an email address']
    },
    description: String,
    occupation: String,
    company: String,
    promotion: {
        type: String,
        required: [true, 'A student must have a promotion']
    },
    role: {
        type: String,
        required: true,
        enum: [
            'user',
            'admin',
            'superadmin'
        ],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    skills: [{
        _id: false,
        skill_id: String,
        level: {
            type: String,
            enum: ['A', 'B', 'C', 'D', 'E', 'F'],
            default: 'C'
        }
    }],
    firstConnection: {
        type: Boolean,
        default: true
    }
},  {
    timestamps: {
        createdAt: "created_at"
    }
});

// Password hash function before creating new user entry
userSchema.pre('save', async function (next) {
    // Only run this function if password was either created or modified
    if (!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods = {
    authenticate: async function (submittedPassword, userPassword) {
        return await bcrypt.compare(submittedPassword, userPassword);
    }
};

module.exports = mongoose.model("User", userSchema);
