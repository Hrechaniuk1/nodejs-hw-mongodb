import { Router } from "express";

import { getAllContactsController, getContactByIdController, addContactController, deleteContactController } from "../controllers/contacts";
import ctrlWrapper from "../utils/ctrlWrapper";

const router = Router();

router.get('/contacts',  ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(addContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
