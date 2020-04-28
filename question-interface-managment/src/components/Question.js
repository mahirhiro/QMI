import React, {useContext, useState} from "react";
import {
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";
import {SettingsContext} from "../contexts/SettingsContext";
import RemoveQuestionButton from "./buttons/RemoveQuestionButton";
import EditQuestionButton from "./buttons/EditQuestionButton";
import RadioCheckboxPreview from "./previews/RadioCheckboxPreview";
import LikertPreview from "./previews/LikertPreview";
import RangePreview from "./previews/RangePreview";
import DropdownPreview from "./previews/DropdownPreview";
import NumberPreview from "./previews/NumberPreview";
import DatePickerPreview from "./previews/DatePickerPreview";
import TimePickerPreview from "./previews/TimePickerPreview";
import TextArea from "./previews/TextArea";
import TextFieldPreview from "./previews/TextFieldPreview";
import DrawingPreview from "./previews/DrawingPreview";
import {Draggable} from "react-beautiful-dnd";
import "./index.css";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import RawPreview from "./previews/RawPreview";
import EditQuestionTitleField from "./EditDialogTitle";
import DuplicateQuestionButton from "./buttons/DuplicateQuestionButton";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";

const Question = ({ index, question, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <Draggable key={question.id} draggableId={question.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
        >
          <ExpansionPanel expanded={open} {...props}>
            <Summary
                onClick={() => {
                    if(question.type !== "raw") {
                        setOpen(!open)
                    }
                }}
              question={question}
              provided={provided}
            />
            <Divider />
            <Details question={question} index={index} />
          </ExpansionPanel>
        </div>
      )}
    </Draggable>
  );
};





const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default Question;

const Summary = ({ question, provided, ...props }) => {
  const { settings } = useContext(SettingsContext);
  const { questions } = useContext(QuestionnaireContext);
  const [editTitle, setEditTitle] = useState(false);

  const HiddenQuestionIndicator = () => {
    return question.hidden ?
      <Tooltip title="This question will be hidden from the user.">
        <IconButton aria-label="This question will be hidden from the user">
          <VisibilityOffIcon/>
        </IconButton>
      </Tooltip>
      : null
  }


  const SmallLeftGridItem = ({...props}) =>{
    return <Grid
      item
      xs
      style={{
        textAlign: "left",
        background: settings.showGridAreas ? "lightgreen" : "transparent",
        opacity: settings.showGridAreas ? "0.8" : "1.0",
      }}
      {...props}
    >
      {props.children}
    </Grid>

  }

  // For some reason, this does not make double clicking work
  const QuestionTitle = () => {
    return editTitle ? (
        <EditQuestionTitleField
          question={question}
          onComplete={() => setEditTitle(false)}
        />
      ) : (
        <Typography onDoubleClick={() => setEditTitle(true)} variant="h5">
          {question.type === "raw" ? question.content : question.title}
        </Typography>
      )
  }


  const ExpandMoreGridItem = () => {
    return <Grid
      item
      xs
      style={{
        textAlign: "right",
        background: settings.showGridAreas ? "lightcoral" : "transparent",
        opacity: settings.showGridAreas ? "0.8" : "1.0",
      }}
    >
      <ExpandMoreIcon />
    </Grid>
  }

  return (
    <ExpansionPanelSummary {...props}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{
          background: settings.showGridAreas ? "lightgrey" : "transparent",
          opacity: settings.showGridAreas ? "0.8" : "1.0",
        }}
      >

        <SmallLeftGridItem  {...provided.dragHandleProps} >
          <DragHandleIcon />
        </SmallLeftGridItem>

        <SmallLeftGridItem>
          <Typography variant="h5">
            {questions.indexOf(question) + 1}
          </Typography>
        </SmallLeftGridItem>

        <Grid
          item
          xs={8}
          style={{
            textAlign: "left",
            wordWrap: "break-word",
            wordBreak: "break-word",
            background: settings.showGridAreas ? "lightblue" : "transparent",
            opacity: settings.showGridAreas ? "0.8" : "1.0",
          }}
        >
          {editTitle ? (
            <EditQuestionTitleField
              question={question}
              onComplete={() => setEditTitle(false)}
            />
          ) : (
            <Typography onDoubleClick={() => setEditTitle(true)} variant="h5">
              {question.type === "raw" ? question.content : question.title}
            </Typography>
          )}

        </Grid>


        <ExpandMoreGridItem/>

      </Grid>
      <HiddenQuestionIndicator/>
    </ExpansionPanelSummary>
  );
};

const Details = ({ question, index }) => {
  const { settings } = useContext(SettingsContext);

  return (
    <ExpansionPanelDetails>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={1}
        style={{
          background: settings.showGridAreas ? "lightgrey" : "transparent",
          opacity: settings.showGridAreas ? "0.8" : "1.0"
        }}
      >
        <Grid
          item
          xs
          style={{
            textAlign: "center",
            background: settings.showGridAreas ? "lightgreen" : "transparent",
            opacity: settings.showGridAreas ? "0.8" : "1.0"
          }}
        >
          <Typography variant="caption">
            {/* {`${question.type} options preview`.toUpperCase()} */}
            {question.type.toUpperCase()}
          </Typography>
        </Grid>
        <Grid
          item
          xs
          style={{
            textAlign: "center",
            background: settings.showGridAreas ? "lightblue" : "transparent",
            opacity: settings.showGridAreas ? "0.8" : "1.0"
          }}
        >
          {(() => {
            switch (question.type) {
              case "radio":
              case "checkbox":
                return <RadioCheckboxPreview question={question} />;
              case "likert":
                return <LikertPreview question={question} />;
              case "range":
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <RangePreview question={question} />
                  </div>
                );
              case "dropdown":
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <DropdownPreview question={question} />
                  </div>
                );
              case "textarea":
                return (
                  <div style={style}>
                    <TextArea question={question} />
                  </div>
                );
              case "number":
                return <NumberPreview question={question} />;
              case "date":
                return <DatePickerPreview question={question} />;
              case "time":
                return <TimePickerPreview question={question} />;
              case "textfield":
                return <TextFieldPreview question={question} />;
              case "drawing":
                return (
                  <div style={style}>
                    <DrawingPreview question={question} />
                  </div>
                );
              case "raw":
                return <RawPreview question={question} />;
              default:
                return <RadioCheckboxPreview question={question} />;
            }
          })()}
        </Grid>
        <Grid
          item
          xs
          style={{
            textAlign: "center",
            background: settings.showGridAreas ? "lightcoral" : "transparent",
            opacity: settings.showGridAreas ? "0.8" : "1.0"
          }}
        >

            {(() => {
                switch (question.type) {
                    case "raw":
                        return;

                    default:
                        return (
                            <div>
                                <RemoveQuestionButton question={question} />
                                <EditQuestionButton question={question} index={index} />
                                <DuplicateQuestionButton question={question} index={index} />
                            </div>
                        )

                }
            })()}

          {/*<RemoveQuestionButton question={question} />*/}
          {/*<EditQuestionButton question={question} index={index} />*/}
          {/*<DuplicateQuestionButton question={question} index={index} />*/}
        </Grid>
      </Grid>
    </ExpansionPanelDetails>
  );
};
