import {
  Text,
  Card,
  CardBody,
  Heading,
  Box,
  HStack,
  Container,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getQuizs } from "../api";
import { FaRegEdit } from "react-icons/fa";

interface IQuiz {
  id: number;
  title: string;
  basic_quizzes_count: string;
}

export default function QuizSets() {
  const { data, isLoading } = useQuery<IQuiz[]>(["quizs"], getQuizs);
  return (
    <Container maxW="container.md">
      <SimpleGrid w="100%" gap="5" templateColumns={"1fr"}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data?.map((quiz, index) => (
              <Card key={index} h="100%" justifyItems={"center"}>
                <Link to={`/quizs/${quiz.id}/quiz`}>
                  <CardBody>
                    <HStack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        h="100%"
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Heading size="xs">{quiz.title}</Heading>
                        <Text fontSize="sm">
                          문제 수:{quiz.basic_quizzes_count}
                        </Text>
                      </Box>
                      <FaRegEdit />
                    </HStack>
                  </CardBody>
                </Link>
              </Card>
            ))}
          </>
        )}
      </SimpleGrid>
    </Container>
  );
}
