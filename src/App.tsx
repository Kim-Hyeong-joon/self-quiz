import { ChakraProvider, theme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { RecoilRoot } from "recoil";

export const App = () => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </RecoilRoot>
);
