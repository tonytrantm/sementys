const jwt = require('jsonwebtoken');
const db = require("../sql/db");

const SECRET = process.env.SECRET || "test-dev-secret";

const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');
  if (await isValidToken(token)) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  };
};

async function isValidToken(token) {
  if (!token) return false;
  const user = jwt.verify(token, SECRET);
  const queryGetUser = {
    text: `SELECT id, email FROM users WHERE id = $1`,
    values: [user.id],
  };
  let result = null;
  
  try {
    result = await db.query(queryGetUser);
  } catch (error) {
    return false;
  };

  if (!result.rows[0]) return false;
  return true;
};

module.exports = authMiddleware;