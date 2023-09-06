// Create a create contact page with name, email, phone, and address fields. Add a button to submit the form. On submit, the form data should be sent to the backend API. If the API call is successful, redirect the user to the contact list page. If the API call fails, show an error message to the user. using "react": "^18.2.0"
/* eslint-disable camelcase */
//
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// material
import {
  Card,
  Container,
  CardContent,
  CardHeader,
  TextField,
  Stack,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import SnackBar from "../../components/SnackBar";
import Iconify from "../../components/iconify";
import ContactMgr from "./ContactMgr";

// ----------------------------------------------------------------------

const { createContact } = ContactMgr;

const ContactCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    address: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const { name, email, contact_number, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // console.log(JSON.stringify(formData));
    const response = await createContact(JSON.stringify(formData));
    console.log(response);

    if (response.response?.status === 400) {
      Object.keys(response.response?.data).map((key) => {
        let err = key.charAt(0).toUpperCase();
        err += key.slice(1).replace("_", " ");
        const error = `${err} : ${response.response?.data[key]}`;

        setMessage(error);
        setSeverity("error");
        setOpen(true);
        setLoading(false);
        return error;
      });
    } else {
      setMessage("Contact Created Successfully");
      setSeverity("success");
      setOpen(true);
      setLoading(false);
    }

    // navigate('/dashboard/contact-list', { replace: true });
    // try {
    //     const response = createContact(JSON.stringify(formData));
    //   const res = await fetch(`http://localhost:5000/api/contacts`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    //   if (!res.ok) throw new Error(data.message);
    //   setLoading(false);
    //   navigate('/dashboard/contact', { replace: true });
    // } catch (err) {
    //   setError(err.message);
    //   setLoading(false);
    // }
  };
  return (
    <Box>
      <Helmet>
        <title> Contact List</title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Contact Create
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<Iconify icon="flat-color-icons:cancel" />}
              sx={{ marginLeft: 2, backgroundColor: "red" }}
              onClick={() => {
                navigate("/contact-list", { replace: true });
              }}
            >
              Cancelasdad
            </Button>
          </Box>
        </Stack>
        <Card>
          <CardHeader title="Create Contact" />
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
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Create Contact
                </LoadingButton>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
      <SnackBar
        open={open}
        setOpen={setOpen}
        message={message}
        severity={severity}
      />
    </Box>
  );
};

export default ContactCreate;
