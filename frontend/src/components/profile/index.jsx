import React, { useContext } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Form, Formik } from 'formik';
import axios from 'axios';
import { Countries } from '../../constants';
import { profileValidationSchema } from '../../config/profile';
import { getInputType } from '../../common/get-input-type';
import { AuthContext } from '../../common/auth-provider';
import { validInput } from '../../lib/valid-input';

const formList = [
  { key: 'profile_picture', label: 'Profile Picture', type: 'file-upload' },
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  {
    key: 'country',
    label: 'Country',
    type: 'select',
    options: Countries,
  },
  { key: 'city', label: 'City' },
  { key: 'email', label: 'Email', disabled: true },
  { key: 'phone', label: 'Phone Number', helperText: 'Ex: +84981232180' },
  { key: 'email_alert', label: 'Email Alert', type: 'checkbox' },
  { key: 'sms_alert', label: 'SMS Alert', type: 'checkbox' },
];

export default function Profile() {
  const [errorMesssage, setErrorMassage] = React.useState('');
  const { user, setUser } = useContext(AuthContext);

  const handleSave = (data, setSubmitting) => {
    setSubmitting(true);

    const newData = data;
    delete newData.profile_picture;
    axios.put(`/user/${user.id}`, newData)
      .then((result) => setUser(result.data))
      .catch((err) => setErrorMassage(err.response?.data?.message));

    setSubmitting(false);
  };

  return (
    <Box px={10}>
      <Box px={5}>
        {errorMesssage && (
          <Alert severity="error">{errorMesssage}</Alert>
        )}
      </Box>
      <Formik
        validateOnChange="true"
        validationSchema={profileValidationSchema}
        initialValues={validInput(user)}
        setFieldValue
        onSubmit={(data, { setSubmitting }) => handleSave(data, setSubmitting)}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Grid container justify="space-around">
              <Grid item xs={12}>
                <Grid container justify="center">
                  <Grid item xs={12} md={4}>
                    <Box py={3}>
                      {getInputType(formList[0], values.profile_picture)}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              {formList.slice(1).map((item) => (
                <Grid key={item.key} item xs={12} sm={6}>
                  <Box px={5} py={2}>
                    {getInputType(item, values[item.key], setFieldValue)}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid container justify="flex-end">
              <Box px={5} pb={5}>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
