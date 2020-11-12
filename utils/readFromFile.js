const fs = require("fs");

const readFile = (contactsPath) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(contactsPath, (err, data) => {
      if (err) {
        return reject({ err });
      }
      const contactsList = JSON.parse(data.toString());
      return resolve(contactsList);
    });
  });
  return promise;
};

module.exports = readFile;
