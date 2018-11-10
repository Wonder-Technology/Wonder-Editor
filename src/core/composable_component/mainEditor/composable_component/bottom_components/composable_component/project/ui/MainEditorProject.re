type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorProject");

let render = ((store, dispatchFunc), _self) =>
  <article key="MainEditorProject" className="wonder-project-component">
    <MainEditorAsset store dispatchFunc />
  </article>;

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.Project);

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), self),
};