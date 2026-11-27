import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const {refreshToken} = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      domain: "localhost"
    })
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "User Login Successfully!!",
      data: result,
    })
  } catch (error: any) {
    sendResponse(res,{
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    })
  }
};


const generateToken = async (req: Request, res: Response) => {
  try {
   
    const result = await authService.generateAccessToken(req.cookies.refreshToken);
    
    res.status(200).json({
      success: true,
      message: "Access Token Generated Successfully!!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
  generateToken
};
