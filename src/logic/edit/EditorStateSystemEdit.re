open EditorStateDataTypeEdit;

let createState = () => {sceneData: MainEditorSceneEdit.initData()};

let getState = (data) => Js.Option.getExn(data.state);

let setState = (data, state) => {
  data.state = Some(state);
  state
};