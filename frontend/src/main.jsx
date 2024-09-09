import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './assets/pages/Login.jsx';
import Signup from './assets/pages/Signup.jsx';
import Nopage from './assets/pages/Nopage.jsx';
import Createdocs from './assets/pages/Createdocs.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,

  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/createDocs/:docsId",
    element: <Createdocs/>,
  },
  {
    path: "*",
    element: <Nopage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} >
        <App />
      </RouterProvider>
  </StrictMode>,
)
