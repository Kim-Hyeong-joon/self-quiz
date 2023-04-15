export interface IBasicQuiz {
  id: number;
  question: string;
  answer: string;
  commentary: string;
  commentary_link: string;
  time: number;
}

export interface IQuizSet {
  id: number;
  title: string;
  basic_quizzes_count: string;
}
