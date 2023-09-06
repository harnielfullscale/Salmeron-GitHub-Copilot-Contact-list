// Create a contact details page using MUI
// Create a contact details page using MUI. The page should display the contact details of the selected contact. The page should have a button to edit the contact details. On click of the edit button, the user should be redirected to the edit contact page. using "react": "^18.2.0"
// // Path: contact/src/pages/Contact/ContactDetails.js
/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// material
import { Card, Container, CardContent, CardHeader, TextField, Stack, Box, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import SnackBar from '../../components/SnackBar';
import Iconify from '../../components/iconify';
import ContactMgr from './ContactMgr';

// ----------------------------------------------------------------------
const { getContact, updateContact } = ContactMgr;

const ContactDetails = () => {
  const { id } = useParams();
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
      setMessage('Contact Updated Successfully');
      setSeverity('success');
    }
    setOpen(true);
    setLoading(false);
  };

  useEffect(() => {
    const fetchContact = async () => {
      const response = await getContact(id);
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
        <title>Contact Details | Minimal-UI</title>
      </Helmet>
      <Container maxWidth="lg">
        <Card>
          <CardHeader title="Contact Details" />
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
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
                  Update Contact
                </LoadingButton>
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
