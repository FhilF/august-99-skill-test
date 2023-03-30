import React, { useEffect, useState } from "react";
import ItemContainer from "./components/ItemContainer";
import Spinner from "./components/Spinner/Spinner";
import axios from "axios";
import { Box, Stack, TextInput, Text, Group } from "@mantine/core";

import "./App.scss";

function App() {
  const [launches, setLaunches] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const noOfItems = 15;

  const fetchData = (page) => {
    const newItems = [];
    setIsFetching(true);
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((res) => {
        const items = res.data;
        for (
          let i = launches.length;
          i <
          (items.length > launches.length + noOfItems
            ? launches.length + noOfItems
            : items.length);
          i++
        ) {
          newItems.push(items[i]);
        }
        const newLaunches = [...launches, ...newItems];
        if (items.length > newLaunches.length) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setLaunches(newLaunches);
        setIsPageLoading(false);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsPageLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    console.log(launches);
  }, [launches]);

  useEffect(() => {
    if (hasMore) {
      fetchData();
    }
  }, [page]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [launches]);

  return (
    <Box className="app">
      {isPageLoading ? (
        <Box className="page-spinner-container">
          <Spinner />
        </Box>
      ) : (
        <Box className="content">
          {/* <TextInput /> */}
          <Stack spacing="sm" mt="xl">
            {launches.map((v, i) => {
              return <ItemContainer item={v} key={v.mission_name} />;
            })}

            {isFetching && (
              <Box>
                <Spinner />
                <Group position="center">
                <Text>Fetching more data...</Text></Group>
              </Box>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default App;
