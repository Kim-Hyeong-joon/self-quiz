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

interface IReminder {
  id: number;
  title: string;
}

export default function Reminder() {
  const { data, isLoading } = useQuery<IReminder[]>(
    ["reminders"],
    getReminders
  );
  return (
    <>
      <Container maxW="container.md">
        <HStack mx="5" mb="5" justifyContent={"space-between"}>
          <Text fontSize={"2xl"}>리마인더</Text>
        </HStack>
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
                      justifyContent={"center"}
                    >
                      <Heading size="xs">{reminder.title}</Heading>
                      <Checkbox colorScheme="green"></Checkbox>
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
