import { contactsCollection } from "../db/models/contacts.js";

export const getAllContacts = () => contactsCollection.find();

export const getContactById = (id) => contactsCollection.findById(id);

export const addContact = (data) => contactsCollection.create(data);

export const deleteContact = (id) => contactsCollection.findByIdAndDelete(id);
