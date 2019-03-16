open Wonderjs;

type state = {
  drawMode: Js.Typed_array.Uint8Array.elt,
  meshRenderer: GameObjectPrimitiveType.gameObject,
};

type action =
  | ChangeMode(Js.Typed_array.Uint8Array.elt);

module Method = {
  let changeMode = MeshRendererChangeModeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("MainEditorMeshRenderer");

let reducer = ((uiState, dispatchFunc), action, state) =>
  switch (action) {
  | ChangeMode(value) =>
    ReasonReactUtils.updateWithSideEffects({...state, drawMode: value}, state =>
      Method.changeMode(
        (uiState, dispatchFunc),
        state.meshRenderer,
        state.drawMode,
      )
    )
  };

let render =
    ((uiState, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorMeshRenderer" className="wonder-mesh-renderer">
    <Select
      label="Draw Mode"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "draw-mode-describe",
          languageType,
        )
      }
      options={MainEditorMeshRendererUtils.getDrawModeOptions()}
      selectedKey={state.drawMode}
      onChange={value => send(ChangeMode(value))}
    />
  </article>;
};

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    let engineState = StateEngineService.unsafeGetState();
    let meshRenderer =
      (
        StateEditorService.getState()
        |> SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
      )
      ->(
          GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
            engineState,
          )
        );
    {
      meshRenderer,
      drawMode:
        engineState |> MeshRendererEngineService.getDrawMode(meshRenderer),
    };
  },
  reducer: reducer((uiState, dispatchFunc)),
  render: self => render((uiState, dispatchFunc), self),
};