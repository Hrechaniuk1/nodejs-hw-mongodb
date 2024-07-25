import createHttpError from 'http-errors';

import {sessionCollection} from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) throw createHttpError(401, 'Please provide Authorization header');

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if(bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    };

    const session = sessionCollection.findOne({accessToken: token});

    if(!session) {
        next(createHttpError(401, 'Session not found'));
        return;
    };

    const isExpired = new Date() > new Date(session.accessTokenValidUntil);

    if(isExpired) {
        next(createHttpError(401, 'Access token expired'));
        return;
    };

    const user = sessionCollection.findById(session.userId);

    if(!user) {
        next(createHttpError(401));
    };

    req.user = user;
    next();
};
