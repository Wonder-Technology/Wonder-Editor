open EditorStateDataTypeEdit;

let getState = (data) => data.state;

let setState = (data, state) => {
  data.state = state;
  state
};