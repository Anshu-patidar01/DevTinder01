const sendrequest = (req, res) => {
  try {
    const user = req.user;
    const { firstName } = user;

    res.send("request sent by " + firstName);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  sendrequest,
};
