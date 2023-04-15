import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { deleteBasicQuiz } from "../api";
import { useNavigate } from "react-router-dom";

interface IProp {
  quizPk: string | undefined;
  quizSetPk: string | undefined;
}

export default function DeleteQuizAlert({ quizPk, quizSetPk }: IProp) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(deleteBasicQuiz, {
    onSuccess: () => {
      toast({
        status: "success",
        position: "top",
        title: "삭제가 완료되었습니다.",
      });
      navigate(`/quizzes/quizsets/${quizSetPk}/edit`);
    },
    onError: () => {
      toast({
        status: "error",
        position: "top",
        title: "오류가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(quizPk);
  };
  return (
    <>
      <Button w="100%" colorScheme="red" onClick={onOpen}>
        퀴즈 삭제
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              퀴즈를 삭제 하시겠습니까?
            </AlertDialogHeader>
            <AlertDialogBody>삭제하시면 복구가 불가능합니다.</AlertDialogBody>
            <AlertDialogFooter as="form" onSubmit={onSubmit}>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
