import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const App = () => (
  <ChakraProvider theme={theme}>
    <h1>hello</h1>
  </ChakraProvider>
);

{
  /* <ColorModeSwitcher justifySelf="flex-end" /> */
}
