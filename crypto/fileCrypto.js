const bcrypt = require('bcrypt');

async function encrypt(plainText) {
  const saltRounds = 10;
  const hashedText = await bcrypt.hash(plainText, saltRounds);
  return hashedText;
}

async function decrypt(encryptedText, plainText) {
  const isMatch = await bcrypt.compare(plainText, encryptedText);
  return isMatch;
}

module.exports = {
  encrypt,
  decrypt
};
