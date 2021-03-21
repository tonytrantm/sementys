import * as yup from 'yup';

const phoneRegExp = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;

export const profileValidationSchema = yup.object({
  profile_picture: yup.string().nullable(),
  first_name: yup.string().nullable(),
  last_name: yup.string().nullable(),
  country: yup.string().nullable(),
  city: yup.string().nullable(),
  email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegExp, 'phone number is not valid').nullable(),
  email_alert: yup.boolean().nullable(),
  sms_alert: yup.boolean().nullable(),
});
