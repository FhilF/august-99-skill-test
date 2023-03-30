import {
  Badge,
  Box,
  Button,
  Collapse,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Flex,
} from "@mantine/core";
import moment from "moment/moment";
import React, { useState } from "react";

function ItemContainer(props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Paper shadow="xs" p="md">
      <Stack spacing="sm">
        <Group position="apart">
          <Text weight={600}>{item.mission_name}</Text>
          {item.upcoming ? (
            <Badge>Upcoming</Badge>
          ) : item.launch_success ? (
            <Badge color="teal">Success</Badge>
          ) : (
            <Badge color="red">Failed</Badge>
          )}
        </Group>
        <Collapse in={isOpen}>
          <Stack>
            <Group spacing={4}>
              <Text size="xs" sx={{ color: "gray" }}>
                {`${moment().diff(item.launch_date_utc, "years")} years ago`}
              </Text>

              {item.links.article_link && (
                <Group spacing={4}>
                  <Text size="xs" sx={{ color: "gray" }}>
                    |
                  </Text>
                  <a
                    className="link"
                    href={item.links.article_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Article
                  </a>
                </Group>
              )}

              {item.links.video_link && (
                <Group spacing={4}>
                  <Text size="xs" sx={{ color: "gray" }}>
                    |
                  </Text>
                  <a
                    className="link"
                    href={item.links.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video
                  </a>
                </Group>
              )}
            </Group>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "60px" }}>
                <Image
                  width={60}
                  height={60}
                  src={item.links.mission_patch_small}
                ></Image>
              </Box>
              <Box sx={{ flex: 1 }} ml="md">
                <Text size="sm">{item.details}</Text>
              </Box>
            </Box>
          </Stack>
        </Collapse>
        <Box>
          <Button
            onClick={() => {
              setIsOpen((prevState) => !prevState);
            }}
          >
            View
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default ItemContainer;
