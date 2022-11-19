const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const listContactsController = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const contacts = await listContacts(_id, page, limit, favorite);
  res.status(200).json({ message: "success", code: 200, contacts });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await getContactById(contactId, _id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "success", contact });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contactDeleted = await removeContact(contactId, _id);
  if (!contactDeleted) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
};

const addContactController = async (req, res) => {
  const { _id } = req.user;
  const { name, email, phone, favorite } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const contact = await addContact({ name, email, phone, favorite }, _id);
  res.status(201).json({ message: "contact added", contact });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const updatedContact = await updateContact(contactId, _id, req.body);
  if (Object.keys(req.body).length === 0) {
    req.status(400).json({ message: "missing fields" });
    return;
  }

  if (!updateContact) {
    res.status(400).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact updated", contact: updatedContact });
};

const updateStatusContactController = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  const { _id } = req.user;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const updatedContact = await updateStatusContact(contactId, _id, favorite);
  if (!updateContact) {
    res.status(400).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "success", contact: updatedContact });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};