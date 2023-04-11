import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  kind: "reminder" | "quiz";
  title: string;
  question: string;
  answer: string;
  commentary: string;
}

export default function UploadQuiz() {
  const [quizDisabled, setQuizDisabled] = useState(false);
  const { register, watch, handleSubmit } = useForm<IForm>();
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "reminder") {
      setQuizDisabled(() => true);
    } else {
      setQuizDisabled(() => false);
    }
  };
  const onSubmit = (data: IForm) => {
    console.log("submit");
  };
  return (
    <Container>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          종류 선택
          <Select
            {...register("kind", { required: true })}
            placeholder="-- 퀴즈 종류 선택 --"
            onChange={onSelectChange}
          >
            <option value="reminder">리마인더</option>
            <option value="quiz">퀴즈</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            required
            {...register("title", { required: true })}
            placeholder="제목을 작성해주세요."
          />
        </FormControl>
        <FormControl>
          <FormLabel>문제</FormLabel>
          <Input
            disabled={quizDisabled}
            {...register("question", {
              required: !quizDisabled ? true : false,
            })}
            placeholder="문제를 작성해주세요."
          />
        </FormControl>
        <FormControl>
          <FormLabel>정답</FormLabel>
          <Input
            disabled={quizDisabled}
            {...register("answer", { required: !quizDisabled ? true : false })}
            placeholder="정답을 작성해주세요."
          />
        </FormControl>
        <FormControl>
          <FormLabel>해설</FormLabel>
          <Textarea
            disabled={quizDisabled}
            {...register("commentary", {
              required: !quizDisabled ? true : false,
            })}
            placeholder="해설을 작성해주세요."
          />
        </FormControl>
        <Button type="submit" colorScheme="green" w="100%">
          퀴즈 만들기!
        </Button>
      </VStack>
    </Container>
  );
}
