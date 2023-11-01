import Login from "./pages/Login";
import Chat from "./pages/Chat";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// make a simple router use createBrowserRouter

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    }
  ])
}


export default App
