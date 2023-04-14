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
  Button,
  Checkbox,
  Container,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getReminders } from "../api";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IReminder {
  id: number;
  title: string;
}

export default function Reminders() {
  const { data, isLoading } = useQuery<IReminder[]>(
    ["reminders"],
    getReminders
  );
  return (
    <>
      <Container maxW="container.md">
        <SimpleGrid w="100%" gap="5" templateColumns={"1fr"}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {data?.map((reminder) => (
                <Card key={reminder.id} h="100%" justifyItems={"center"}>
                  <CardBody>
                    <HStack
                      h="100%"
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Heading size="xs">{reminder.title}</Heading>
                      <Link to={`/quizzes/reminders/${reminder.id}/edit`}>
                        <FaRegEdit />
                      </Link>
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
