import React, { useEffect, useState } from "react";
import ItemContainer from "./components/ItemContainer";
import Spinner from "./components/Spinner/Spinner";
import axios from "axios";
import { Box, Stack, TextInput } from "@mantine/core";

import "./App.scss";

function App() {
  const [launches, setLaunches] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  
  useEffect(() => {
    setIsPageLoading(true)
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((res) => {
        setLaunches(res.data);
        setIsPageLoading(false)
      })
      .catch((err) => {
        setIsPageLoading(false)
      });
  }, []);

  return (
    <Box className="app">
      {isPageLoading ? (
        <Box className="page-spinner-container">
          <Spinner />
        </Box>
      ) : (
        <Box className="content">
          <TextInput />
          <Stack spacing="sm" mt="xl">
            {launches.map((v, i) => {
              return <ItemContainer item={v} key={v.mission_name} />;
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default App;
