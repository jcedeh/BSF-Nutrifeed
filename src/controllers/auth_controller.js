import { catchAsync } from "../utils/catchAsync.js";
import { sign_up_service,
         login_service
 } from "../services/auth_services.js";

//sign up controller
export const sign_up_controller = catchAsync(async(req, res)=> {
    const {first_name, last_name, email, password} = req.body;
    const user = await sign_up_service({first_name, last_name, email, password});
    res.status(201).json({message: "Signup successful. Please check your email to verify your account.",
        data:
            {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
    });
});

//login controller
export const login_controller = catchAsync(async(req, res)=> {
    const {email, password} = req.body;
    const token = await login_service({email, password});
    res.status(200).json({message: "login successfully", data: token})
});

//activate account controller
export const activate_account_controller = catchAsync(async(req, res)=> {
    const token = req.query;
    await activate_account_service(token);
    res.status(200).json({message: "user activated successfully"});
});