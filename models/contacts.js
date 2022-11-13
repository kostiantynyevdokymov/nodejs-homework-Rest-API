// declaration of variables

const { Contact } = require("../db/connectionSchema");

// function get contact list
const listContacts = async () => {
  const data = await Contact.find({});
  return data;
};

// function get contact by ID
const getContactById = async (contactId) => {
  const data = await Contact.findById(contactId);
  return data;
};

// function remove contact
const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndRemove(contactId);
  return data;
};

// function add contact;
const addContact = async (name, email, phone, favorite) => {
  const contact = new Contact({ name, email, phone, favorite });
  const newContact = await contact.save();
  return newContact;
};

// function update contact
const updateContact = async (contactId, { body }) => {
  await Contact.findByIdAndUpdate(
    contactId,
    { $set: body },
    { runValidators: true }
  );
  const updateContact = Contact.findById(contactId);
  return updateContact;
};

// function update status contact
const updateStatusContact = async (contactId, favorite) => {
  await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { runValidators: true }
  );
  const updateContact = Contact.findById(contactId);
  return updateContact;
};

// exports functions
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
