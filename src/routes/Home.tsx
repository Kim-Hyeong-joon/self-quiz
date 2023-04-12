import {
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  HStack,
  Container,
  Checkbox,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getQuizs } from "../api";

interface IQuiz {
  title: string;
  question: string;
}

export default function Home() {
  const { data, isLoading } = useQuery<IQuiz[]>(["quizs"], getQuizs);
  console.log(data);
  return (
    <>
      <Container maxW="container.md">
        <HStack mb="5" mx="5" justifyContent={"space-between"}>
          <Text fontSize={"2xl"}>오늘의 퀴즈!</Text>
          <Link to="/quizs/quiz">
            <Text fontSize={"md"}>전체 풀기&rarr;</Text>
          </Link>
        </HStack>
        <SimpleGrid w="100%" gap="5" templateColumns={"1fr"}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {data?.map((quiz, index) => (
                <Card key={index} h="100%" justifyItems={"center"}>
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
                        <Text fontSize="sm">{quiz.question}</Text>
                      </Box>
                      <Text>&rarr;</Text>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </>
          )}
        </SimpleGrid>
      </Container>
    </>
  );
}
