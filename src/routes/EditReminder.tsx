import {
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  VStack,
  position,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IEditReminderVariables, editReminder, getReminder } from "../api";
import { useForm } from "react-hook-form";
import DeleteReminderAlert from "../components/DeleteReminderAlert";

interface IReminder {
  id: number;
  title: string;
}

interface IForm {
  title: string;
}

export default function EditReminder() {
  const { reminderPk } = useParams();
  const { data, isLoading } = useQuery<IReminder>(
    ["reminder", reminderPk],
    getReminder
  );
  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useMutation(editReminder, {
    onSuccess: () => {
      queryClient.refetchQueries(["reminder", reminderPk]);
      toast({
        status: "success",
        position: "top",
        title: "변경 완료!",
      });
      navigate("/quizzes/my-quizzes");
    },
    onError: (errors) => {
      console.log(errors);
    },
  });
  const onSubmit = (data: IForm) => {
    if (reminderPk) {
      const reminderData: IEditReminderVariables = { ...data, reminderPk };
      mutation.mutate(reminderData);
    }
  };
  return (
    <Container maxW="container.md">
      {isLoading ? (
        <Spinner />
      ) : (
        <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="3">
            <FormLabel>제목</FormLabel>
            <Input
              {...register("title", { required: true })}
              defaultValue={data?.title}
              placeholder="제목을 입력해주세요."
            />
          </FormControl>
          <Button type="submit" w="100%">
            수정하기
          </Button>
        </VStack>
      )}
      <Divider my="5" />
      <DeleteReminderAlert reminderPk={reminderPk} title={data?.title} />
    </Container>
  );
}
