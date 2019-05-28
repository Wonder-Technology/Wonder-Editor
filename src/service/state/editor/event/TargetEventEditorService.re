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

let getInspectorEventTarget = ({eventRecord} as editorState) =>
  eventRecord.inspectorEventTarget;

let setInspectorEventTarget =
    (inspectorEventTarget, {eventRecord} as editorState) => {
  ...editorState,
  eventRecord: {
    ...eventRecord,
    inspectorEventTarget,
  },
};