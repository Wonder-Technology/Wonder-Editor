let component = ReasonReact.statelessComponent("MainEditorInspector");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) =>
    <div key="inspector" className="inspector-component">
      <MainEditorTransform store dispatch />
    </div>
};