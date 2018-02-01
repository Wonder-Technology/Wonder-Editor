type retainedProps = {color: string};

module Method = {
  let change = (value) => WonderLog.Log.print(value) |> ignore;
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorMaterial");

let render = (store, dispatch, materialComponent, self: ReasonReact.self('a, 'b, 'c)) =>
  <article className="transform-component">
    <StringInput defaultValue=self.retainedProps.color label="color" onBlur=Method.change />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, ~materialComponent, _children) => {
  ...component,
  retainedProps: {color: "#ffffff"},
  shouldUpdate,
  render: (self) => render(store, dispatch, materialComponent, self)
};