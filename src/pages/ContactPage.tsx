import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  IconButton,
  Paper,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SubjectIcon from "@mui/icons-material/Subject";
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PageHeader from "../components/common/PageHeader";

// Form & Logic Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../hooks/utils/redux";
import { submitContactForm } from "../hooks/redux-toolkit/slice/contact.slice";

// FIX: Validation Schema matching your Appwrite Columns
const contactSchema = yup
  .object({
    name: yup.string().required("Full name is required").min(3, "Too short"),
    email: yup.string().email("Invalid email").required("Email is required"),
    subjects: yup.string().required("Please provide a subject"),
    message: yup
      .string()
      .required("Message cannot be empty")
      .min(10, "Tell us a bit more"),
  })
  .required();

type ContactFormData = yup.InferType<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.contact);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });
  const onSubmit = async (data: ContactFormData) => {
    const result = await dispatch(submitContactForm(data));
    if (submitContactForm.fulfilled.match(result)) {
      setShowSuccess(true);
      reset(); 
    }
  };

  return (
    <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", pb: 0 }}>
      <PageHeader title="Contact Us" breadcrumb="Contact" />

      <Container maxWidth="lg" sx={{ mt: 8, mb: 10 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: 800, mb: 1 }}
            >
              Get In Touch
            </Typography>
            <Typography variant="body2" sx={{ color: "#828282", mb: 4 }}>
              Your email address will not be published. Required fields are
              marked.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Box flex={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white", mb: 1, fontWeight: 700 }}
                    >
                      Your Name :
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter your name"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{ color: "#828282", fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={inputSx}
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white", mb: 1, fontWeight: 700 }}
                    >
                      Email :
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter your email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon
                              sx={{ color: "#828282", fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={inputSx}
                    />
                  </Box>
                </Stack>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white", mb: 1, fontWeight: 700 }}
                  >
                    Subjects :
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Subject of message"
                    {...register("subjects")} 
                    error={!!errors.subjects}
                    helperText={errors.subjects?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SubjectIcon
                            sx={{ color: "#828282", fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white", mb: 1, fontWeight: 700 }}
                  >
                    Message :
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Write your message here..."
                    {...register("message")}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ alignSelf: "flex-start", mt: 1.5 }}
                        >
                          <EditIcon sx={{ color: "#828282", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: "#E48C46",
                    width: "fit-content",
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    "&:hover": { bgcolor: "#d17b38" },
                    "&.Mui-disabled": { bgcolor: "#333", color: "#828282" },
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              sx={{
                p: 4,
                bgcolor: "#11191f",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.05)",
                backgroundImage: "none",
              }}
            >
              <Stack spacing={4}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: 800, mb: 1 }}
                  >
                    Address :
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#828282" }}>
                    543 Country Club Ave, NC 27587, London, UK
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: 800, mb: 1 }}
                  >
                    Contact :
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#828282" }}>
                    Phone : +918248457995
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#828282" }}>
                    Email : Foodi018@gmail.com
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: 800, mb: 1 }}
                  >
                    Opening Hours :
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#828282" }}>
                    Monday - Friday : 9:00 AM - 10:00 PM
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#828282" }}>
                    Saturday - Sunday : 9:00 AM - 7:00 PM
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: 800, mb: 2 }}
                  >
                    Stay Connected :
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {[
                      <FacebookIcon />,
                      <TwitterIcon />,
                      <InstagramIcon />,
                      <LinkedInIcon />,
                    ].map((icon, i) => (
                      <IconButton
                        key={i}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.05)",
                          color: "white",
                          mr: 1,
                          "&:hover": { bgcolor: "#E48C46" },
                        }}
                      >
                        {React.cloneElement(icon as React.ReactElement<any>, {
                          sx: { fontSize: 18 },
                        })}
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          width: "100%",
          height: "450px",
          filter: "grayscale(100%) invert(90%) contrast(90%)",
        }}
      >
        <iframe
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.334399277!2d88.2649502!3d22.5354273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" variant="filled" sx={{ bgcolor: "#4caf50" }}>
          Message sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};


const inputSx = {
  bgcolor: "#1a242b",
  borderRadius: "8px",
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiFormHelperText-root": { color: "#ff4d4d" },
};

export default ContactPage;
