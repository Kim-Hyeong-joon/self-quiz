import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  title: string;
  question: string;
  answer: string;
  commentary: string;
  time: number;
  commentary_link: string;
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
    console.log(data);
  };

  return (
    <Container maxW="container.md">
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} mb="50px">
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
        <FormControl>
          <FormLabel>해설 링크</FormLabel>
          <Input
            disabled={quizDisabled}
            {...register("commentary_link")}
            placeholder="유튜브 등 해설링크를 작성해보세요!"
          />
        </FormControl>
        <FormControl>
          <FormLabel>퀴즈 시간</FormLabel>
          <NumberInput min={0} defaultValue={0}>
            <NumberInputField
              disabled={quizDisabled}
              placeholder="몇 초 동안 퀴즈를 푸실 건가요?"
              {...register("time", {
                required: true,
              })}
            />
            {!quizDisabled ? (
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            ) : null}
          </NumberInput>
        </FormControl>
        <Button type="submit" colorScheme="green" w="100%">
          퀴즈 만들기!
        </Button>
      </VStack>
    </Container>
  );
}
