import {AppError} from '../utils/AppError.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import { sendEmail } from '../utils/sendgrid.js';

//sign up service
export const sign_up_service = async (data)=> {
   const {
        first_name,
        last_name,
        email,
        password,
        confirm_password
    } = data;
    if(!first_name||!last_name||!email||!password) {
        throw new AppError("all fields are required")
    }
    //check if email exist
    const existing_user = await User.findOne({email});
    if(existing_user) {
        throw new AppError("user already exists");
    }
    //hash password
    const hashed_password = await bcrypt.hash(password, 10);

    //generate activation token
    const activation_token = crypto.randomBytes(32).toString("hex");
   //create the user
    const new_user = await User.create({
        first_name,
        last_name,
        email,
        password : hashed_password,
        confirm_password : hashed_password,
        verification_token : activation_token,
        verification_token_expires : Date.now() + 2000 * 60 * 60// 1 hour
    });
    
    
//send verification email
   const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email?token=${encodeURIComponent(new_user.verification_token)}`;
    await sendEmail({
        to: email,
        subject: "VERIFY YOUR EMAIL",
        html: `
            <h3>Email Verification</h3>
            <p>Click the link below to verify your account:</p>
            <a href="${verificationLink}">Verify Email</a>
        `
    });
   
    

    return new_user 


}

//login service
export const login_service = async (data)=> {
    const {email, password} = data;
    //check if all fields are inputed
    if(!email || !password) {
        throw new AppError("all fields are required");
    }
    //check if email exists
    const existing_user = await User.findOne({email});
    if(!existing_user) {
        throw new AppError("invalid login details");
    }
    //compare password
    const is_match = await bcrypt.compare(password, existing_user.password);
    if(!is_match) {
        throw new AppError("invalid login details");
    }
    //check if user is verified
    if (!existing_user.is_verified) {
    return res.status(403).json({
    message: "Please verify your email before logging in"
  });
}
    const token = jwt.sign({
        user_id : existing_user._id,
        first_name : existing_user.first_name,
        last_name: existing_user.last_name,
        email : existing_user.email
    }, process.env.JWT_SECRET, {expiresIn: 1})

    return token;
}

//activate user account


export const verify_email_service = async (rawToken) => {
  if (!rawToken || typeof rawToken !== 'string') {
    throw new AppError('Verification token is required', 400);
  }

  const token = rawToken.trim();

  // look up by token + expiry
  const user = await User.findOne({
    verification_token: token,
    verification_token_expires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Invalid or expired verification token', 400);
  }

  user.is_verified = true;
  user.verification_token = undefined;
  user.verification_token_expires = undefined;
  await user.save();

  return { message: 'Email verified successfully' };
};


//forget password
export const forget_password_service = async (data)=> {
    const {email} = data;
    //validate fields
        if(!email) {
            throw new AppError("email is required", 400);
        }
    //check if user exists
        const user = await User.findOne({email});
        if(!user){
            throw new AppError("user does not exist", 400);
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otp_expiry = Date.now() + 5 * 60 * 1000;

        //update fields in the database
        user.otp = otp;
        user.otpExpiry = otp_expiry;

        await user.save();
          
        //send email
     await sendEmail({
        to: email,
        subject: "PASSWORD RESET",
        text: `Here is your OTP ${user.otp}`,
        html: `<h1>Here is your OTP ${user.otp}</h1><p>Use this for your password reset</p>`,
    });
        

        return otp;
        
    }

//reset password
export const reset_password_service = async (data)=> {
    const {otp, new_password} = data;
    //validate fields
        if(!otp || !new_password) {
            throw new AppError("all fields are required", 400);
        }
        //check if otp links to a user
        const user = await User.findOne({otp});
        if(!user) {
            throw new AppError("invalid otp", 400);
        }
        //checks if otp has expired
        if(user.otp_expiry < Date.now()) {
            throw new AppError("otp expired", 400);
        }
        //hash new password 
        const hashed_password = await bcrypt.hash(new_password, 10);

        //update database fields
        user.password = hashed_password;
        user.otp = null;
        user.otp_expiry = null;

        await user.save();
        return user;
    }

