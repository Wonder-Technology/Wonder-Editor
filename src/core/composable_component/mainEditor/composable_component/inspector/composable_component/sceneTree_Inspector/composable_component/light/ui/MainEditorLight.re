open MainEditorLightType;

type state = {lightType};

type action =
  | ChangeLight(int);

module Method = {
  let changeLight = MainEditorChangeLightEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let renderDirectionLight = ((store, dispatchFunc), gameObject) =>
    <MainEditorDirectionLight
      store
      dispatchFunc
      lightComponent=(
        GameObjectComponentEngineService.getDirectionLightComponent(
          gameObject,
        )
        |> StateLogicService.getEngineStateToGetData
      )
    />;

  let renderPointLight = ((store, dispatchFunc), gameObject) =>
    <MainEditorPointLight
      store
      dispatchFunc
      lightComponent=(
        GameObjectComponentEngineService.getPointLightComponent(gameObject)
        |> StateLogicService.getEngineStateToGetData
      )
    />;
};

let component = ReasonReact.reducerComponent("MainEditorLight");

let reducer = ((store, dispatchFunc), action, state) =>
  switch (action) {
  | ChangeLight(value) =>
    let sourceLightType = state.lightType;

    ReasonReactUtils.updateWithSideEffects(
      {...state, lightType: value |> convertIntToLightType}, state =>
      Method.changeLight(
        (store, dispatchFunc),
        (),
        (sourceLightType, state.lightType),
      )
    );
  };

let render =
    ((store, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="MainEditorLight" className="wonder-light">
    <div className="">
      <Select
        label="type : "
        options=(MainEditorLightUtils.getLightOptions())
        selectedKey=(state.lightType |> convertLightTypeToInt)
        onChange=(value => send(ChangeLight(value)))
      />
    </div>
    <div className="">
      (
        MainEditorLightUtils.handleSpecificFuncByLightType(
          state.lightType,
          (
            Method.renderDirectionLight((store, dispatchFunc)),
            Method.renderPointLight((store, dispatchFunc)),
          ),
        )
      )
    </div>
  </article>;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    lightType:
      MainEditorLightUtils.getLightTypeByGameObject(
        StateEditorService.getState()
        |> SceneEditorService.unsafeGetCurrentSceneTreeNode,
      )
      |> StateLogicService.getEngineStateToGetData,
  },
  reducer: reducer((store, dispatchFunc)),
  render: self => render((store, dispatchFunc), self),
};