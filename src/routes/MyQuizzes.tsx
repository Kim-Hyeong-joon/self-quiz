import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Container,
} from "@chakra-ui/react";
import QuizSets from "../components/QuizSets";
import Reminders from "../components/Reminders";
import { atom, useRecoilState } from "recoil";
import { useState } from "react";

export const tapIndexState = atom({
  key: "tapIndexState",
  default: 0,
});

export default function MyQuizzes() {
  const [tapIndex, setTapIndex] = useRecoilState(tapIndexState);
  return (
    <Container maxW="container.md">
      <Heading textAlign={"center"} mb="2">
        나의 퀴즈
      </Heading>
      <Tabs
        variant={"enclosed"}
        defaultIndex={tapIndex}
        onChange={(index) => setTapIndex(() => index)}
      >
        <TabList>
          <Tab>리마인더</Tab>
          <Tab>퀴즈셋</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Reminders />
          </TabPanel>
          <TabPanel>
            <QuizSets />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
