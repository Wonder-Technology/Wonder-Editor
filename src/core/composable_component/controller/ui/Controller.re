open LanguageType;

open ColorType;

open Color;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let changeLanguage = languageType =>
    switch (languageType) {
    | EN =>
      LocalStorage.setValue("language", "ZH");
      DomHelper.locationReload(.);
    | ZH =>
      LocalStorage.setValue("language", "EN");
      DomHelper.locationReload(.);
    };

  let handleChangeCurrentTransformGizmoType = (dispatchFunc, type_) => {
    open SceneViewType;

    StateEditorService.getState()
    |> CurrentTransformGizmoSceneViewEditorService.mark(type_)
    |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTransformGizmo
    |> StateEditorService.setState
    |> ignore;

    StateLogicService.getAndRefreshEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Controller|])))
    |> ignore;
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

  let _isTransformGizmoCoordinateSystemSwitchDisable = () =>
    switch (_getCurrentTransformGizmoType()) {
    | Scale => true
    | _ => false
    };

  let buildTransformComponent = (uiState, dispatchFunc, languageType) =>
    <div className="header-item">
      <div className="component-item">
        <TransformGizmoSwitch
          key={DomHelper.getRandomKey()}
          data=[|
            {
              type_: SceneViewType.Translation,
              onChangeFunc:
                handleChangeCurrentTransformGizmoType(dispatchFunc),
            },
            {
              type_: SceneViewType.Rotation,
              onChangeFunc:
                handleChangeCurrentTransformGizmoType(dispatchFunc),
            },
            {
              type_: SceneViewType.Scale,
              onChangeFunc:
                handleChangeCurrentTransformGizmoType(dispatchFunc),
            },
          |]
          defaultType={_getCurrentTransformGizmoType()}
        />
        <TransformGizmoCoordinateSystemSwitch
          key={DomHelper.getRandomKey()}
          onChange=_handleChangeCurrentTransformGizmoCoordinateSystem
          defaultCoordinateSystem={_getCurrentTransformGizmoCoordinateSystem()}
          isDisable={_isTransformGizmoCoordinateSystemSwitchDisable()}
        />
      </div>
    </div>;

  let renderRunAndStop = (uiState, dispatchFunc, languageType) =>
    <div
      className="controller-runAndStop"
      title={
        LanguageUtils.getControllerLanguageDataByType(
          "run-describe",
          languageType,
        )
      }
      onClick={
        _e => {
          StateEditorService.getIsRun() ?
            ControllerUtils.stop(dispatchFunc) : ControllerUtils.run(uiState);

          dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
          |> ignore;
        }
      }>
      {
        StateEditorService.getIsRun() ?
          <img src="./public/img/stop.png" /> :
          <img src="./public/img/run.png" />
      }
    </div>;
};

let component = ReasonReact.statelessComponentWithRetainedProps("Controller");

let render =
    (
      uiState: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="controller" className="wonder-controller-component">
    <div className="header-controller">
      <div className="controller-transform">
        {Method.buildTransformComponent(uiState, dispatchFunc, languageType)}
      </div>
      {Method.renderRunAndStop(uiState, dispatchFunc, languageType)}
      <div className="controller-other">
        <div
          className="other-language"
          onClick={_e => Method.changeLanguage(languageType)}>
          {
            switch (languageType) {
            | EN => DomHelper.textEl({j|中文|j})
            | ZH => DomHelper.textEl({j|English|j})
            }
          }
        </div>
      </div>
    </div>
  </article>;
};

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