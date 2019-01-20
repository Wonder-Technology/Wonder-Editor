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

let reducer = ((store, dispatchFunc), action, state) =>
  switch (action) {
  | ChangeMode(value) =>
    ReasonReactUtils.updateWithSideEffects({...state, drawMode: value}, state =>
      Method.changeMode(
        (store, dispatchFunc),
        state.meshRenderer,
        state.drawMode,
      )
    )
  };

let render =
    ((store, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="MainEditorMeshRenderer" className="wonder-mesh-renderer">
    <Select
      label="Draw mode"
      options=(MainEditorMeshRendererUtils.getDrawModeOptions())
      selectedKey=state.drawMode
      onChange=(value => send(ChangeMode(value)))
    />
  </article>;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    let engineState = StateEngineService.unsafeGetState();
    let meshRenderer =
      StateEditorService.getState()
      |> SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
      |. GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
           engineState,
         );
    {
      meshRenderer,
      drawMode:
        engineState |> MeshRendererEngineService.getDrawMode(meshRenderer),
    };
  },
  reducer: reducer((store, dispatchFunc)),
  render: self => render((store, dispatchFunc), self),
};