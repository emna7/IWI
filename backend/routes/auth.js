const jwt = require('jsonwebtoken');
module.exports =  function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.send('Sorry! You are not logged in!');
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log("verrriiffiiieddd", verified);
    req.userId = verified;
    next();
  } catch (error) {
    res.json({ message: error });
  }
}
