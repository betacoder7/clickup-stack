import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/styles/index.css";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utilities/redux/store";
import Loader from "./global/components/loader";
import Alertdialog from "./global/components/dialog/alertdialog";
import Bigdialog from "./global/components/dialog/bigdialog";
import Header from "./userside/dashboard/components/header";
import AuthHandler from "./userside/auth/components/auth-handler";
import LoginScreen from "./userside/auth/screens/login";
import PageNotFound from "./global/screens/not-found";
import Dashboard from "./userside/dashboard/screens/dashboard";
import AuthWrapper from "./userside/auth/screens/auth-wrapper";
import SignUpScreen from "./userside/auth/screens/sign-up";
import ToploadingBar from "./global/components/toploading-bar";
import Sidebar from "./userside/dashboard/components/side-bar";
import ListManagementScreen from "./userside/list-management/screens/list-management";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { createTheme, ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={createTheme({
      palette: { mode: 'dark' },
      components: {
        MuiDialogActions: { styleOverrides: { root: { display: 'none' } } },
      }
    })}>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer
            progressClassName="rounded-primary"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            stacked
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
          />
          <Loader />
          <Alertdialog />
          <Bigdialog />
          <ToploadingBar />
          <Routes>
            <Route element={<AuthHandler />} >
              <Route element={
                <div className="h-[100dvh] bg-slate-800">
                  <Header />
                  <div className="flex h-[calc(100dvh-2.75rem)]">
                    <Sidebar />
                    <div className="flex-grow">
                      <Outlet />
                    </div>

                  </div>

                </div>
              }>
                <Route path="/" element={<Dashboard />} />
                <Route path="/list/:listUUID" element={<ListManagementScreen />} />    {/* side-bar 468 */}
              </Route>
            </Route>

            <Route element={<AuthWrapper />}>
              <Route path="/login" element={<LoginScreen />}></Route>
              <Route path="/signup" element={<SignUpScreen />}></Route>
            </Route>
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </LocalizationProvider>
);