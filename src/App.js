// Import dependencies
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import pages
import Login from "./pages/auth/login/Login";
import Wrapper from "./pages/layout/wrapper/Wrapper";
import Registration from "./pages/auth/registration/Registration";
import CreateProduct from "./pages/product/CreateProduct";
import ProductDetails from "./pages/product/ProductDetails";
import Profile from "./pages/auth/profile/Profile";
import List from "./pages/product/productList";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/" replace />;
};
function App() {
  const publicRoutes = [
    { path: "/", element: <Login /> },
    { path: "/registration", element: <Registration /> },
  ];

  const privateRoutes = [
    // Add private routes here, e.g.,
    // { path: "/dashboard", element: <Dashboard /> },
    { path: "/profile-detail", element: <Profile /> },
    { path: "/add-product", element: <CreateProduct /> },
    { path: "/products", element: <List /> },
    { path: "/product/:id", element: <ProductDetails /> },
  ];

  return (
    <div className="App">
      <Router>
        <Wrapper>
          <Routes>
            {/* Render public routes */}
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {/* Render private routes */}
            {privateRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<PrivateRoute>{element}</PrivateRoute>}
              />
            ))}
          </Routes>
        </Wrapper>
      </Router>
    </div>
  );
}

export default App;
