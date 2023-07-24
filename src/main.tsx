import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";
import router from "./routes/router";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
        {/* </React.StrictMode> */}
    </Provider>
);
