const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    console.log(authorizationHeader);
//   const authHeader = req.headers.token;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
    console.log(req.user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization
  };
  