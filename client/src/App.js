import { useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/SignIn/SignIn";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import NotFound from "./Pages/NotFound/NotFound";
import AddData from "./Pages/AddData/AddData";

function App() {
  const currentUser = useSelector((state) => Boolean(state.token));

  const mode = useSelector((state) => state.mode);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const Layout = () => {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            <Outlet />
          </Box>
        </ThemeProvider>
      </>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/add-data" element={<AddData />} />
      </Route>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" /> : <Signup />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
