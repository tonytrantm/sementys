import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Field } from 'formik';

export default function CheckboxTemplate({ item, defaultValue }) {
  return (
    <Field
      as={FormControlLabel}
      name={item.key}
      control={<Checkbox color="primary" checked={defaultValue} />}
      label={item.label}
    />
  );
}

CheckboxTemplate.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  defaultValue: PropTypes.bool,
};
CheckboxTemplate.defaultProps = {
  item: { label: '' },
  defaultValue: false,
};
