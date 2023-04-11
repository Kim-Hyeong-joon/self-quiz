import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Reminder from "./routes/Reminder";
import Quiz from "./routes/Quiz";
import UploadQuiz from "./routes/UploadQuiz";

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
      {
        path: "quizs/upload",
        element: <UploadQuiz />,
      },
    ],
  },
]);

export default router;
