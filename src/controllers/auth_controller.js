import { catchAsync } from "../utils/catchAsync.js";
import { sign_up_service,
         login_service,
         verify_email_service
 } from "../services/auth_services.js";

//sign up controller
export const sign_up_controller = catchAsync(async(req, res)=> {
    const {first_name, last_name, email, password, confirm_password, role} = req.body;
    const user = await sign_up_service({first_name, last_name, email, password, confirm_password, role});
    res.status(201).json({message: "Signup successful. Please check your email to verify your account.",
        data:
            {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
    });
});

//login controller
export const login_controller = catchAsync(async(req, res)=> {
    const {email, password} = req.body;
    const token = await login_service({email, password});
    res.status(200).json({message: "login successfully", data: token})
});

//verify email controller
export const verify_account_controller = catchAsync(async (req, res) => {
  let token = req.query.token || req.body.token;

  if (token && typeof token === 'object' && token.token) {
    token = token.token;
  }
  console.log("Received token:", token); // Debugging log

  if (!token || typeof token !== 'string') {
    return res.status(400).json({
      status: 'fail',
      message: 'Verification token is required and must be a string',
    });
  }

  await verify_email_service(token);

  res.status(200).json({
    status: 'success',
    message: 'User activated successfully',
  });
});