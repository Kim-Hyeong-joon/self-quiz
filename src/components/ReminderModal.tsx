import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createReminder } from "../api";
import { useNavigate } from "react-router-dom";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  title: string;
}

export default function ReminderModal({ isOpen, onClose }: ReminderModalProps) {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation(createReminder, {
    onSuccess: () => {
      toast({
        status: "success",
        position: "top",
        title: "리마인더 생성 완료!",
      });
      navigate(`/quizzes/reminder`);
      onClose();
      reset();
    },
  });
  const onSubmit = (data: IForm) => {
    mutation.mutate(data);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalContent mx="3">
          <ModalHeader>리마인더</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input
                required
                {...register("title", { required: true })}
                placeholder="제목을 입력해주세요"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" w="100%" type="submit">
              리마인더 만들기 &rarr;
            </Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
}
