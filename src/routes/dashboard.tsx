import { RouteObject, redirect } from "react-router-dom";

import { getProfile } from "../services/auth.service";
import DashboardLayout from "../pages/dashboard/layout";
import DashboardHome from "../pages/dashboard/home";
import DashboardRoom from "../pages/dashboard/room";
import DashboardProduct from "../pages/dashboard/product";

const routeDashboard: RouteObject[] = [
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: async () => {
            const response = await getProfile();
            if (!response?.data?.data.user) {
                throw redirect("/auth/login");
            }

            return response.data.data.user;
        },
        children: [
            {
                path: "",
                element: <DashboardHome />,
            },
            {
                path: "room",
                element: <DashboardRoom />,
            },
            {
                path: "product",
                element: <DashboardProduct />,
            },
        ],
    },
];

export default routeDashboard;
