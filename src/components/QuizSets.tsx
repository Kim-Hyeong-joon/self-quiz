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
import { getQuizSets } from "../api";
import { FaAngleRight } from "react-icons/fa";
import { IQuizSet } from "../types";

export default function QuizSets() {
  const { data, isLoading } = useQuery<IQuizSet[]>(["quizs"], getQuizSets);

  return (
    <Container maxW="container.md">
      <SimpleGrid w="100%" gap="5" templateColumns={"1fr"}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data?.map((quiz, index) => (
              <Card key={index} h="100%" justifyItems={"center"}>
                <Link to={`/quizzes/quizsets/${quiz.id}/edit`}>
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
                      <FaAngleRight />
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
