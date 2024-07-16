import createHttpError from 'http-errors';

import { getAllContacts, getContactById, addContact, deleteContact } from './services/contacts.js';

export async function getAllContactsController(req, res) {
        const contacts = await getAllContacts();
        res.status(200).json({
          status: 200,
          message: "Successfully found contacts!",
          data: contacts,
        });
}

export async function getContactByIdController(req, res) {
    const {contactId} = req.params;
    const contact = await getContactById(contactId);
    if(!contact) {
      throw createHttpError(404, 'Contact not found');
    } else {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    }
  }

export async function addContactController(req, res) {
    const contact = await addContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export async function deleteContactController(req, res) {
    const {contactId} = req.params;
    const deletedContact = await deleteContact(contactId);
    if(!deletedContact) {
        throw createHttpError(404, "Contact not found");
    }
    res.sendStatus(204);
}
