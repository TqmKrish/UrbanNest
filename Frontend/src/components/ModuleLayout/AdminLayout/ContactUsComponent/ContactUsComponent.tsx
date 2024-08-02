import React, { useState } from "react";
import "./ContactUsComponent.scss";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import CarouselComponent from "../../../CommonComponents/Carousel/Carousel";
import image1 from "../../../../assets/images/2224.jpg";
import image2 from "../../../../assets/images/10276.jpg";
import image3 from "../../../../assets/images/logo_make_11_06_2023_8.jpg";
import axios from "axios";

const ContactForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

const demoImages = [image1, image2, image3];

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      const email = await axios.post(
        "http://localhost:5000/api/send-email",
        formData
      );
      console.log(email);
      setSnackbarMessage("Message sent successfully!");
      setOpenSnackbar(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <Grid item xs={12} md={6} sx={{ padding: 0 }}>
          <Paper elevation={3} sx={{ padding: "2rem" }}>
            <Box display="flex" alignItems="center" marginBottom="1rem">
              <Typography variant="h4" component="h1" gutterBottom>
                Contact Us
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
              How can we help you?
            </Typography>
            <ContactForm onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                placeholder="Please provide details on how we can assist you..."
              />
              <Button type="submit" variant="contained" fullWidth>
                Send Message
              </Button>
            </ContactForm>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CarouselComponent carouselImages={demoImages} />
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage === "Message sent successfully!"
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
