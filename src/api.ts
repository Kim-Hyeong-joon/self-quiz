import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getQuizs = () =>
  instance.get("quizzes/").then((response) => response.data);

export const getReminders = () =>
  instance.get("quizzes/reminders").then((response) => response.data);

export const getQuiz = ({ queryKey }: QueryFunctionContext) => {
  const [first, quizPk] = queryKey;
  return instance
    .get(`quizzes/${quizPk}/basic-quizzes`)
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
