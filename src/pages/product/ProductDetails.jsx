// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axiosInstance from "../../api/axios";
// import { endPoints } from "../../api/endPoints";
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Grid,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { ArrowBackIosNew } from "@mui/icons-material";

// export default function ProductDetails() {
//   const [list, setList] = useState(null);
//   const { id } = useParams();
//   const [image, setImage]= useState()
//   const [isLoading, setIsLoading]= useState(false);
//   const{register, handleSubmit, setValue, formData: {errors}} = useForm();

//   const ClickFuntion=async (data)=> {
//     const formData=new FormData();
//     formData.append("id", id)
//     formData.append("title", data.title);
//     formData.append("description", data.description);

//     if(image){
//       formData.append("image", image);
//     } else {
//       formData.append("image", product.image);
//     }

//     try {
//       const response = await axiosInstance.get(
//         endPoints.product.update, formData
//       );
//       if (response.status === 200) {
//         setList(response.data.data);
//       } else {
//         console.error("Failed to fetch product details");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     reset ();
//     setImage(null);
//   };

//   useEffect(() => {
//   const   fetchProductDetails= asynce ()=>{
//     setIsLoading(true);
//     try{

//     }
//   };
//   }, [id]);

//    useEffect(() => {
//     setValue("title", product?.title);
//     setValue("description", product?.description);
//     setValue("image", image);
//   }, [product]);

//   return (
//     <>
//       <Box bgcolor={"#f5f5f5"} padding={4}>
//         <Typography variant="h1" color="initial" fontSize={40}>
//           {list?.title || "Loading..."}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ color: "text.primary" }}
//           dangerouslySetInnerHTML={{ __html: list?.postText }}
//         ></Typography>
//         <Link to="/products" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<ArrowBackIosNew />}
//           >
//             Back to Product List
//           </Button>
//         </Link>
//            <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }}>
//               <Avatar
//                 alt="Product Picture"
//                 src={
//                   image
//                     ? URL.createObjectURL(image)
//                     : product?.image
//                       ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`
//                       : ''
//                 }
//                 sx={{ width: 90, height: 90 }}
//               />
//               <label htmlFor="product-pic-upload">
//                 <Input
//                   accept="image/*"
//                   id="product-pic-upload"
//                   type="file"
//                   onChange={(e) =>
//                     setImage(e.target.files ? e.target.files[0] : null)
//                   }
//                 />
//                 <Button variant="contained" component="span" sx={{
//                   backgroundColor: darkMode.value ? '#303f9f' : '#3f51b5',
//                   color: '#fff',
//                   '&:hover': {
//                     backgroundColor: darkMode.value ? '#5c6bc0' : '#303f9f',
//                   },
//                 }}>
//                   Upload Product Pic
//                 </Button>
//               </label>
//             </Stack>
//       </Box>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Grid,
  TextField,
  Stack,
  Avatar,
  Input,
} from "@mui/material";

import toast from "react-hot-toast";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { endPoints } from "../../api/endPoints";
import axiosInstance from "../../api/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", product.image);
    }

    try {
      const response = await axiosInstance.post(
        endPoints.product.productupdate,
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Product created successfully!");
      } else {
        toast.error(response.data.message || "Failed to create product!");
      }
    } catch (error) {
      // toast.error(response.data.message || "An error occurred!");
    }
    // reset();
    setImage(null);
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          endPoints.product.productdetails + id
        );
        if (response.status === 200 && response.data.data) {
          setProduct(response.data.data);
        } else {
          toast.error("Failed to fetch product details.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching product details."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    setValue("title", product?.title);
    setValue("description", product?.description);
    setValue("image", image);
  }, [product]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh", background: "#d1c4e9", padding: 20 }}
      >
        <Paper
          style={{
            width: "100%",
            maxWidth: 500,
            padding: 25,
            borderRadius: 15,
          }}
        >
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
            {/* <TextField
                            {...register("image", { required: "Image is required" })}
                            type="file"
                            variant="outlined"
                            onChange={(e) => setImage(e.target.files[0])}
                            error={!!errors.image}
                            helperText={errors.image?.message}
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "5px", mb: 2 }}
                        /> */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 2 }}
            >
              <Avatar
                alt="Product Picture"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : product?.image
                    ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`
                    : ""
                }
                sx={{ width: 90, height: 90 }}
              />
              <label htmlFor="product-pic-upload">
                <Input
                  accept="image/*"
                  id="product-pic-upload"
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            </Stack>
            <Button
              variant="contained"
              onClick={handleSubmit(ClickFunction)}
              // fullWidth
              sx={{ mt: 3, fontSize: 18, color: "#fff" }}
            >
              <b>Create product!</b>
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default ProductDetails;
