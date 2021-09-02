import { Input, List, ListIcon, ListItem, Box, Button } from "@chakra-ui/react";
import { HiHashtag, HiSearch } from "react-icons/hi";

import "./styles.css";

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
      {/* <header>
        <HiSearch />
        <Input placeholder="procurar assunto" />
      </header> */}
      {/* <div className="filters">
            <Select placeholder="tema">
              <option value={trend.theme}>{trend.theme}</option>
            </Select>
            <Select placeholder="localização">
              <option value={trend.location}>{trend.location}</option>
            </Select>
            <Select placeholder="data">
              <option value={trend.date}>{trend.date}</option>
            </Select>
            <Select placeholder="ranking">
              <option value={trend.ranking}>{trend.ranking}</option>
            </Select>
          </div> */}
      <Box>
        <List className="trends-list">
          {trendind.map((trend) => (
            <Button
              key={trend.id}
              className="topic"
              onClick={() => handleTopicSelection(trend)}
            >
              <ListItem>
                <ListIcon as={HiHashtag} />
                {trend.title}
              </ListItem>
            </Button>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default TrendingTopics;
