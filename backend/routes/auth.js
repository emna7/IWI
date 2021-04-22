const jwt = require('jsonwebtoken');
module.exports =  function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.send('Please login!');
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.json({ message: "Permission Denied" });
  }
}
