import {
  Box,
  DarkMode,
  Grid,
  HStack,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { FaArrowAltCircleUp, FaBell, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Grid
      templateColumns={"repeat(3, 1fr)"}
      position={"fixed"}
      bottom="0"
      w="100%"
      px="5"
      py="3"
      fontSize={"2xl"}
      bgColor={"#1A202C"}
      color={"white"}
    >
      <HStack justifyContent={"flex-start"}>
        <Link to="quizs/reminder">
          <FaBell />
        </Link>
      </HStack>
      <HStack justifyContent={"center"}>
        <Link to="/">
          <FaHome />
        </Link>
      </HStack>
      <HStack justifyContent={"flex-end"}>
        <Link to="quizs/upload">
          <FaArrowAltCircleUp />
        </Link>
      </HStack>
    </Grid>
  );
}
