import { Box, Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function Login({ userlogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const ClickFuntion = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const response = await axiosInstance.post(endPoints.auth.login, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        login(response.data.token);
        navigate("/products");
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
      <Box
        width={400}
        height={400}
        marginX={"auto"}
        marginTop={4}
        bgcolor={"#f5f5f5"}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        padding={4}
      >
        <form autoComplete="off">
          <h2>Login Form</h2>
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Write like this 'example@domain.com'",
              },
            })}
            label="username"
            required
            placeholder="Enter username"
            margin="normal"
            error={errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 1 }}
          />
          <br />
          <TextField
            {...register("password", {
              required: "password is required",
            })}
            label="password"
            placeholder="Enter password"
            type="password"
            margin="normal"
            error={errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 1 }}
          />
          <br />
          {/* <label>
          <input
            type="checkbox"
            value="Remember me"
            {...register("option", { required: "please check the option" })}
          />
          Remember me
        </label>
        <br />
        {errors.option && (
          <p style={{ color: "red" }}>{errors.option.message}</p>
        )}

        <br /> */}
          <Button
            onClick={handleSubmit(ClickFuntion)}
            variant="contained"
            style={{ margin: "10px 0", background: "#3949ab", color: "#fff" }}
          >
            Login
          </Button>
          <Link to="/registration">
            <Button variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Link>
        </form>
      </Box>
    </>
  );
}
