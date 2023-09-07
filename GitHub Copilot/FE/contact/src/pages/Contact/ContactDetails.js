// create a details page for contact, there should be the update and delete button with fields name, email, phone, and address. On click of the update button, the user should be redirected to the update page. On click of the delete button, the contact should be deleted from the database. using "react": "^18.2.0"
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// material
import { Card, Container, CardContent, CardHeader, TextField, Stack, Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import SnackBar from '../../components/SnackBar';
import Iconify from '../../components/iconify';
import ContactMgr from './ContactMgr';

// ----------------------------------------------------------------------
const { getContactById, updateContact, deleteContact } = ContactMgr;

const ContactDetails = () => {
  //   const { id } = useParams();
  const location = useLocation();

  const { id } = location.state || {};
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number: '',
    address: '',
  });

  const { name, email, contact_number, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateContact(id, JSON.stringify(formData));
    console.log(response);

    if (response.response?.status === 400) {
      Object.keys(response.response?.data).map((key) => {
        let err = key.charAt(0).toUpperCase();
        err += key.slice(1).replace('_', ' ');
        const error = `${err} : ${response.response?.data[key]}`;

        setMessage(error);
        setSeverity('error');
        return error;
      });
    } else {
      setFormData({
        name: response.data.name,
        email: response.data.email,
        contact_number: response.data.contact_number,
        address: response.data.address,
      });
      setMessage('Contact Updated Successfully');
      setSeverity('success');
    }
    setOpen(true);
    setLoading(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await deleteContact(id, JSON.stringify(formData));
    console.log(response);

    if (response.response?.status === 400) {
      Object.keys(response.response?.data).map((key) => {
        let err = key.charAt(0).toUpperCase();
        err += key.slice(1).replace('_', ' ');
        const error = `${err} : ${response.response?.data[key]}`;

        setMessage(error);
        setSeverity('error');
        return error;
      });
    } else {
      setMessage('Contact Deleted Successfully');
      setSeverity('success');
    }
    setOpen(true);
    setLoading(false);
  };

  useEffect(() => {
    const fetchContact = async () => {
      const response = await getContactById(id);
      console.log(response);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        contact_number: response.data.contact_number,
        address: response.data.address,
      });
    };
    fetchContact();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Contact Details</title>
      </Helmet>

      <Container maxWidth="lg">
        <Card>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <CardHeader title="Contact Details" />
            </Box>
            <Box padding={2}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                color="error"
                startIcon={<Iconify icon="flat-color-icons:save" />}
              >
                Back
              </LoadingButton>
            </Box>
          </Box>
          <CardContent>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={name}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={email}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contact_number"
                  onChange={handleChange}
                  required
                  value={contact_number}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={address}
                  variant="outlined"
                />
                {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
                  Update Contact
                </LoadingButton> */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box sx={{ marginRight: 1 }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={loading}
                      startIcon={<Iconify icon="flat-color-icons:save" />}
                    >
                      Update Contact
                    </LoadingButton>
                  </Box>
                  <Box>
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      color="error"
                      startIcon={<Iconify icon="flat-color-icons:save" />}
                      onClick={handleDelete}
                    >
                      Delete Contact
                    </LoadingButton>
                  </Box>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
      <SnackBar open={open} setOpen={setOpen} message={message} severity={severity} />
    </>
  );
};

export default ContactDetails;
