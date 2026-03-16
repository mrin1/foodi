import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AdminPopup from "../../components/common/AdminPopup";

import { useAppDispatch, useAppSelector } from "../../hooks/utils/redux";
import {
  fetchBlogs,
  deleteBlog,
} from "../../hooks/redux-toolkit/slice/blog.slice";

const BlogManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const dispatch = useAppDispatch();

  const { items, loading } = useAppSelector((state) => state.blogs);

  // useEffect(() => {
  //   console.log("current state Items:", items);
  // }, [items]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleOpenAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleOpenEdit = (blog: any) => {
    setEditData(blog);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <Box sx={{ color: "white" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Blog Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#828282" }}>
            Publish and manage news or recipes
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            bgcolor: "#E48C46",
            borderRadius: "12px",
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#d17b38" },
          }}
        >
          Create Post
        </Button>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#11191f",
          borderRadius: "20px",
          border: "1px solid #333",
          backgroundImage: "none",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "rgba(228, 140, 70, 0.05)" }}>
            <TableRow>
              <TableCell sx={{ color: "#E48C46", fontWeight: 700 }}>
                PREVIEW
              </TableCell>
              <TableCell sx={{ color: "#E48C46", fontWeight: 700 }}>
                TITLE
              </TableCell>
              <TableCell sx={{ color: "#E48C46", fontWeight: 700 }}>
                DATE
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#E48C46", fontWeight: 700 }}
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={24} sx={{ color: "#E48C46" }} />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ py: 3, color: "#828282" }}
                >
                  No blog posts found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((blog) => (
                <TableRow
                  key={blog.$id}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}
                >
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={blog.image}
                      sx={{ width: 50, height: 50, borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    {blog.title}
                  </TableCell>
                  <TableCell sx={{ color: "#828282" }}>{blog.date}</TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <IconButton
                        onClick={() => handleOpenEdit(blog)}
                        sx={{ color: "#E48C46" }}
                      >
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(blog.$id!)}
                        sx={{ color: "#ff4d4d" }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AdminPopup
        open={open}
        handleClose={() => setOpen(false)}
        title="Blog"
        editData={editData}
      />
    </Box>
  );
};

export default BlogManagement;
