import { Box, Grid, HStack, Heading, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Grid
      templateColumns={"repeat(3, 1fr)"}
      justifyContent={"flex-end"}
      px="5"
      py="1"
      alignItems={"center"}
    >
      <Box justifySelf={"start"} />
      <Box justifySelf={"center"}>
        <Link to="/">
          <Text>Self Quiz</Text>
        </Link>
      </Box>
      <ColorModeSwitcher justifySelf={"end"} />
    </Grid>
  );
}
