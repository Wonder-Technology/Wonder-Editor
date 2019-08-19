open EditorStateDataType;

let editorStateData = {
  editorState: CreateEditorStateEditorService.create(),
  eventEngineState: StateEngineService.createState(),
  isDebug: true,
  isRun: false,
};