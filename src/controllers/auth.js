import { THIRTY_DAYS } from "../constants/authConstants";
import { loginUser, registerUser } from "../services/auth";


export const registerController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: user,
    });
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    res.cookie('sessionId', session.userId, {
        httpOnly: true,
        expires: THIRTY_DAYS,
    });
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: THIRTY_DAYS,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully logged in an user!",
        data: session.accessToken,
    });
};
