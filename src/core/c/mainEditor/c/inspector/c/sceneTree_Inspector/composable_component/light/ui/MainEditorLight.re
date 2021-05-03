open MainEditorLightType;

type state = {lightType};

type action =
  | ChangeLight(int);

module Method = {
  let changeLight = MainEditorChangeLightEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let renderDirectionLight = ((uiState, dispatchFunc), gameObject) =>
    <MainEditorDirectionLight
      uiState
      dispatchFunc
      lightComponent={
        GameObjectComponentEngineService.unsafeGetDirectionLightComponent(
          gameObject,
        )
        |> StateLogicService.getEngineStateToGetData
      }
    />;

  let renderPointLight = ((uiState, dispatchFunc), gameObject) =>
    <MainEditorPointLight
      uiState
      dispatchFunc
      lightComponent={
        GameObjectComponentEngineService.unsafeGetPointLightComponent(
          gameObject,
        )
        |> StateLogicService.getEngineStateToGetData
      }
    />;
};

let component = ReasonReact.reducerComponent("MainEditorLight");

let reducer = ((uiState, dispatchFunc), action, state) =>
  switch (action) {
  | ChangeLight(value) =>
    let sourceLightType = state.lightType;
    let targetLightType = value |> convertIntToLightType;

    Method.changeLight(
      (uiState, dispatchFunc),
      (),
      (sourceLightType, targetLightType),
    );

    let engineState = StateEngineService.unsafeGetState();
    let (_, isMaxCount) =
      MainEditorLightUtils.isLightExceedMaxCountByType(
        targetLightType,
        engineState,
      );

    isMaxCount ?
      ReasonReact.NoUpdate :
      ReasonReact.Update({...state, lightType: targetLightType});
  };

let render =
    ((uiState, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorLight" className="wonder-inspector-light">
    <Select
      label="Type"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "light-type-describe",
          languageType,
        )
      }
      options={MainEditorLightUtils.getLightOptions()}
      selectedKey={state.lightType |> convertLightTypeToInt}
      onChange={value => send(ChangeLight(value))}
    />
    {
      MainEditorLightUtils.handleSpecificFuncByLightType(
        state.lightType,
        (
          Method.renderDirectionLight((uiState, dispatchFunc)),
          Method.renderPointLight((uiState, dispatchFunc)),
        ),
      )
    }
  </article>;
};

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    lightType:
      MainEditorLightUtils.getLightTypeByGameObject(
        StateEditorService.getState()
        |> SceneTreeEditorService.unsafeGetCurrentSceneTreeNode,
      )
      |> StateLogicService.getEngineStateToGetData,
  },
  reducer: reducer((uiState, dispatchFunc)),
  render: self => render((uiState, dispatchFunc), self),
};