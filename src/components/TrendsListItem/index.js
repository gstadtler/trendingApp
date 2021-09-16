import { useState, useEffect } from "react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { HiHashtag } from "react-icons/hi";

import "./styles.scss";

const TrendsListItem = ({
  items,
  curPage,
  trendsLimit,
  handleKitData,
  searchQuery,
}) => {
  const [curItems, setCurItems] = useState([]);

  useEffect(() => {
    const offset = curPage * trendsLimit;
    const getList = (curPage, trendsLimit) => {
      setCurItems(items.slice(offset, offset + trendsLimit));
    };

    getList(curPage, trendsLimit);
  }, [curPage, trendsLimit, items]);

  return (
    <>
      {searchQuery ? (
        <List className="trends-list">
          {items &&
            items
              .filter((element) => {
                if (
                  element.name.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return element;
                }
              })
              .map((item) => (
                <ListItem
                  key={item.name}
                  className="topic"
                  onClick={() => handleKitData(item)}
                >
                  <ListIcon as={HiHashtag} />
                  {item.name}
                </ListItem>
              ))}
        </List>
      ) : (
        <List className="trends-list">
          {curItems &&
            curItems.map((item) => (
              <ListItem
                key={item.name}
                className="topic"
                onClick={() => handleKitData(item)}
              >
                <ListIcon as={HiHashtag} />
                {item.name}
              </ListItem>
            ))}
        </List>
      )}
    </>
  );
};

export default TrendsListItem;
