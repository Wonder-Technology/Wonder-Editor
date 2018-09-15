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

let getPointDownEventName = () => "wd_editor_pointdown";

let getPointUpEventName = () => "wd_editor_pointup";

let getPointTapEventName = () => "wd_editor_pointtap";

let getPointMoveEventName = () => "wd_editor_pointmove";

let getPointScaleEventName = () => "wd_editor_pointscale";

let getPointDragEventName = () => "wd_editor_pointdrag";

/* let get */