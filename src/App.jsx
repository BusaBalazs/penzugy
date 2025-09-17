import { createBrowserRouter, RouterProvider } from "react-router";

import { useCtx } from "./context/context";

import StartPage from "./pages/StartPage.jsx";
import QuestionPage from "./pages/QuestionPage.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import PuzzlePage from "./pages/PuzzlePage.jsx";
import EndPage from "./pages/EndPage.jsx";
//-----------------------------------------------------------
const routs = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/questions",
    element: <QuestionPage />,
  },
  {
    path: "/video",
    element: <VideoPage />,
  },
  {
    path: "/puzzle",
    element: <PuzzlePage />,
  },
  {
    path: "/end",
    element: <EndPage />,
  },
]);

//-----------------------------------------------------------
//-----------------------------------------------------------
const App = () => {
  //-----------------------------------------------------------
  return <RouterProvider router={routs} />;
};

export default App;
