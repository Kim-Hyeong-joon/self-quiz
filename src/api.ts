import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getQuizs = () =>
  instance.get("quizzes/").then((response) => response.data);

export const getReminders = () =>
  instance.get("quizzes/reminders").then((response) => response.data);
