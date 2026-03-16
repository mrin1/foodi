import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  InputAdornment,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LoginImage from "../../assets/images/login/login-img.png";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../../services/validation/auth.validation";
import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import {
  login,
  register as registerThunk,
} from "../../hooks/redux-toolkit/slice/auth.slice";
import type { AuthFormData } from "../../typescript/interface/auth.interface";
import { useNavigate } from "react-router-dom";

interface LoginPopupProps {
  open: boolean;
  handleClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const { loading, role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (role === "admin") {
      // Close popup if it was open
      if (open) handleClose();
      // Force navigation to admin dashboard
      navigate("/admin/dashboard", { replace: true });
    }
  }, [role, navigate, open, handleClose]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(authSchema) as any,
    context: { isLogin },
    defaultValues: { email: "", password: "", fullName: "", phone: "" },
  });

  const toggleAuthMode = () => {
    reset();
    setIsLogin(!isLogin);
  };

  const onSubmit = async (data: AuthFormData) => {
    const result = isLogin
      ? await dispatch(login(data))
      : await dispatch(registerThunk(data));

    if (
      login.fulfilled.match(result) ||
      registerThunk.fulfilled.match(result)
    ) {
      handleClose();
    }

    if (
      login.fulfilled.match(result) ||
      registerThunk.fulfilled.match(result)
    ) {
      handleClose();

      /**
       * CHANGE: Immediate post-login navigation check.
       * We use the direct result payload to ensure no delay in redirecting.
       */
      const userRole =
        (result.payload as any).profile?.role || (result.payload as any).role;

      if (userRole === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/");
      }
    }
  };

  const textFieldStyles = {
    bgcolor: "#1a242b",
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& input": { color: "white", py: 1.5 },
    "& .MuiFormHelperText-root": { color: "#ff4d4d", ml: 0 },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#11191f",
          borderRadius: "24px",
          backgroundImage: "none",
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 20,
          top: 20,
          color: "#E48C46",
          border: "2px solid #E48C46",
          p: "2px",
          zIndex: 10,
        }}
      >
        <CloseIcon sx={{ fontSize: "1.2rem" }} />
      </IconButton>

      <DialogContent sx={{ p: { md: 6, xs: 4 } }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src={LoginImage}
                sx={{
                  width: "100%",
                  height: isLogin ? "400px" : "500px",
                  objectFit: "cover",
                  borderRadius: "24px",
                  transition: "all 0.3s",
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ color: "white" }}>
              <Stack spacing={2.5}>
                <Typography variant="h4" fontWeight={900}>
                  {isLogin ? "Login" : "Sign Up"}
                </Typography>

                {!isLogin && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 700 }}
                    >
                      Full Name :
                    </Typography>
                    <TextField
                      fullWidth
                      {...register("fullName")}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      placeholder="Enter your name"
                      sx={textFieldStyles}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{ color: "#828282", fontSize: "20px" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}

                <Box>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 700 }}>
                    Email :
                  </Typography>
                  <TextField
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    placeholder="Enter your email"
                    sx={textFieldStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon
                            sx={{ color: "#828282", fontSize: "20px" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {!isLogin && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 700 }}
                    >
                      Phone Number :
                    </Typography>
                    <TextField
                      fullWidth
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      placeholder="Enter phone number"
                      sx={textFieldStyles}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon
                              sx={{ color: "#828282", fontSize: "20px" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}

                <Box>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 700 }}>
                    Password :
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    placeholder="Enter password"
                    sx={textFieldStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon
                            sx={{ color: "#828282", fontSize: "20px" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 1 }}
                >
                  {isLogin && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#E48C46",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth={!isLogin}
                    sx={{
                      bgcolor: "#E48C46",
                      px: 4,
                      py: 1.5,
                      borderRadius: "12px",
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#d17b38" },
                    }}
                  >
                    {loading
                      ? "PROCESSING..."
                      : isLogin
                        ? "SUBMIT"
                        : "SIGN UP NOW"}
                  </Button>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "#828282" }}
                >
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <Box
                    component="span"
                    onClick={toggleAuthMode}
                    sx={{
                      color: "#E48C46",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {isLogin ? "Sign up" : "Login here"}
                  </Box>
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  sx={{ pt: 1 }}
                >
                  <Button
                    variant="text"
                    startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<GoogleIcon sx={{ color: "#DB4437" }} />}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Google
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
