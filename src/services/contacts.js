import { SORT_ORDER } from "../constants/sortConstants.js";
import { contactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id'}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = await contactsCollection.find();
    const contactsAmmount = contactsCollection.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();

    const paginationData = calculatePaginationData(contactsAmmount, page, perPage);

    return {
        data: contacts,
        ...paginationData
    };
};

export const getContactById = (id) => contactsCollection.findById(id);

export const addContact = (data) => contactsCollection.create(data);

export const deleteContact = (id) => contactsCollection.findByIdAndDelete(id);

export const putchContact = async (id, data, options = {}) => {
    const result = await contactsCollection.findOneAndUpdate(
        {_id: id},
        data,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        }
    );
    if(!result || !result.value) return null;
    return {
        contact: result.value,
    };
};
