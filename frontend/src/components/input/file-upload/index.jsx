import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../../../common/auth-provider';

const useStyle = makeStyles({
  imageWrap: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: grey[200],
  },
  image: {
    position: 'absolute',
    width: '100%',
    minHeight: '100%',
  },
  inputFile: {
    display: 'none',
  },
});

export default function FileUpload({ item, defaultValue }) {
  const { user, setUser } = useContext(AuthContext);
  const [uploadedFile, setUploadedFile] = useState('');
  const { image, imageWrap, inputFile } = useStyle();

  useEffect(() => {
    setUploadedFile(defaultValue);
  }, []);

  const handleUpload = async (file) => {
    const uploadFile = new FormData();
    uploadFile.append('profile_picture', file);
    await axios.put(`/user/${user.id}`, uploadFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((result) => {
        const profilePicture = result.data?.profile_picture;
        console.log(item.key, profilePicture);
        setUploadedFile(profilePicture);
        setUser(() => ({
          ...user,
          profile_picture: profilePicture,
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container justify="center">
      <Grid container justify="center">
        <Box className={imageWrap}>
          {uploadedFile && (
            <img
              src={`${process.env.REACT_APP_API_URL}/${uploadedFile}`}
              alt="profile"
              className={image}
            />
          )}
        </Box>
      </Grid>
      <Grid container justify="center">
        <Box pt={2}>
          <label htmlFor={item.key}>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              component="span"
            >
              Choose File
              <input
                accept="image/*"
                className={inputFile}
                id={item.key}
                type="file"
                onChange={(event) => {
                  handleUpload(event.target.files[0]);
                }}
              />
            </Button>
          </label>
        </Box>
      </Grid>
    </Grid>
  );
}

FileUpload.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  defaultValue: PropTypes.string,
};
FileUpload.defaultProps = {
  item: {
    label: '',
    options: [],
  },
  defaultValue: '',
};
