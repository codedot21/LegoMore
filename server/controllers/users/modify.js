const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  // console.log("Modify : ", req.body.value);

  if (req.body.value === "nickname") {
    await user.update(
      {
        nickname: req.body.nickname.nickname,
      },
      { where: { id: req.body.userInfo.id } }
    );
    const userInfo = {
      id: req.body.id,
      email: req.body.email,
      nickname: req.body.nickname,
    };
    res.status(200).send({ message: "User Update Ok", userInfo: userInfo });
  } else if (req.body.value === "password") {
    await user.update(
      {
        password: req.body.password.password,
      },
      { where: { id: req.body.userInfo.id } }
    );
    const userInfo = {
      id: req.body.id,
      email: req.body.email,
      nickname: req.body.nickname,
    };
    res.status(200).send({ message: "Update Ok", userInfo: userInfo });
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};
