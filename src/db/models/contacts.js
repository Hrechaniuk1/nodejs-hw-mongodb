import { Schema, model } from "mongoose";


const contactSchema = new Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
      },
      phoneNumber:  {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
      },
      email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        required: false,
      },
      isFavourite: {
        type: Boolean,
        default: false,
      },
      contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        minlength: 3,
        maxlength: 20,
        required: true,
        default: 'personal',
      },
      userId: {
        type: Schema.Types.ObjectId, ref: 'users',
        required: true,
      }


}, {
    timestamps: true,
    versionKey: false,
}
);

export const contactsCollection = model('contacts', contactSchema);
