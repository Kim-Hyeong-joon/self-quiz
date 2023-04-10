import { Box, Grid, HStack, Heading, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

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
      <Text justifySelf={"center"}>Self Quiz</Text>
      <ColorModeSwitcher justifySelf={"end"} />
    </Grid>
  );
}
