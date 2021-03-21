import React, { useContext } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Form, Formik } from 'formik';
import axios from '../../tools/api';
import { getInputType } from '../../common/get-input-type';
import { loginValidationSchema } from '../../config/login';
import { AuthContext } from '../../common/auth-provider';

const formList = [
  { key: 'email', label: 'Email' },
  { key: 'password', label: 'Password', type: 'password' },
];

export default function LoginForm() {
  const [errorMesssage, setErrorMassage] = React.useState('');
  const { setUser } = useContext(AuthContext);
  const handleSubmit = async (data, setSubmitting) => {
    setSubmitting(false);
    await axios.post('/user/login', data)
      .then((result) => {
        const { user, token } = result.data;
        localStorage.setItem('token', token);
        setUser(user);
        window.location = '/';
      })
      .catch((err) => setErrorMassage(err.response?.data?.message));
  };

  return (
    <Formik
      validateOnChange="true"
      validationSchema={loginValidationSchema}
      initialValues={{ email: '', password: '' }}
      setFieldValue
      onSubmit={(data, { setSubmitting }) => handleSubmit(data, setSubmitting)}
    >
      {({ isSubmitting }) => (
        <Form>
          {errorMesssage && (
            <Box px={5}>
              <Alert severity="error">{errorMesssage}</Alert>
            </Box>
          )}
          {formList.map((item) => (
            <Box key={item.key} py={3} px={5}>
              {getInputType(item)}
            </Box>
          ))}
          <Grid container justify="center">
            <Box p={5}>
              <Button
                disabled={isSubmitting}
                type="submit"
                color="primary"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
