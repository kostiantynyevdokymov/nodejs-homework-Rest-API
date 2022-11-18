const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const listContactsController = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json({ message: "success", code: 200, contacts });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "success", contact });
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const contactDeleted = await removeContact(contactId);
  if (!contactDeleted) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const contact = await addContact(name, email, phone, favorite);
  res.status(201).json({ message: "contact added", contact });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
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
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const updatedContact = await updateStatusContact(contactId, favorite);
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
