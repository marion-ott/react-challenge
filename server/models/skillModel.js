const mongoose = require('mongoose')

const skillSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A skill must have a name']
    }
})

module.exports = mongoose.model("Skill", skillSchema);
