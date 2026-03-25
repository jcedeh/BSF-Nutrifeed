import { activate_account_service } from "../services/auth_services.js";
import { catchAsync } from "../utils/catchAsync.js";

export const activate_account_controller = catchAsync(async(req, res)=> {
    const token = req.query;
    await activate_account_service(token);
    res.status(200).json({message: "user activated successfully"});
});