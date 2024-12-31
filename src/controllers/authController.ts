import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import { UserDetails } from "../entity/User";
import bcrypt from "bcrypt";

//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        
        if (!userName || !password) {
            return res.status(400).json({ message: 'Both username and password are required' });
        }

        // Find the user by username
        const foundMatch = await UserDetails.findOne({ where: { userName } });
        
        // If user is not found, or password is invalid, return an error
        if (!foundMatch) {
            return res.status(401).json({ message: 'Username not found' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, foundMatch.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Username and password don't match" });
        }

        const { userId, designation,roleId } = foundMatch;

        // Create JWT tokens
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": userName,
                    "designation": designation,
                    "userId": userId,
                    "roleId": roleId,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60m' }
        );

        const refreshToken = jwt.sign(
            {
                "username": userName,
                "designation": designation,
                "userId": userId,
                "roleId": roleId
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // Set the refresh token in an HTTP-only cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send access token and user details in response
        res.json({ accessToken, designation, userId, roleId });

    } catch (error) {
        return InternalServerError(res, error);
    }
};


export const refresh = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        console.log("Incoming to block")
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

        const refreshToken = cookies.jwt;
        console.log("REFRESH", refreshToken);
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            async (error: Error | null, decoded: { username: string, designation: string, userId: string, roleId: number }) => {
                if (error) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                try {
                    console.log("Incoming to try block")
                    const foundUser = { username: decoded.username, designation: decoded.designation, userId: decoded.userId, roleId: decoded.roleId}; //await User.findOne({ username: decoded.username }).exec();

                    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

                    const accessToken = jwt.sign(
                        {
                            userInfo: {
                                username: foundUser.username,
                                role: foundUser.designation,
                                userId: foundUser.userId,
                                roleId: foundUser.roleId
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30m' }
                    );
                    console.log(decoded);
                    res.json({ accessToken: accessToken, username: foundUser.username, designation: foundUser.designation, userId: foundUser.userId, roleId:foundUser.roleId});
                } catch (error) {
                    return InternalServerError(res, error);
                }
            }
        );
    } catch (error) {
        return InternalServerError(res, error);
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        console.log("Cookies", req);
        if (!cookies?.jwt) return res.sendStatus(204)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
        res.json({ message: 'Cookie cleared' })
    } catch (error) {
        return InternalServerError(res, error);
    }
}