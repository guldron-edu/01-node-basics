const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

const writeToFile = require("./utils/write.js");
const checkName = require("./utils/checkName.js");
const readFile = require("./utils/readFromFile.js");

const listContacts = async () => {
  try {
    const contacts = await readFile(contactsPath);
    console.table(contacts);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readFile(contactsPath);
    const requiredContact = contacts.filter(
      (contact) => contact.id === Number(contactId)
    );
    requiredContact[0]
      ? console.table(requiredContact)
      : console.log("\x1B[31m ID not found!\x1b[0m");
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readFile(contactsPath);
    const newContactList = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    contacts.length === newContactList.length
      ? console.log("\x1B[31m ID not found!\x1b[0m")
      : (writeToFile(contactsPath, newContactList),
        console.log(`\x1B[32m ID ${contactId} was deleted!\x1b[0m`));
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readFile(contactsPath);
    if (checkName(contacts, name).length > 0) {
      console.log(`\x1B[31m ${name} already exist!\x1b[0m`);
      return;
    }
    const nextId = contacts[contacts.length - 1].id + 1;

    let newUser = {
      id: nextId,
      name,
      email,
      phone,
    };

    contacts.push(newUser);
    writeToFile(contactsPath, contacts);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
