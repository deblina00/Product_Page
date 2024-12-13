import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import toast from "react-hot-toast";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

export default function Profile() {
  const [profile, setprofile] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchprofile = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.get(endPoints.auth.profiledetails);
      console.log("Response:", response);

      if (response.status === 200) {
        setprofile(response.data.data);
        // toast.success(response.data.data);
        toast.success("Profile loaded successfully");
      } else {
        toast.error(
          response?.message || "Failed to fetch the profile details."
        );
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching profile details."
      );
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchprofile();
  }, []);
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : profile ? (
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Profile Details
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {profile.first_name} {profile.last_name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {profile.email}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {profile.role_data.roleDisplayName}
              </Typography>
              <Typography variant="body1">
                <strong>Account Created:</strong>{" "}
                {new Date(profile.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No profile details available.
          </Typography>
        )}
      </Container>
    </>
  );
}
