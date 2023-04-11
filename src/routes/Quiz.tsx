import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart, FaRegClock, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { showNavBarState } from "../components/Root";

interface IQuiz {
  question: string;
  answer: string;
  commentary: string;
  time: number;
  bookmark: boolean;
}

const quizs: IQuiz[] = [
  {
    question: "안나: 좋아, 가보자고! 잘할 수 있어. 엘사.",
    answer: "Okay. Here we go! You got this. Elsa.",
    commentary:
      "Here we go!는 뭔가 흥분되거나 위험한 일을 시작할 때 외치는 말이에요. You got this.는 (이 일은 네게 어렵지 않으니/너는 준비되었으니) '잘할 수 있다'는 뜻으로 쓰는 표현이고요.",
    time: 20,
    bookmark: true,
  },
  {
    question: "안나: 좋아, 가보자고!!!!",
    answer: "Okay. Here we go! You got this. Elsa.",
    commentary:
      "Here we go!는 뭔가 흥분되거나 위험한 일을 시작할 때 외치는 말이에요. You got this.는 (이 일은 네게 어렵지 않으니/너는 준비되었으니) '잘할 수 있다'는 뜻으로 쓰는 표현이고요.",
    time: 40,
    bookmark: false,
  },
  {
    question: "안나: 좋아, 가보자고! 잘할 수 있어!!!!!!!",
    answer: "Okay. Here we go! You got this. Elsa.",
    commentary:
      "Here we go!는 뭔가 흥분되거나 위험한 일을 시작할 때 외치는 말이에요. You got this.는 (이 일은 네게 어렵지 않으니/너는 준비되었으니) '잘할 수 있다'는 뜻으로 쓰는 표현이고요.",
    time: 60,
    bookmark: false,
  },
];

const cardVariants = {
  invisible: {
    x: -500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
};

export default function Quiz() {
  const setShowNavBar = useSetRecoilState(showNavBarState);
  const [submit, setSubmit] = useState(false);
  const [time, setTime] = useState(20);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout>();
  const [visible, setVisible] = useState(0);
  const onClick = () => {
    setSubmit((current) => !current);
  };
  useEffect(() => {
    setTimeInterval(() =>
      setInterval(() => setTime((current) => current - 1), 1000)
    );
  }, [visible]);
  useEffect(() => {
    if (submit) {
      clearInterval(timeInterval);
    }
  }, [submit]);
  useEffect(() => {
    if (time === 0) {
      setSubmit(() => true);
      clearInterval(timeInterval);
    }
  }, [time]);
  const nextPlease = (quizTime: number) => {
    setVisible((prev) => (prev === quizs.length - 1 ? quizs.length : prev + 1));
    setSubmit(() => false);
    if (visible < quizs.length) {
      setTime(() => quizs[visible + 1].time);
    }
  };
  useEffect(() => setShowNavBar(() => false));
  return (
    <Container mt="5">
      <HStack
        justifyContent={"center"}
        alignItems={"flex-start"}
        w="100%"
        position={"relative"}
      >
        <AnimatePresence>
          {quizs.map((quiz: IQuiz, index: number) =>
            index === visible ? (
              <motion.div
                key={index}
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                }}
                transition={{ duration: 0.5 }}
                variants={cardVariants}
                initial="invisible"
                animate="visible"
                exit="exit"
              >
                <Card>
                  <CardBody>
                    <HStack justifyContent={"space-between"}>
                      <HStack>
                        <FaRegClock />
                        <Text>{time}</Text>
                      </HStack>
                      {quiz.bookmark ? (
                        <FaHeart fontSize={"20"} />
                      ) : (
                        <FaRegHeart fontSize={"20"} />
                      )}
                    </HStack>
                    <Stack divider={<StackDivider />}>
                      <Box>
                        <Heading mb="3" textAlign={"center"}>
                          Question
                        </Heading>
                        <Text fontSize={"md"}>{quiz.question}</Text>
                      </Box>
                      <Box>
                        <Textarea placeholder="Answer"></Textarea>
                      </Box>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <VStack w="100%">
                      <Button onClick={onClick} colorScheme="blue" w="100%">
                        정답 확인
                      </Button>
                      {submit ? (
                        <Stack w="100%" divider={<StackDivider />}>
                          <Box mt="5">
                            <Text textAlign={"center"}>답</Text>
                            <Text>{quiz.answer}</Text>
                          </Box>
                          <Box mt="5">
                            <Text textAlign={"center"}>해설</Text>
                            <Text>{quiz.commentary}</Text>
                          </Box>
                          <HStack w="100%" my="5">
                            <Button
                              variant={"solid"}
                              colorScheme="green"
                              w="100%"
                              onClick={() => nextPlease(quiz.time)}
                            >
                              정답!
                            </Button>
                            <Button colorScheme="red" w="100%">
                              재시험 보기!
                            </Button>
                          </HStack>
                        </Stack>
                      ) : null}
                    </VStack>
                  </CardFooter>
                </Card>
                <Box h="60px"></Box>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </HStack>
    </Container>
  );
}
