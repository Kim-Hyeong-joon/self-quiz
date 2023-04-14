import {
  Button,
  Container,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaBell,
  FaCalendarCheck,
  FaHome,
  FaListAlt,
  FaListUl,
  FaPlus,
  FaRegBell,
  FaRegCalendarCheck,
  FaRegListAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ReminderModal from "./ReminderModal";
import QuizSetModal from "./QuizSetModal";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [currentIcon, setCurrentIcon] = useState("home");
  const location = useLocation();
  const {
    isOpen: isReminderOpen,
    onOpen: onReminderOpen,
    onClose: onReminderClose,
  } = useDisclosure();
  const {
    isOpen: isQuizSetOpen,
    onOpen: onQuizSetOpen,
    onClose: onQuizSetClose,
  } = useDisclosure();
  const bg = useColorModeValue("white", "#1A202C");
  const color = useColorModeValue("#1A202C", "gray.100");
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setCurrentIcon("home");
        break;
      case "/quizzes/reminders":
        setCurrentIcon("reminders");
        break;
      case "/quizzes/my-quizzes":
        setCurrentIcon("my-quizzes");
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <Stack h="100px"></Stack>
      <HStack
        position={"fixed"}
        bottom="0"
        w="100%"
        bgColor={bg}
        borderTop="1px"
        borderColor={"blackAlpha.100"}
      >
        <Container maxW={"container.md"}>
          <Grid
            templateColumns={"repeat(4, 1fr)"}
            w="100%"
            py="1.5"
            fontSize={"2xl"}
            bgColor={bg}
            color={color}
          >
            <HStack justifyContent={"center"}>
              <Link to="quizzes/reminders">
                {currentIcon === "reminders" ? <FaBell /> : <FaRegBell />}
              </Link>
            </HStack>
            <HStack justifyContent={"center"}>
              <Link to="/">
                {currentIcon === "home" ? (
                  <FaCalendarCheck />
                ) : (
                  <FaRegCalendarCheck />
                )}
              </Link>
            </HStack>
            <HStack justifyContent={"center"}>
              <Link to="/quizzes/my-quizzes">
                {currentIcon === "my-quizzes" ? (
                  <FaListAlt />
                ) : (
                  <FaRegListAlt />
                )}
              </Link>
            </HStack>
            <HStack justifyContent={"center"}>
              <Menu>
                <MenuButton as={Button} variant={"ghost"}>
                  <HStack>
                    <FaPlus />
                  </HStack>
                </MenuButton>
                <MenuList fontSize={"16px"}>
                  <MenuItem onClick={onReminderOpen}>리마인더</MenuItem>
                  <MenuItem onClick={onQuizSetOpen}>퀴즈셋</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Grid>
          <ReminderModal isOpen={isReminderOpen} onClose={onReminderClose} />
          <QuizSetModal isOpen={isQuizSetOpen} onClose={onQuizSetClose} />
        </Container>
      </HStack>
    </>
  );
}
