let component = ReasonReact.statelessComponent("MainEditorInspector");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) =>
    <div key="inspector" className="inspector-component">
      <MainEditorInspectorTransform states=state dispatch />
    </div>
};