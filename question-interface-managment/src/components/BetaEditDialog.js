import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Dialog,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import { SettingsContext } from "../contexts/SettingsContext";
import { NewQuestionContext } from "../contexts/NewQuestionContext";
import ToggleGridAreasButton from "./buttons/ToggleGridAreasButton";
import { TitleProperty } from "./QuestionnaireProperties";

const EditDialog = ({ question, open, setOpen }) => {
  const [optionAdded, setOptionAdded] = useState(false);
  const { settings } = useContext(SettingsContext);
  const { dispatch } = useContext(QuestionnaireContext);
  const { newQuestion, newQuestionDispatch } = useContext(NewQuestionContext);

  // load question to editor state on dialog open
  useEffect(() => {
    newQuestionDispatch({ type: "SET_QUESTION", question: { ...question } });
  }, [open, newQuestionDispatch, question]);

  // dispatch action to questionnaireReducer to update question
  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ type: "UPDATE_QUESTION", id: question.id, new: newQuestion });
    setOpen(false);
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { title: "", options: [] }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setOptionAdded(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {/* <ToggleGridAreasButton /> */}
      <form onSubmit={handleSubmit} style={{ padding: "1em" }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          style={{
            padding: "2em",
            background: settings.showGridAreas ? "lightgrey" : "transparent"
          }}
        >
          <DialogHeader question={question} />
          <DialogBody
            optionAdded={optionAdded}
            setOptionAdded={setOptionAdded}
          />
          <DialogFooter handleClose={handleClose} />
        </Grid>
      </form>
    </Dialog>
  );
};

export default EditDialog;

const DialogHeader = ({ question }) => {
  const { settings } = useContext(SettingsContext);
  const { questions } = useContext(QuestionnaireContext);
  const { newQuestion, newQuestionDispatch } = useContext(NewQuestionContext);

  return (
    <Grid
      item
      xs={12}
      style={{
        textAlign: "right",
        background: settings.showGridAreas ? "lightblue" : "transparent",
        opacity: settings.showGridAreas ? 0.9 : 1.0
      }}
    >
      <FormControl>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          autoWidth
          labelId="type-select-label"
          value={newQuestion.type}
          onChange={e =>
            newQuestionDispatch({
              type: "SET_QUESTION",
              question: { ...newQuestion, type: e.target.value }
            })
          }
          style={{ textAlign: "left" }}
        >
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="range">Range</MenuItem>
          <MenuItem value="likert">Likert</MenuItem>
        </Select>
      </FormControl>
      <Grid container="row" justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          style={{
            textAlign: "left",
            background: settings.showGridAreas ? "lightgreen" : "transparent",
            opacity: settings.showGridAreas ? 0.9 : 1.0
          }}
        >
          <Typography variant="h6">
            Question {questions.indexOf(question) + 1}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const DialogBody = ({ optionAdded, setOptionAdded }) => {
  const { settings } = useContext(SettingsContext);
  const { newQuestion, newQuestionDispatch } = useContext(NewQuestionContext);

  // update correct option on text input changes
  const handleChange = (index, event) => {
    let newOptions = [...newQuestion.options];
    newOptions[index] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: newOptions }
    });
  };

  const handleAddOptionClick = event => {
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: [...newQuestion.options, ""] }
    });
    setOptionAdded(true);
  };

  const handleRemoveOptionClick = (index, event) => {
    let newOptions = [...newQuestion.options];
    newOptions.splice(index, 1);
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: newOptions }
    });
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid
        item
        xs={12}
        style={{
          background: settings.showGridAreas ? "lightcoral" : "transparent",
          opacity: settings.showGridAreas ? 0.9 : 1.0
        }}
      >
        <TitleProperty
          newQuestion={newQuestion}
          newQuestionDispatch={newQuestionDispatch}
          style={{ margin: "1em 0" }}
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center", margin: "1em 0 0 0" }}>
        <Button onClick={handleAddOptionClick}>
          add {newQuestion.type === "range" ? "label" : "option"}
        </Button>
      </Grid>
      <Grid item xs style={{ textAlign: "center", margin: "1em 0" }}>
        <Box
          fullWidth
          // height="200px"
          height="200px"
          overflow="scroll"
          style={{ margin: "0", overflowX: "hidden" }}
        >
          {newQuestion.options.map((option, index) => (
            <TextField
              autoFocus={
                optionAdded
                  ? index === newQuestion.options.length - 1
                    ? true
                    : false
                  : false
              }
              style={{ margin: "0.2em 0" }}
              placeholder={
                newQuestion.type === "range"
                  ? `label ${index + 1}`
                  : `option ${index + 1}`
              }
              type="text"
              fullWidth
              value={option}
              onChange={e => handleChange(index, e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" margin="0">
                    <IconButton
                      edge="end"
                      onClick={e => handleRemoveOptionClick(index, e)}
                      style={{ margin: "0", padding: "0" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

const DialogFooter = ({ handleClose }) => {
  const { settings } = useContext(SettingsContext);

  return (
    <>
      <Grid
        item
        xs
        style={{
          margin: "0 0 0.5em 0",
          textAlign: "center",
          background: settings.showGridAreas ? "lightgreen" : "transparent",
          opacity: settings.showGridAreas ? 0.9 : 1.0
        }}
      >
        <Button type="submit">submit</Button>
      </Grid>
      <Grid
        item
        xs
        style={{
          textAlign: "center",
          background: settings.showGridAreas ? "yellow" : "transparent",
          opacity: settings.showGridAreas ? 0.9 : 1.0
        }}
      >
        <Button onClick={handleClose}>cancel</Button>
      </Grid>
    </>
  );
};
