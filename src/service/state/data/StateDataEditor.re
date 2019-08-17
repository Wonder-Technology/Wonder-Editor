open EditorStateDataType;

let editorStateData = {
  editorState: CreateEditorStateEditorService.create(),
  eventEngineState: Wonderjs.StateAPI.createState(),
  isDebug: true,
  isRun: false,
};