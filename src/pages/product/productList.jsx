import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import toast from "react-hot-toast";
import { endPoints } from "../../api/endPoints";
import axiosInstance, { productt } from "../../api/axios";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import SweetAlertComponent from "../../ui/SweetAlert";

export default function List() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [delete1, setDelete] = useState();
  const [modal, setModal] = useState(false);

  console.log(modal, "kioo");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(endPoints.product.list);

        if (response.status === 200) {
          setProducts(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch products.");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching products."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    console.log("handleDelete called");
    const formData = new FormData();
    formData.append("id", delete1);

    try {
      const response = await axiosInstance.post(
        endPoints.product.remove,
        formData
      );
      const response1 = await axiosInstance.post(endPoints.product.list);
      setProducts(response1.data.data);
      setModal(false);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while fetching products."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          background: "#f4f6f8",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <Paper style={{ width: "100%", maxWidth: 800, padding: 20 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Product List
          </Typography>
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card style={{ paddingBottom: "13px" }}>
                    <CardContent>
                      <img src={productt(product.image)} height="100px" />
                      <Typography variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                      <Link
                        to={`/product/${product._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button size="small" color="primary">
                          View Details
                        </Button>
                      </Link>
                    </CardActions>
                    <button
                      onClick={() => {
                        setDelete(product._id);
                        setModal(true);
                      }}
                      style={{
                        backgroundColor: "#3360ff",
                        color: "#fff",
                        border: "none",
                        padding: "6px",
                      }}
                    >
                      Delete
                    </button>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center">
                  No products found. Click "Load More" to fetch data.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
        <Link to="/add-product">
          <Button variant="outlined" startIcon={<Add />} color="primary">
            Add New Product
          </Button>
        </Link>
      </Grid>

      {modal && (
        <SweetAlertComponent
          title="Are You Sure?"
          subtitle="You Will Not Be Able To Recover This Product"
          type="warning"
          confirm={handleDelete}
          cancle={() => setDelete(false)}
        />
      )}
    </>
  );
}
