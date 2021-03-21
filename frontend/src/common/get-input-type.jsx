import React from 'react';
import InputField from '../components/input/field';
import CheckboxTemplate from '../components/input/checkbox';
import SelectField from '../components/input/select';
import FileUpload from '../components/input/file-upload';

export const getInputType = (item, defaultValue, setFieldValue) => {
  if (item.type === 'checkbox') return <CheckboxTemplate {...{ item, defaultValue }} />;
  if (item.type === 'select') return <SelectField {...{ item, defaultValue, setFieldValue }} />;
  if (item.type === 'file-upload') return <FileUpload {...{ item, defaultValue, setFieldValue }} />;
  return <InputField {...{ item }} />;
};
