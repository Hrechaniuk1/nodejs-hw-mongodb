import bcrypt from 'bcrypt';

import { usersCollection } from "../db/models/user";
import createHttpError from 'http-errors';


export const registerUser = async (data) => {
    const user = await usersCollection.findOne(data.email);
    if(user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(data.password, 10);
    return await usersCollection.create({...data, password: encryptedPassword});
};
