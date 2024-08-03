import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultName) {
    const value = process.env[name];
    // console.log(name, value);
    if(value) return value;
    if(defaultName) return defaultName;
    throw new Error('Oops');
}
