import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axios";
import { endPoints } from "../../api/endPoints";
import toast from "react-hot-toast";
import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

export default function CreateProduct() {
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", image);

    try {
      const response = await axiosInstance.post(
        endPoints.product.createProduct,
        formData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      //  toast.error(response.data.message || "An error occurred!");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", background: "#f4f6f8", padding: 20 }}
    >
      <Paper style={{ width: "100%", maxWidth: 400, padding: 15 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ marginBottom: 20 }}
        >
          -:CREATE PRODUCT:-
        </Typography>
        <form>
          <TextField
            {...register("title", { required: "Title is required" })}
            label="Title"
            placeholder="Enter product title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            {...register("description", {
              required: "Description is required",
            })}
            label="Description"
            placeholder="Enter product description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register("image", { required: "Image is required" })}
            type="file"
            variant="outlined"
            onChange={(e) => setImage(e.target.files[0])}
            error={!!errors.image}
            helperText={errors.image?.message}
            fullWidth
            sx={{ backgroundColor: "white", borderRadius: "5px", mb: 2 }}
          />
          {image && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: "1rem", gap: "1rem" }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                height={150}
                width="auto"
                style={{ borderRadius: "8px" }}
              />
              <Typography variant="caption" display="block">
                Selected file: {image.name}
              </Typography>
            </Stack>
          )}
            <Button
              variant="contained"
              onClick={handleSubmit(ClickFunction)}
              // fullWidth
              sx={{ mt: 2, fontSize: 15, color: "#fff" }}
            >
            Add Product
            </Button>
        </form>
      </Paper>
    </Grid>
  );
}
