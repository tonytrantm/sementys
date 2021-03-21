import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field, useField } from 'formik';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

export default function SelectField({ item, defaultValue, setFieldValue }) {
  const [value, setValue] = useState(null);
  const [field, meta] = useField(item.key);
  const errorText = meta.error && meta.touched ? meta.error : '';

  useEffect(() => {
    if (defaultValue) setValue(item.options.filter((option) => option.code === defaultValue)[0]);
    else setValue(null);
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
    setFieldValue(item.key, newValue ? newValue.code : '');
  };

  return (
    <Field
      as={AutoComplete}
      options={item.options}
      value={value}
      getOptionLabel={(option) => option.label}
      onChange={(event, newValue) => handleChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          onChange={() => {}}
          label={item.label}
          helperText={errorText}
          error={!!errorText}
        />
      )}
    />
  );
}

SelectField.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  defaultValue: PropTypes.string,
  setFieldValue: PropTypes.func,
};
SelectField.defaultProps = {
  item: {
    label: '',
    options: [],
  },
  defaultValue: '',
  setFieldValue: () => {},
};
