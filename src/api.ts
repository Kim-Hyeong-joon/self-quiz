import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getQuizSets = () =>
  instance.get("quizzes/").then((response) => response.data);

export const getReminders = () =>
  instance.get("quizzes/reminders").then((response) => response.data);

export const getBasicQuizzes = ({ queryKey }: QueryFunctionContext) => {
  const [first, quizSetPk] = queryKey;
  return instance
    .get(`quizzes/quizsets/${quizSetPk}/basic-quizzes`)
    .then((response) => response.data);
};

export const createReminder = ({ title }: { title: string }) =>
  instance
    .post(
      "quizzes/reminders",
      { title },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IUploadQuizSetSuccess {
  id: string;
  title: string;
}

export const createQuizSet = ({ title }: { title: string }) =>
  instance
    .post(
      "quizzes/",
      { title },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getReminder = ({ queryKey }: QueryFunctionContext) => {
  const [first, reminderPk] = queryKey;
  return instance
    .get(`quizzes/reminders/${reminderPk}`)
    .then((response) => response.data);
};

export interface IEditReminderVariables {
  title: string;
  reminderPk: string;
}

export const editReminder = (data: IEditReminderVariables) =>
  instance
    .put(`quizzes/reminders/${data.reminderPk}`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getQuizSet = ({ queryKey }: QueryFunctionContext) => {
  const [first, quizSetPk] = queryKey;
  return instance
    .get(`quizzes/quizsets/${quizSetPk}`)
    .then((response) => response.data);
};

export interface IEditQuizSetTitleVariables {
  title: string;
  quizSetPk: string;
}

export const editQuizSetTitle = (data: IEditQuizSetTitleVariables) =>
  instance
    .put(`quizzes/quizsets/${data.quizSetPk}`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadQuizVariables {
  title: string;
  question: string;
  answer: string;
  commentary: string;
  time: number;
  commentary_link: string;
  quizSetPk: string | undefined;
}

export const uploadQuiz = (data: IUploadQuizVariables) =>
  instance
    .post(`quizzes/quizsets/${data.quizSetPk}/basic-quizzes`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
