const jwt = require('jsonwebtoken');

// use jwt-redis instead of jwt
const redis = require('redis');
const JWTR =  require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);


module.exports =  async (req, res, next) => {
  const token = req.header('auth-token');
  // console.log(`token ${token}`);
  if (!token) return res.status(401).send('Please login!');
  try {
    const verified = await jwtr.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    // console.log("REQ.USER", req.user);
    // console.log('--------------------');
    next();
  } catch (error) {
    res.send({
      status:'error',
      message: "Permission Denied"
    });
  }
}
