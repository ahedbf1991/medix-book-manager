import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Button, TextField, Stack, Box } from "@mui/material";
import { editBook } from "../services/thunks";
import { selectBooks } from "../services/selectors";

const BookView = ({ editBook, books }) => {
  let { id } = useParams();
  let history = useHistory();
  const [currentBook, setCurrentBook] = useState(books[id] || undefined);

  const renderBookDetails = () => {
    if (currentBook) {
      return (
        <div className="bookshelf">
          <Box fullWidth sx={{ columnGap: 3, rowGap: 2, display: "grid" }}>
            <div>ID: {currentBook.key}</div>
            <TextField
              id="outlined-adornment-amount"
              value={currentBook.title}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, title: e.target.value })
              }
              label="Title"
            />
            <TextField
              id="outlined-adornment-amount"
              value={currentBook.publishers}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, publishers: e.target.value })
              }
              label="Author"
            />
            <TextField
              id="outlined-adornment-amount"
              value={currentBook.publish_date}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, publish_date: e.target.value })
              }
              label="Published"
            />
            <TextField
              id="outlined-adornment-amount"
              value={currentBook.subjects}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, subjects: e.target.value })
              }
              multiline
              label="Description"
            />
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                onClick={async () => {
                  await editBook(currentBook, id);
                  await history.goBack();
                }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </div>
      );
    }
    return null;
  };

  return (
    <StyledBookContainer>
      <StyledBookDetails>
        <div className="list-books">
          <div className="list-books-title">
            <h1>EDIT BOOK</h1>
          </div>
          <div className="list-books-content">{renderBookDetails()}</div>
        </div>
      </StyledBookDetails>
    </StyledBookContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks(),
});

const mapDispatchToProps = (dispatch: ReduxDispatch) =>
  bindActionCreators({ editBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookView);

const StyledBookContainer = styled.div`
  margin: 1rem;
`;

const StyledBookDetails = styled.div`
  display: flex;
  margin: 1rem 0;
  img {
    width: 230px;
    border: 1px solid #ccc;
  }
  ul {
    margin: 0;
    padding: 0 1rem;
    list-style: none;
  }
`;
