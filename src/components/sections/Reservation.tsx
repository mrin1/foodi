import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  CardMedia,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import {
  bookTable,
} from "../../hooks/redux-toolkit/slice/reservation.slice";
import { reservationSchema } from "../../services/validation/reservationValidation";
import { toast } from "sonner";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Reservation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.reservation);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      people: 1,
      date: "",
      time: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (!user) return toast.error("Please login to book a table");

    const formData = { ...data, userId: user.$id };

    try {
      await dispatch(bookTable(formData)).unwrap();
      toast.success("Table Booked Successfully!");
      reset(); // Clear form
    } catch (err: any) {
      toast.error(err);
    }
  };

  const inputStyle = {
    bgcolor: "#1a242b",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    input: { color: "white" },
    "& .MuiInputBase-input::placeholder": { color: "#828282" },
  };

  return (
    <Box sx={{ bgcolor: "#0D0D0D", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{ color: "white", fontWeight: 900, mb: 2 }}
          >
            Online Reservation
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#828282", maxWidth: "600px", mx: "auto" }}
          >
            Secure your spot at Foodi. Experience the best flavors in town with
            a guaranteed table.
          </Typography>
        </Box>

        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <Grid size={{ xs: 6 }} key={i}>
                  <Box
                    sx={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      height: "200px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?sig=${i}`}
                      sx={{ height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {/* Dynamic Fields Mapping */}
                {[
                  {
                    name: "name",
                    label: "Your Name",
                    icon: <PersonIcon />,
                    type: "text",
                  },
                  {
                    name: "email",
                    label: "Email",
                    icon: <EmailIcon />,
                    type: "email",
                  },
                  {
                    name: "phone",
                    label: "Phone Number",
                    icon: <PhoneIcon />,
                    type: "tel",
                  },
                  {
                    name: "people",
                    label: "Person",
                    icon: <GroupsIcon />,
                    type: "number",
                  },
                ].map((field) => (
                  <Box key={field.name}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white", mb: 1, fontWeight: 700 }}
                    >
                      {field.label} :
                    </Typography>
                    <Controller
                      name={field.name as any}
                      control={control}
                      render={({ field: inputField }) => (
                        <TextField
                          {...inputField}
                          fullWidth
                          type={field.type}
                          error={!!errors[field.name as keyof typeof errors]}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {React.cloneElement(field.icon as any, {
                                  sx: { color: "#828282" },
                                })}
                              </InputAdornment>
                            ),
                          }}
                          sx={inputStyle}
                        />
                      )}
                    />
                    <FormHelperText error>
                      {errors[field.name as keyof typeof errors]?.message}
                    </FormHelperText>
                  </Box>
                ))}

                <Stack direction="row" spacing={2}>
                  {/* Date Picker */}
                  <Box flex={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white", mb: 1, fontWeight: 700 }}
                    >
                      Date :
                    </Typography>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="date"
                          error={!!errors.date}
                          sx={inputStyle}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarMonthIcon sx={{ color: "#828282" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Box>
                  {/* Time Picker */}
                  <Box flex={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "white", mb: 1, fontWeight: 700 }}
                    >
                      Time :
                    </Typography>
                    <Controller
                      name="time"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="time"
                          error={!!errors.time}
                          sx={inputStyle}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccessTimeIcon sx={{ color: "#828282" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Box>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: "#E48C46",
                    width: "fit-content",
                    px: 5,
                    py: 1.8,
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {loading ? "BOOKING..." : "BOOK A TABLE"}
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Reservation;
