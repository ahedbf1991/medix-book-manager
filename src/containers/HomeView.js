import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { addNewBook } from "../services/thunks";
import { selectBooks } from "../services/selectors";

import styled from "styled-components";

const HomeView = ({ addNewBook, books }) => {
  const [fetchError, setFetchError] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [sort, setSort] = useState(true);
  const history = useHistory();

  const fetchBook = () => {
    fetch(`https://openlibrary.org/books/${textSearch}.json`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          setFetchError(response.error);
        } else {
          const { title, publish_date, subjects, publishers, key } = response;
          setFetchError("");
          addNewBook({
            title,
            publish_date,
            subjects: subjects[0],
            publishers: publishers[0],
            key,
          });
        }
      })
      .catch((e) => {
        setFetchError("There was an error while performing this search.");
      });
  };

  return (
    <>
      <StyledContainer>
        <div className="list-books">
          <div className="list-books-title">
            <h1>BOOK MANAGER</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <Stack spacing={3} direction="row">
                  <TextField
                    error={fetchError ? true : false}
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    label="Add a book by Open Library ID Number"
                    helperText={fetchError}
                    placeholder="OLID"
                  />
                  <Button variant="outlined" onClick={fetchBook}>
                    Add
                  </Button>
                  <Box>
                    <InputLabel>Sort order</InputLabel>
                    <Select
                      value={sort}
                      label="Sort order"
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <MenuItem value={true}>Descending</MenuItem>
                      <MenuItem value={false}>Ascending</MenuItem>
                    </Select>
                  </Box>
                </Stack>
                <div className="bookshelf-books">
                  <Paper style={{ maxHeight: 700, overflow: "auto" }}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {books
                        .sort((a, b) =>
                          sort
                            ? a.title < b.title
                              ? 1
                              : -1
                            : a.title > b.title
                            ? 1
                            : -1
                        )
                        .map((book, index) => {
                          return (
                            <>
                              <ListItem
                                alignItems="flex-start"
                                onClick={() => history.push(`/books/${index}`)}
                              >
                                <ListItemText
                                  primary={`${book.title} (${book.publish_date})   ${book.publishers}`}
                                  secondary={
                                    <React.Fragment>
                                      {book.subjects}
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </>
                          );
                        })}
                    </List>
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledContainer>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks(),
});

const mapDispatchToProps = (dispatch: ReduxDispatch) =>
  bindActionCreators({ addNewBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

const StyledContainer = styled.div`
  margin: 0 1rem 1rem;
  .pagination {
    display: inline-block;
    padding: 0;
    li {
      display: inline-block;
      margin: 0 1rem;
      a {
        cursor: pointer;
        outline: none;
      }
      &:first-child {
        margin: 0;
      }
      &.disabled {
        opacity: 0.6;
      }
      &.active {
        font-weight: bold;
      }
    }
  }
`;
