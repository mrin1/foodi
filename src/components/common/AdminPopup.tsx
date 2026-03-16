import React, { useState, useRef, useEffect } from "react";
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
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TitleIcon from "@mui/icons-material/Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  menuSchema,
  chefSchema,
  blogSchema,
} from "../../services/validation/admin.validation";
import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import {
  addDish,
  updateDish,
} from "../../hooks/redux-toolkit/slice/menu.slice";
import {
  addChef,
  updateChef,
} from "../../hooks/redux-toolkit/slice/chef.slice";
import {
  addBlog,
  updateBlog,
} from "../../hooks/redux-toolkit/slice/blog.slice";

interface AdminPopupProps {
  open: boolean;
  handleClose: () => void;
  title: "Menu" | "Chef" | "Blog" | string; 
  editData?: any;
}

interface AdminFormInput {
  title: string;
  description: string;
  image: string;
  price: string | number;
}

const AdminPopup: React.FC<AdminPopupProps> = ({
  open,
  handleClose,
  title,
  editData,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { loading: menuLoading } = useAppSelector((state) => state.menu);
  const { loading: chefLoading } = useAppSelector((state) => state.chef);
  const { loading: blogLoading } = useAppSelector((state) => state.blogs);
  const loading =
    title === "Chef"
      ? chefLoading
      : title === "Blog"
        ? blogLoading
        : menuLoading;

  const currentSchema: any =
    title === "Chef" ? chefSchema : title === "Blog" ? blogSchema : menuSchema;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AdminFormInput>({
    resolver: yupResolver(currentSchema) as any,
    defaultValues: { title: "", description: "", image: "", price: "" },
  });

  useEffect(() => {
    if (editData && open) {
      reset({
        title: title === "Chef" ? editData.name || "" : editData.title || "",
        description: editData.description || "",
        image: editData.image || "",
        price:
          title === "Chef"
            ? editData.designation || ""
            : title === "Blog"
              ? editData.date || ""
              : editData.price || "",
      });
      setPreview(editData.image);
    } else if (!open) {
      reset({ title: "", description: "", image: "", price: "" });
      setPreview(null);
    }
  }, [editData, open, reset, title]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setValue("image", result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData: AdminFormInput) => {
    const cleanData = {
      ...formData,
      price: title === "Menu" ? Number(formData.price) : String(formData.price),
    };

    if (title === "Blog") {
      if (editData?.$id) {
        const result = await dispatch(
          updateBlog({ id: editData.$id, data: cleanData }),
        );
        if (updateBlog.fulfilled.match(result)) handleClose();
      } else {
        const result = await dispatch(addBlog(cleanData));
        if (addBlog.fulfilled.match(result)) handleClose();
      }
    } else if (title === "Chef") {
      if (editData?.$id) {
        const result = await dispatch(
          updateChef({ id: editData.$id, data: cleanData }),
        );
        if (updateChef.fulfilled.match(result)) handleClose();
      } else {
        const result = await dispatch(addChef(cleanData));
        if (addChef.fulfilled.match(result)) handleClose();
      }
    } else {
      if (editData?.$id) {
        const result = await dispatch(
          updateDish({ id: editData.$id, data: cleanData }),
        );
        if (updateDish.fulfilled.match(result)) handleClose();
      } else {
        const result = await dispatch(addDish(cleanData));
        if (addDish.fulfilled.match(result)) handleClose();
      }
    }
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
          borderRadius: "28px",
          backgroundImage: "none",
          border: "1px solid rgba(228, 140, 70, 0.2)",
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
          border: "1.5px solid #E48C46",
          "&:hover": { bgcolor: "rgba(228, 140, 70, 0.1)" },
        }}
      >
        <CloseIcon sx={{ fontSize: "18px" }} />
      </IconButton>

      <DialogContent sx={{ p: { md: 6, xs: 4 } }}>
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: 900, mb: 1 }}
        >
          {title} Management
        </Typography>
        <Typography variant="body2" sx={{ color: "#828282", mb: 4 }}>
          {editData
            ? `Edit the details of ${title.toLowerCase()}`
            : `Add a new entry for ${title.toLowerCase()}`}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  height: "350px",
                  borderRadius: "24px",
                  bgcolor: "#1a242b",
                  border: errors.image
                    ? "2px dashed #ff4d4d"
                    : "2px dashed #E48C46",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  "&:hover": { bgcolor: "rgba(228, 140, 70, 0.05)" },
                }}
              >
                {preview ? (
                  <Fade in={true}>
                    <Box
                      component="img"
                      src={preview}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Fade>
                ) : (
                  <Stack alignItems="center" spacing={1}>
                    <CloudUploadIcon sx={{ fontSize: 50, color: "#E48C46" }} />
                    <Typography variant="caption" color="#828282">
                      Upload {title} Photo
                    </Typography>
                  </Stack>
                )}
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Box>
              <input type="hidden" {...register("image")} />
              {errors.image && (
                <Typography
                  variant="caption"
                  sx={{ color: "#ff4d4d", mt: 1, display: "block" }}
                >
                  {errors.image.message}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#E48C46",
                      fontWeight: 700,
                      mb: 1,
                      display: "block",
                    }}
                  >
                    {title === "Chef"
                      ? "CHEF FULL NAME"
                      : title === "Blog"
                        ? "BLOG TITLE"
                        : "DISH TITLE"}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder={`Enter ${title.toLowerCase()} title...`}
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message as string}
                    sx={inputSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon sx={{ color: "#828282", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#E48C46",
                      fontWeight: 700,
                      mb: 1,
                      display: "block",
                    }}
                  >
                    {title === "Chef" ? "BIOGRAPHY" : "DESCRIPTION"}
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Provide more information..."
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message as string}
                    sx={inputSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ alignSelf: "flex-start", mt: 1 }}
                        >
                          <DescriptionIcon
                            sx={{ color: "#828282", fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

           
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#E48C46",
                      fontWeight: 700,
                      mb: 1,
                      display: "block",
                    }}
                  >
                    {title === "Menu"
                      ? "PRICE (INR)"
                      : title === "Blog"
                        ? "PUBLISH DATE"
                        : "DESIGNATION / ROLE"}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder={
                      title === "Menu"
                        ? "0.00"
                        : title === "Blog"
                          ? "e.g. 15 Oct, 2026"
                          : "e.g. Executive Chef"
                    }
                    {...register("price")}
                    error={!!errors.price}
                    helperText={errors.price?.message as string}
                    sx={inputSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon sx={{ color: "#828282", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: "#E48C46",
                    py: 1.8,
                    borderRadius: "12px",
                    fontWeight: 900,
                    fontSize: "1rem",
                    boxShadow: "0 8px 16px rgba(228, 140, 70, 0.2)",
                    "&:hover": { bgcolor: "#d17b38" },
                    "&.Mui-disabled": { bgcolor: "#21262d", color: "#828282" },
                  }}
                >
                  {loading
                    ? "SAVING..."
                    : editData
                      ? `UPDATE ${title.toUpperCase()}`
                      : `SAVE ${title.toUpperCase()}`}
                  {/* {loading
                    ? editData
                      ? "UPDATING..."
                      : "SAVING..."
                    : editData
                      ? `UPDATE ${title.toUpperCase()}`
                      : `SAVE ${title.toUpperCase()}`} */}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const inputSx = {
  bgcolor: "#1a242b",
  borderRadius: "12px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid rgba(255,255,255,0.05)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": { border: "1px solid #E48C46" },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #E48C46",
  },
  "& input, & textarea": { color: "white", fontWeight: 500 },
};

export default AdminPopup;
