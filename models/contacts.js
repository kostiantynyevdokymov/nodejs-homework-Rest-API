// declaration of variables

const { Contact } = require("../db/connectionSchema");

// function get contact list
const listContacts = async (owner, page, limit, favorite) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  if (favorite) {
    const data = await Contact.find({
      $and: [{ owner }, { favorite }],
    })
      .skip(skip)
      .limit(limit);
    return data;
  } else {
    const data = await Contact.find({ owner }).skip(skip).limit(limit);
    return data;
  }
};

// function get contact by ID
const getContactById = async (contactId, owner) => {
  const data = await Contact.find({ $and: [{ owner }, { _id: contactId }] });
  return data;
};

// function remove contact
const removeContact = async (contactId, owner) => {
  const data = await Contact.findOneAndRemove({
    $and: [{ owner }, { _id: contactId }],
  });
  return data;
};

// function add contact;
const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contact({ name, email, phone, favorite, owner });
  const newContact = await contact.save();
  return newContact;
};

// function update contact
const updateContact = async (contactId, owner, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { $and: [{ owner }, { _id: contactId }] },
    { $set: body },
    { runValidators: true, new: true }
  );

  return updatedContact;
};

// function update status contact
const updateStatusContact = async (contactId, owner, favorite) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { $and: [{ owner }, { _id: contactId }] },
    { favorite },
    { runValidators: true, new: true }
  );

  return updatedContact;
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
