const jwt = require("jsonwebtoken");

// check token
const checkToken = (req, res, next) => {
  try {
    const authToken = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(authToken, process.env.SEED);
    req.userId = decodedToken.id;
    req.appId = decodedToken.idapp;
    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      err: {
        message: "401 Unauthorized",
      },
    });
  }
};

// check admin role
const checkAdminRole = (req, res, next) => {
  let user = req.user;
  console.log(" middleware checkAdminRole", user);

  if (user.rol === "ADMIN_ROLE") {
    console.log(`this ${user.name} is Admin`);
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: "this user is not admin",
      },
    });
  }
};

module.exports = {
  checkToken,
  checkAdminRole,
};

//TODO : VER CHECKTOKEN
