import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';

import { usersCollection } from "../db/models/user";
import {FIFTEEN_MINUTES, THIRTY_DAYS}  from '../constants/authConstants.js';
import {sessionCollection} from '../db/models/session.js';

async function createSession() {
    const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await sessionCollection.create({
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const registerUser = async (data) => {
    const user = await usersCollection.findOne({email: data.email});
    if(user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(data.password, 10);
    return await usersCollection.create({...data, password: encryptedPassword});
};

export const loginUser = async (data) => {
    const user = await usersCollection.findOne({email: data.email});
    if(!user) throw createHttpError(404, 'User not found');
    const ifPasswordsEqual = await bcrypt.compare(data.password, user.password);
    if(!ifPasswordsEqual) throw createHttpError(401, 'Unauthorized');

    await sessionCollection.deleteOne({userId: user._id});
    const newSession = createSession();

    return {
        userId: user._id,
        ...newSession,
    };

};

export const refreshUser = async ({sessionId, refreshToken}) => {
    const session = sessionCollection.findOne({_id: sessionId, refreshToken});
    if(!session) throw createHttpError(401, 'Session not found');

    const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if(!isExpired) throw createHttpError(401, 'Session token expired');

    const newSession = createSession();

    await sessionCollection.deleteOne({_id: sessionId, refreshToken});

    return {
        userId: session.userId(),
        ...newSession,
    };

};

export const logoutUser = (sessionId) => sessionCollection.deleteOne({_id: sessionId});
