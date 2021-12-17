///onhold

const verify = (req, res, next) => {
  let userId = req.headers;

  if (!userId) {
    return res.status(401).json({ error: "UserId required" });
  }
  next();
};
const auth = { verify: verify };

module.exports = auth;
