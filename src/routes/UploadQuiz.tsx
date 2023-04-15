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
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IUploadQuizVariables, uploadQuiz } from "../api";

interface IForm {
  title: string;
  question: string;
  answer: string;
  commentary: string;
  time: number;
  commentary_link: string;
}

export default function UploadQuiz() {
  const { quizSetPk } = useParams();
  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(uploadQuiz, {
    onSuccess: () => {
      toast({
        status: "success",
        position: "top",
        title: "퀴즈 생성완료",
      });
      navigate(`/quizzes/quizsets/${quizSetPk}/edit`);
    },
    onError: () => {
      toast({
        status: "error",
        position: "top",
        title: "오류가 발생했습니다",
        description: "다시 시도해주세요",
      });
    },
  });
  const onSubmit = (data: IForm) => {
    if (quizSetPk) {
      const quizData: IUploadQuizVariables = { ...data, quizSetPk };
      mutation.mutate(quizData);
    }
  };

  return (
    <Container maxW="container.md">
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} mb="50px">
        <FormControl>
          <FormLabel>문제</FormLabel>
          <Input
            {...register("question", {
              required: true,
            })}
            placeholder="문제를 작성해주세요."
          />
        </FormControl>
        <FormControl>
          <FormLabel>정답</FormLabel>
          <Input
            {...register("answer", { required: true })}
            placeholder="정답을 작성해주세요."
          />
        </FormControl>
        <FormControl>
          <FormLabel>해설</FormLabel>
          <Textarea
            {...register("commentary", {
              required: true,
            })}
            placeholder="해설을 작성해주세요."
          />
        </FormControl>
        <FormControl>
          <FormLabel>해설 링크</FormLabel>
          <Input
            {...register("commentary_link")}
            placeholder="유튜브 등 해설링크를 작성해보세요!"
          />
        </FormControl>
        <FormControl>
          <FormLabel>퀴즈 시간</FormLabel>
          <NumberInput min={0} defaultValue={0}>
            <NumberInputField
              placeholder="몇 초 동안 퀴즈를 푸실 건가요?"
              {...register("time", {
                required: true,
              })}
            />

            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button type="submit" colorScheme="green" w="100%">
          퀴즈 만들기!
        </Button>
      </VStack>
    </Container>
  );
}
