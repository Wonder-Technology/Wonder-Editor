open Wonderjs;

type state = {
  drawMode: Js.Typed_array.Uint8Array.elt,
  meshRenderer: GameObjectType.gameObject,
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
    <div className="">
      <Select
        label="draw mode"
        options=(MainEditorMeshRendererUtils.getDrawModeOptions())
        selectedKey=state.drawMode
        onChange=(value => send(ChangeMode(value)))
      />
    </div>
  </article>;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    let engineState = StateEngineService.unsafeGetState();
    let meshRenderer =
      StateEditorService.getState()
      |> SceneEditorService.unsafeGetCurrentSceneTreeNode
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