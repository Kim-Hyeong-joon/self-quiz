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
} from "@chakra-ui/react";

export default function Reminder() {
  return (
    <>
      <Container maxW="container.md">
        <HStack mx="5" mb="5" justifyContent={"space-between"}>
          <Text fontSize={"2xl"}>리마인더</Text>
        </HStack>
        <SimpleGrid
          w="100%"
          gap="5"
          templateColumns={{
            base: "1fr",
            md: "repeat(3, 1fr)",
          }}
        >
          <Card h="100%" justifyItems={"center"}>
            <CardBody>
              <HStack h="100%" alignItems={"center"} justifyContent={"center"}>
                <Heading size="xs">겨울왕국2 day.1 풀기</Heading>
                <Checkbox colorScheme="green"></Checkbox>
              </HStack>
            </CardBody>
          </Card>
          <Card h="100%" justifyItems={"center"}>
            <CardBody>
              <HStack alignItems={"center"} justifyContent={"center"}>
                <Heading size="xs">겨울왕국2 day.2 풀기</Heading>
                <Checkbox colorScheme="green"></Checkbox>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  );
}
