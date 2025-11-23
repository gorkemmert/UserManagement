import mongoose from "mongoose";

const user = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "name zorunludur"]
    },
    surname: String,
    password: {type: String, required: [true, "password zorunludur"]},
    role: {
        type: String,
        enum: ["admin", "user"], 
        default: "user",        
    },
    tckn: {
        type: String,
        required: [true, "TCKN zorunludur"],
        unique: true,
        minlength: 11,
        maxlength: 11 
    },
    meslek: {
        type: String,
        required: true
    }
    
});

const User = mongoose.model('User', user);
export default User;