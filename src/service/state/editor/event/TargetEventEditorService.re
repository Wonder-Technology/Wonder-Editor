open EditorType;

let getEventTarget = ({eventRecord} as editorState) =>
  eventRecord.eventTarget;

let setEventTarget = (eventTarget, {eventRecord} as editorState) => {
  ...editorState,
  eventRecord: {
    ...eventRecord,
    eventTarget,
  },
};