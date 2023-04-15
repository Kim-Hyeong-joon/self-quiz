import {
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FaPencilAlt } from "react-icons/fa";
import { IEditQuizSetTitleVariables, editQuizSetTitle } from "../api";
import { useForm } from "react-hook-form";

interface IProp {
  title: string | undefined;
  quizSetPk: string | undefined;
}

interface IForm {
  title: string;
}

export default function EditQuizSetTitle({ title, quizSetPk }: IProp) {
  const { register, handleSubmit } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(editQuizSetTitle, {
    onSuccess: () => {
      toast({
        status: "success",
        position: "top",
        title: "수정 완료!",
      });
      queryClient.refetchQueries(["quiz-set"]);
    },
  });
  const onSubmit = (data: IForm) => {
    if (quizSetPk) {
      const quiSetData: IEditQuizSetTitleVariables = { ...data, quizSetPk };
      mutation.mutate(quiSetData);
    }
  };
  return (
    <>
      <HStack
        justifyContent={"space-between"}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputGroup>
          <InputLeftAddon children={<FaPencilAlt />} />
          <Input
            required
            {...register("title", { required: true })}
            variant={"filled"}
            defaultValue={title}
            placeholder="제목을 입력해주세요"
          />
        </InputGroup>
        <Button type="submit">저장</Button>
      </HStack>
      <Divider mt="3" />
    </>
  );
}
