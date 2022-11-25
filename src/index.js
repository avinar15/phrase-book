import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./components/home/home";
import Login from './components/login/login';
import Root from './components/root/root'
import About from './components/about/about';
import Dashboard from './components/dashboard/dashboard';
import Words from './components/words/words';
import AddWords from './components/AddWords/AddWords';
import EditWord from './components/editWord/EditWord';
import Translate from './components/Translate/Translate';
import AddTranslate from './components/AddTranslate/AddTranslate';
import EditTranslate from './components/EditTranslate/EditTranslate';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "words",
        element: <Words />
      },
      {
        path: "words/create",
        element: <AddWords />
      },
      {
        path: "words/:id/edit",
        element: <EditWord />
      },
      {
        path: "words/:wordId/translate",
        element: <Translate />
      },
      {
        path: "words/:wordId/translate/create",
        element: <AddTranslate />
      },
      {
        path: "words/:wordId/translate/:id/edit",
        element: <EditTranslate />
      },
    
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
