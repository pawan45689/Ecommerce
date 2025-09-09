import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type:{},
        required: true
    },
    answer:{
        type:String,
    },
    role: {
        type: Number,
        default: 0,
    },
}, { timestamps: true }
);




export default mongoose.model('users', userSchema);