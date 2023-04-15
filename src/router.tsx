import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Reminder from "./routes/Reminder";
import Quiz from "./routes/Quiz";
import UploadQuiz from "./routes/UploadQuiz";
import MyQuizzes from "./routes/MyQuizzes";
import EditReminder from "./routes/EditReminder";
import EditQuizSet from "./routes/EditQuizSet";

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
        path: "quizzes/reminders",
        element: <Reminder />,
      },
      {
        path: "quizzes/:quizSetPk/quiz",
        element: <Quiz />,
      },
      {
        path: "quizzes/upload",
        element: <UploadQuiz />,
      },
      {
        path: "quizzes/my-quizzes",
        element: <MyQuizzes />,
      },
      {
        path: "quizzes/reminders/:reminderPk/edit",
        element: <EditReminder />,
      },
      {
        path: "quizzes/quizsets/:quizSetPk/edit",
        element: <EditQuizSet />,
      },
      {
        path: "quizzes/quizsets/:quizSetPk/quiz-upload",
        element: <UploadQuiz />,
      },
    ],
  },
]);

export default router;
