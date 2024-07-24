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
        minLength: 7,
        maxLength: 15,
    }
},
{
    timestamps: true,
    versionKey: false,
});

userSchema.method.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const usersCollection = model('users', userSchema);
