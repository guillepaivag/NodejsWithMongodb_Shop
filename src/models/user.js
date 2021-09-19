const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')

const User = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    displayName: {
        type: String,
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    signupDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
    }
})

User.pre('save', (next) => {
    let user = this
    if(!user.isModified('password')){
        return next()
    }

    bcryptjs.genSalt(10, (err, salt) => {
        if(err) {
            return next(err)
        }

        bcryptjs.hash(user.password, salt, null, (err, hash) => {
            if(err) {
                return next(err)
            }

            user.password = hash
            next()
        })
    })
})

User.methods.gravatar = () => {
    if(!this.email){
        return 'https://es.gravatar.com/avatar/?s=200Ed=retro'
    }

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://es.gravatar.com/avatar/${md5}?s=2008d=retro`
}

module.exports = mongoose.model('User', User)