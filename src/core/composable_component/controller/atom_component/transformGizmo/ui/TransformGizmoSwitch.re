open TransformGizmoSwitchType;

type state = {selectedType: type_};

type action =
  | Change(type_, onChangeFunc);

module Method = {
  let _getTypeClassName = type_ =>
    SceneViewType.(
      switch (type_) {
      | Translation => "translation"
      | Rotation => "rotation"
      | Scale => "scale"
      }
    );

  let _getTitle = (type_, languageType) =>
    SceneViewType.(
      switch (type_) {
      | Translation =>
        LanguageUtils.getControllerLanguageDataByType(
          "translation-gizmo-describe",
          languageType,
        )
      | Rotation =>
        LanguageUtils.getControllerLanguageDataByType(
          "rotation-gizmo-describe",
          languageType,
        )
      | Scale =>
        LanguageUtils.getControllerLanguageDataByType(
          "scale-gizmo-describe",
          languageType,
        )
      }
    );

  let renderContent = ((state, send), languageType, data) =>
    data
    |> Js.Array.map(({type_, onChangeFunc}) =>
         <div
           key={DomHelper.getRandomKey()}
           title={_getTitle(type_, languageType)}
           className={
             ClassNameService.buildMultipleClassName([|
               _getTypeClassName(type_),
               type_ == state.selectedType ? "select" : "not-select",
             |])
           }
           onClick={_e => send(Change(type_, onChangeFunc))}
         />
       );
};

let component = ReasonReact.reducerComponent("TransformGizmoSwitch");

let reducer = (action, state) =>
  switch (action) {
  | Change(selectedType, onChangeFunc) =>
    ReasonReactUtils.updateWithSideEffects({...state, selectedType}, _state =>
      onChangeFunc(selectedType)
    )
  };

let render = (data, {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="TransformGizmoSwitch" className="transform-gizmo-switch">
    {
      ReasonReact.array(
        Method.renderContent((state, send), languageType, data),
      )
    }
  </article>;
};

let make = (~data, ~defaultType, _children) => {
  ...component,
  initialState: () => {selectedType: defaultType},
  reducer,
  render: self => render(data, self),
};