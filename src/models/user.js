import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true 
    },
    last_name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    confirm_password: {
        type: String,
        required: true 
    },
    is_verified: {
    type: Boolean,
    default: false
  },

  verification_token: String,
  verification_token_expires: Date
},
    {
        versionKey: false,
        timestamps: true 
    }
);

const User = mongoose.model('User', userSchema);
export default User;