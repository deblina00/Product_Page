import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";
import { endPoints } from "../../../api/endPoints";

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState();

  const ClickFuntion = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_pic", image);

    try {
      const response = await axiosInstance.post(endPoints.auth.register, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      console.log("Login Successful:", response.data.message);
    } catch (error) {
      // toast.error(error.data.message);
    }
  };
  return (
    <>
      <form autoComplete="off">
        <h2>Registration Form</h2>
        <TextField
          {...register("first_name", {
            required: "First_name is required",
          })}
          label="First_name"
          required
          variant="outlined"
          color="secondary"
          type="text"
          error={errors.first_name}
          helperText={errors.first_name && errors.first_name.message}
          sx={{ mb: 1 }}
        />
        <br />
        <TextField
          {...register("last_name", {
            required: "last_name is required",
          })}
          label="last_name"
          required
          variant="outlined"
          color="secondary"
          type="text"
          error={errors.last_name}
          helperText={errors.last_name && errors.last_name.message}
          sx={{ mb: 1 }}
        />
        <br />
        <TextField
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email format",
            },
          })}
          label="email"
          required
          variant="outlined"
          color="secondary"
          type="email"
          error={errors.email}
          helperText={errors.email && errors.email.message}
          sx={{ mb: 1 }}
        />
        <br />
        <TextField
          {...register("password", {
            required: "password is required",
          })}
          label="password"
          required
          variant="outlined"
          color="secondary"
          type="password"
          error={errors.password}
          helperText={errors.password && errors.password.message}
          sx={{ mb: 1 }}
        />
        <br />
        <TextField
          {...register("profile_pic", {
            required: "profile_pic is required",
          })}
          type="file"
          inputProps={{ accept: "image/*" }}
          variant="outlined"
          color="secondary"
          onChange={(e) => setImage(e.target.files[0])}
          error={!!errors.profile_pic}
          helperText={errors.profile_pic && errors.profile_pic.message}
          // fullWidth
          sx={{ backgroundColor: "white", borderRadius: "5px", mb: 4 }}
        />
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          style={{
            display: `${image ? "flex" : "none"}`,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          <img
            src={image && URL.createObjectURL(image)}
            height={100}
            width={"auto"}
            style={{ borderRadius: "10px" }}
          />
          {/* {image && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Selected file: {image.name}
            </Typography>
          )} */}
        </Stack>
        <br />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleSubmit(ClickFuntion)}
          type="submit"
        >
          Register
        </Button>
      </form>
    </>
  );
}
