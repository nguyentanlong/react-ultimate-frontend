import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './styles/global.css';
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/users.jsx';
import BooksPage from './pages/books.jsx';
import TodoApp from './component/todo/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './component/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';
// import PrivateRoute from './pages/private.route.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [//nested routes làm vậy để kế thừa header, footer
      {
        index: true,
        element: <TodoApp />//phần tử con đạc biệt để chỉ định cái nào ko render vào page con
      },
      {
        path: "/users",
        // element: <div>users page</div>
        element: <UserPage />
      },
      {
        path: "/register",
        // element: <div>users page</div>
        element: <RegisterPage />
      },
      {
        path: "/books.html",
        // element: <div>products page</div>
        element: (
          <PrivateRoute>
            <BooksPage />
          </PrivateRoute>
        )
      }
    ]
  },//tạo router;
  {
    path: "/login.html",
    // element: <div>login page</div>
    element: <LoginPage />
  },
  {
    path: "/register",
    // element: <div>register page</div>
    element: <RegisterPage />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  /*<React.StrictMode>tắt để không chạy 2 lần
    //  <App />*/
  // <RouterProvider router={router} />
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>

  /*</React.StrictMode>,*/
)
