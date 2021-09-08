import { Input, List, ListIcon, ListItem, Box, Select } from "@chakra-ui/react";
import { HiHashtag, HiSearch } from "react-icons/hi";

import "./styles.scss";

const TrendingTopics = ({ handleKitData }) => {
  const trendind = [
    {
      id: 1,
      title: "twitter no strateegia",
      date: "01/09/2021",
      theme: "tech",
      location: "Brazil",
      ranking: 19,
    },
    {
      id: 2,
      title: "eleições 2022",
      date: "02/12/2035",
      theme: "news",
      location: "Brazil",
      ranking: 10,
    },
    {
      id: 3,
      title: "carnaval 2022",
      date: "10/11/2021",
      theme: "social events",
      location: "Brazil",
      ranking: 3,
    },
  ];

  const handleTopicSelection = (topic) => {
    handleKitData(topic);
  };

  return (
    <div className="trending-topics-container">
      <header>
        <HiSearch size={20} />
        <Input placeholder="procurar assunto" />
      </header>
      <Box className="trends-wrapper">
        <List className="trends-list">
          {trendind.map((trend) => (
            <ListItem
              key={trend.id}
              className="topic"
              onClick={() => handleTopicSelection(trend)}
            >
              <ListIcon as={HiHashtag} />
              {trend.title}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default TrendingTopics;
