import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/DashBoard";
import RemovedProducts from "./pages/RemovedProducts";
import DeletedProductDetails from "./pages/DeletedProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthChoice from "./pages/AuthChoice";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";
import Activity from "./pages/Activity";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [categories, setCategories] =
    useState(["All"]);

  // ONLY NEW THING
  const [refreshCategories, setRefreshCategories] =
    useState(0);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token)
      return;

    fetch(
      "http://localhost:5037/api/products",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )
      .then(
        response =>
          response.json()
      )

      .then(
        data => {

          const dynamicCategories =
            [
              "All",

              ...new Set(
                data.map(
                  p =>
                    p.category
                )
              )
            ];

          setCategories(
            dynamicCategories
          );
        }
      )

      .catch(
        console.log
      );

  }, [refreshCategories]); // ← ONLY CHANGED

  return (

    <BrowserRouter>

      <Header />

      <div
        style={{
          minHeight: "100vh",
          paddingTop: "76px",
          background:
            "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
          color: "white"
        }}
      >

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <Routes>

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auth"
            element={<AuthChoice />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/logout"
            element={<Logout />}
          />

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/removedproducts"
            element={
              <ProtectedRoute>
                <RemovedProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/deletedproductdetails"
            element={
              <ProtectedRoute>
                <DeletedProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products
                  selectedCategory={selectedCategory}
                  refreshCategories={() =>
                    setRefreshCategories(
                      prev => prev + 1
                    )
                  }
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productdetails"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;