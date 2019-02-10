open ColorType;

open Color;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

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

  let _handleChangeCurrentTransformGizmoType = type_ => {
    open SceneViewType;

    StateEditorService.getState()
    |> CurrentTransformGizmoSceneViewEditorService.mark(type_)
    |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTransformGizmo
    |> StateEditorService.setState
    |> ignore;

    StateLogicService.getAndRefreshEngineState();
  };

  let _handleChangeCurrentTransformGizmoCoordinateSystem = coordinateSystem => {
    StateEditorService.getState()
    |> CoordinateSystemTransformGizmoSceneViewEditorService.setCoordinateSystem(
         coordinateSystem,
       )
    |> StateEditorService.setState
    |> ignore;

    StateLogicService.getAndRefreshEngineState();

    ();
  };

  let _getCurrentTransformGizmoType = () =>
    CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType
    |> StateLogicService.getEditorState;

  let _getCurrentTransformGizmoCoordinateSystem = () =>
    CoordinateSystemTransformGizmoSceneViewEditorService.getCoordinateSystem
    |> StateLogicService.getEditorState;

  let buildTransformComponent = (uiState, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <TransformGizmoSwitch
          key=(DomHelper.getRandomKey())
          data=[|
            {
              type_: SceneViewType.Translation,
              onChangeFunc: _handleChangeCurrentTransformGizmoType,
            },
            {
              type_: SceneViewType.Rotation,
              onChangeFunc: _handleChangeCurrentTransformGizmoType,
            },
          |]
          defaultType=(_getCurrentTransformGizmoType())
        />
        <TransformGizmoCoordinateSystemSwitch
          key=(DomHelper.getRandomKey())
          onChange=_handleChangeCurrentTransformGizmoCoordinateSystem
          defaultCoordinateSystem=(_getCurrentTransformGizmoCoordinateSystem())
        />
      </div>
    </div>;
};

let component = ReasonReact.statelessComponentWithRetainedProps("Controller");

let render =
    (
      uiState: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-controller-component">
    <div className="header-controller">
      <div className="controller-ambient">
        (Method.buildAmbientLightComponent(uiState, dispatchFunc))
      </div>
      <div className="controller-transform">
        (Method.buildTransformComponent(uiState, dispatchFunc))
      </div>
      <div
        className="controller-runAndStop"
        onClick=(
          _e => {
            StateEditorService.getIsRun() ?
              ControllerUtils.stop(dispatchFunc) :
              ControllerUtils.run(uiState);

            dispatchFunc(
              AppStore.UpdateAction(Update([|UpdateStore.Controller|])),
            )
            |> ignore;
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

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.Controller);

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(uiState),
  },
  shouldUpdate,
  render: self => render(uiState, dispatchFunc, self),
};