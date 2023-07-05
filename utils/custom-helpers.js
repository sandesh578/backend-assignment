// error handling for the routes
const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

function isJSON(str) {
  try {
    JSON.parse(JSON.stringify(str));
    return true;
  } catch (err) {
    return false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  isJSON,
  catchErrors,
  sleep
};
