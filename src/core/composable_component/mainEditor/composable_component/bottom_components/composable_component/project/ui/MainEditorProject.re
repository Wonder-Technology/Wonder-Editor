type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorProject");

let render = ((uiState, dispatchFunc), _self) =>
  <article key="MainEditorProject" className="wonder-bottom-project">
    <MainEditorAsset uiState dispatchFunc />
  </article>;

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.Project);

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(uiState),
  },
  shouldUpdate,
  render: self => render((uiState, dispatchFunc), self),
};