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
} from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Container maxW="container.sm">
        <HStack mb="5" mx="5" justifyContent={"space-between"}>
          <Text fontSize={"2xl"}>오늘의 퀴즈!</Text>
          <Text fontSize={"md"}>전체 풀기&rarr;</Text>
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
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Box h="100%" alignItems={"center"} justifyContent={"center"}>
                  <Heading size="xs">겨울왕국2 day.1 풀기</Heading>
                  <Text fontSize="sm">문제: 5</Text>
                </Box>
                <Text>&rarr;</Text>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  );
}
