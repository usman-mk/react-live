import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/auth/login";
import routeDashboard from "./dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/auth/login",
        element: <Login />,
    },
    ...routeDashboard
]);

export default router;
