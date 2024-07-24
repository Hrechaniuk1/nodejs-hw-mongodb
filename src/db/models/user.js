import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,

    }
},
{
    timestamps: true,
    versionKey: false,
});

export const usersCollection = model('users', userSchema);
