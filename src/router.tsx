import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Reminder from "./routes/Reminder";
import Quiz from "./routes/Quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "quizs/reminder",
        element: <Reminder />,
      },
      {
        path: "quizs/quiz",
        element: <Quiz />,
      },
    ],
  },
]);

export default router;
