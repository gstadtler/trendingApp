import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Input, Box, CircularProgress } from "@chakra-ui/react";
import { fetchTrendingTopics } from "../../services/trending_server";
import {
  Pagination,
  PaginationContainer,
  PaginationSeparator,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
} from "@ajna/pagination";

import "./styles.scss";
import TrendsListItem from "../TrendsListItem";

const TrendsList = ({ handleKitData }) => {
  const [trends, setTrends] = useState([]);
  // const [trendsLocation, setTrendsLocation] = useState({});
  const [searchInput, setSearchInput] = useState("");

  const trendsOuterLimit = 2;
  const trendsInnerLimit = 2;

  const {
    pages,
    pagesCount,
    // offset,
    currentPage,
    setCurrentPage,
    // setIsDisabled,
    isDisabled,
    pageSize,
    // setPageSize,
  } = usePagination({
    total: trends.length,
    limits: {
      outer: trendsOuterLimit,
      inner: trendsInnerLimit,
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1,
    },
  });

  //fetch trending topics
  useEffect(() => {
    fetchTrendingTopics().then((data) => {
      setTrends(data[0].trends);
    });
  }, []);

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  return (
    <>
      {trends.length ? (
        <div className="trending-topics-container">
          <header>
            <HiSearch size={20} />
            <Input
              placeholder="procurar assunto"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </header>
          <Box className="trends-wrapper">
            <TrendsListItem
              items={trends}
              curPage={currentPage - 1}
              trendsLimit={pageSize}
              handleKitData={handleKitData}
              searchQuery={searchInput}
            />
          </Box>
          <div className="pagination-ctrl">
            <Pagination
              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={isDisabled}
              onPageChange={handlePageChange}
            >
              <PaginationContainer
                align="center"
                justify="space-between"
                p={4}
                w="full"
              >
                <PaginationPrevious
                  _hover={{
                    opacity: "75%",
                  }}
                  border="1px solid #000"
                  onClick={() =>
                    console.log(
                      "Im executing my own function along with Previous component functionality"
                    )
                  }
                >
                  <GrFormPrevious size={20} />
                </PaginationPrevious>
                <PaginationPageGroup
                  isInline
                  align="center"
                  separator={
                    <PaginationSeparator
                      onClick={() =>
                        console.log(
                          "Im executing my own function along with Separator component functionality"
                        )
                      }
                      border="1px solid"
                      fontSize="sm"
                      w={7}
                      jumpSize={5}
                    />
                  }
                >
                  {pages.map((page) => (
                    <PaginationPage
                      w={7}
                      border="none"
                      key={`pagination_page_${page}`}
                      page={page}
                      onClick={() =>
                        console.log(
                          "Im executing my own function along with Page component functionality"
                        )
                      }
                      fontSize="sm"
                      _hover={{
                        bg: "#dc0362",
                      }}
                      _current={{
                        bg: "#dc0362",
                        color: "#fff",
                        fontSize: "sm",
                        w: 7,
                      }}
                    />
                  ))}
                </PaginationPageGroup>
                <PaginationNext
                  _hover={{
                    opacity: "75%",
                  }}
                  border="none"
                  onClick={() =>
                    console.log(
                      "Im executing my own function along with Next component functionality"
                    )
                  }
                >
                  <GrFormNext size={20} />
                </PaginationNext>
              </PaginationContainer>
            </Pagination>
          </div>
        </div>
      ) : (
        <CircularProgress
          color="#563a8e"
          isIndeterminate
          className="loading-trends"
        />
      )}
    </>
  );
};

export default TrendsList;
