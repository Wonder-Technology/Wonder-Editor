open ColorType;

open Color;

type state = {isReload: bool};

type action =
  | Reload;

module Method = {
  /* let buildOperateExtensionComponent = () =>
     <div className="header-item">
       <div className="component-item">
         <FileInput
           buttonText="show Input"
           onSubmit=(value => addExtension(value))
         />
       </div>
     </div>; */

  let changeColor = value =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> SceneEngineService.setAmbientLightColor
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let getColor = () =>
    SceneEngineService.getAmbientLightColor
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let closeColorPick = ControllerAmbientLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let buildAmbientLightComponent = (uiState, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <PickColorComponent
          key=(DomHelper.getRandomKey())
          label="Ambient Color : "
          getColorFunc=getColor
          changeColorFunc=changeColor
          closeColorPickFunc=(closeColorPick((uiState, dispatchFunc), ()))
        />
      </div>
    </div>;
};

let component = ReasonReact.reducerComponent("Controller");

let reducer = (action, state) =>
  switch (action) {
  | Reload => ReasonReact.Update({...state, isReload: ! state.isReload})
  };

let render =
    (
      uiState: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-controller-component">
    <div className="header-controller">
      <div className="controller-transform">
        (Method.buildAmbientLightComponent(uiState, dispatchFunc))
      </div>
      <div
        className="controller-runAndStop"
        onClick=(
          _e => {
            StateEditorService.getIsRun() ?
              ControllerUtils.stop(dispatchFunc) : ControllerUtils.run(uiState);

            send(Reload);
          }
        )>
        (
          StateEditorService.getIsRun() ?
            <img src="./public/img/stop.png" /> :
            <img src="./public/img/run.png" />
        )
      </div>
      <div className="controller-other" />
    </div>
  </article>;

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isReload: false},
  reducer,
  render: self => render(uiState, dispatchFunc, self),
};