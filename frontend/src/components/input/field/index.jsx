import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Field, useField } from 'formik';

export default function InputField({ item }) {
  const [field, meta] = useField(item.key);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <Field
      {...field}
      as={TextField}
      type={item.type ? item.type : 'input'}
      disabled={item.disabled}
      label={item.label}
      name={item.key}
      fullWidth
      helperText={errorText || item.helperText}
      error={!!errorText}
    />
  );
}

InputField.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};
InputField.defaultProps = {
  item: { label: '' },
};
