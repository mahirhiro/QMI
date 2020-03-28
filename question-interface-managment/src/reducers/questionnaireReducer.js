import uuid from "uuid/v1";

const reorder = (list, startIndex, endIndex) => {
  let newList = list.slice(0, list.length);
  const [removed] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, removed);
  return newList;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  let newDestination = destination.slice(0, destination.length);
  const item = source[droppableSource.index];
  newDestination.splice(droppableDestination.index, 0, {
    id: uuid(),
    type: item.label,
    title: `untitled ${item.label}`,
    options: ["option1", "option2", "option3", "option4"]
  });
  return newDestination;
};

const QUESTION_TYPES = [
  { id: uuid(), label: "checkbox" },
  { id: uuid(), label: "radio" },
  { id: uuid(), label: "likert" },
  { id: uuid(), label: "range" },
  { id: uuid(), label: "raw" },
  { id: uuid(), label: "textarea" },
  { id: uuid(), label: "textfield" },
  { id: uuid(), label: "number" },
  { id: uuid(), label: "expandable" },
  { id: uuid(), label: "time" },
  { id: uuid(), label: "date" },
  { id: uuid(), label: "unsubscribed" },
  { id: uuid(), label: "dropdown" },
  { id: uuid(), label: "drawing" }
];

export const questionnaireReducer = (state, action) => {
  switch (action.type) {
    case "REORDER":
      return reorder(state, action.source.index, action.destination.index);
    case "CLONE":
      return copy(QUESTION_TYPES, state, action.source, action.destination);
    case "SET_QUESTIONS":
      return action.questions;
    case "ADD_QUESTION":
      const uniq = uuid();
      return [
        ...state,
        {
          id: uniq,
          type: action.questionType.toLowerCase(),
          title: "untitled " + action.questionType,
          options: ["option 1", "option 2", "option 3", "option 4"]
        }
      ];
    case "REMOVE_QUESTION":
      return state.filter(question => question.id !== action.id);
    case "UPDATE_QUESTION":
      return state.map(question =>
        question.id === action.id ? action.new : question
      );
    default:
      return state;
  }
};
