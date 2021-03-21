const shajs = require("sha.js");
const db = require("../sql/db");
const yup = require("yup");

const SECRET = process.env.SECRET || "test-dev-secret";
/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs("sha256").update(`${email}${password}${SECRET}`).digest("hex");

const registerUser = async (email, password, confirm_password) => {
  if (!email || !password) throw new Error("Email and password are required");
  if (password !== confirm_password) throw new Error("Passwords do not match");

  const queryGetUser = {
    text: `SELECT email FROM users WHERE email = $1`,
    values: [email],
  };

  // check exist user
  let checkExistUserResult = null;
  
  try {
    checkExistUserResult = await db.query(queryGetUser);
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  };

  if (checkExistUserResult.rows[0]) {
    throw new Error("User already exist");
  };

  // create user
  const hash = hashPassword(email, password);
  const queryRegisterUser = {
    text: `INSERT INTO users(email, password) VALUES ($1, $2)`,
    values: [email, hash],
  };

  try {
    await db.query(queryRegisterUser);
  } catch (error) {
    throw new Error("Error");
  }
  
  const result = await db.query(queryGetUser);
  return result.rows[0];
};

const authenticateUser = async (email, password) => {
  const hash = hashPassword(email, password);
  const queryText = {
    text: `SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName
          FROM users s
          WHERE email = $1 AND password = $2`,
    values: [email, hash],
  };

  let result = null;

  try {
    const { rows } = await db.query(queryText);
    result = rows[0];
  } catch (error) {
    throw (new Error("Error"));
  }

  if (!result) throw new Error('Email or password is incorrect');

  return result;
};

const getUser = async (id) => {
  const queryText = {
    text: `SELECT id, profile_picture, email, first_name, last_name, country, city, phone, email_alert, sms_alert
          FROM public.users
          WHERE id = $1
          LIMIT 1`,
    values: [id],
  };

  let result = null;

  try {
    result = await db.query(queryText);
  } catch (error) {
    throw new Error("Error");
  };

  if (!result.rows[0]) {
    throw new Error("User does not exist");
  };

  return result.rows[0];
}

const updateUser = async (user_id, input) => {
  delete input.password;
  const phoneRegExp = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;

  const validateInput = yup.object({
    profile_picture: yup.string().nullable(),
    first_name: yup.string(),
    last_name: yup.string().nullable(),
    country: yup.string().nullable(),
    city: yup.string().nullable(),
    email: yup.string().email().required(),
    phone: yup.string().nullable(),
    email_alert: yup.boolean().nullable(),
    sms_alert: yup.boolean().nullable(),
  });

  const getUserQuery = {
    text: `SELECT id, profile_picture, email, first_name, last_name, country, city, phone, email_alert, sms_alert
          FROM public.users
          WHERE id = $1
          LIMIT 1`,
    values: [user_id],
  };

  // check user exist
  let currentUser = null;

  try {
    const getUserResult = await db.query(getUserQuery);
    currentUser = getUserResult.rows[0];
  } catch (error) {
    throw new Error("Error");
  };

  if (!currentUser) {
    throw new Error("User does not exist");
  };

  // validate input
  try {
    await validateInput.validate({
      ...currentUser,
      ...input,
    });
  } catch (error) {
    throw new Error("Invalid input");
  };

  // update user
  const { profile_picture, email, first_name, last_name, country, city, phone, email_alert, sms_alert } = {
    ...currentUser,
    ...input,
  };

  const updateUserQuery = {
    text: `UPDATE users
          SET profile_picture = $2, email = $3, first_name = $4, last_name = $5, country = $6, city = $7, phone = $8, email_alert = $9, sms_alert = $10, updated_at = NOW()
          WHERE id = $1`,
    values: [user_id, profile_picture, email, first_name, last_name, country, city, phone, email_alert, sms_alert],
  };

  let result = null;

  try {
    await db.query(updateUserQuery);
    const getUserResult = await db.query(getUserQuery);
    result = getUserResult.rows[0];
  } catch (error) {
    throw new Error("Error");
  }

  return result;
}

const listUser = async () => {
  const queryText = {
    text: `SELECT id, profile_picture, email, first_name, last_name, country, city, phone, email_alert, sms_alert
          FROM public.users
          ORDER BY id
          LIMIT 100`,
  }

  let result = null;

  try {
    result = await db.query(queryText);
  } catch (error) {
    throw new Error("Error");
  };

  if (!result) {
    throw new Error("User does not exist");
  }

  return result.rows;
}

module.exports = {
  registerUser,
  authenticateUser,
  getUser,
  updateUser,
  listUser,
};
