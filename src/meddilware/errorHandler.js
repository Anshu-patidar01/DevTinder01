const errorHandler = (x) => {
  try {
    x();
  } catch (error) {
    console.log(error);
  }
};

module.exports = errorHandler;
