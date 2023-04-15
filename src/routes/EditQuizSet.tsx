import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getBasicQuizzes, getQuizSet } from "../api";
import { IBasicQuiz, IQuizSet } from "../types";
import EditQuizSetTitle from "../components/EditQuizSetTitle";
import { FaPencilAlt, FaPlus, FaRegEdit } from "react-icons/fa";

export default function EditQuizSet() {
  const { quizSetPk } = useParams();
  const { data, isLoading } = useQuery<IBasicQuiz[]>(
    ["basic-quizzes", quizSetPk],
    getBasicQuizzes
  );
  const { data: quizSetData, isLoading: isQuizSetLoading } = useQuery<IQuizSet>(
    ["quiz-set", quizSetPk],
    getQuizSet
  );
  return (
    <Container maxW="container.md">
      {isQuizSetLoading ? (
        <Spinner />
      ) : (
        <EditQuizSetTitle title={quizSetData?.title} quizSetPk={quizSetPk} />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Heading>퀴즈 목록</Heading>
          {data?.map((basicQuiz, index) => (
            <Link
              key={index}
              to={`/quizzes/quizsets/${quizSetPk}/quiz/${basicQuiz.id}/edit`}
            >
              <Card mt="3">
                <CardBody>
                  <HStack justifyContent={"space-between"}>
                    <Text noOfLines={1}>문제: {basicQuiz.question}</Text>
                    <FaRegEdit size="20px" />
                  </HStack>
                </CardBody>
              </Card>
            </Link>
          ))}
          <Box display={"flex"} justifyContent={"center"}>
            <Link to={`/quizzes/quizsets/${quizSetPk}/quiz-upload`}>
              <Button mt="5">
                <FaPlus />
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
}
