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
      }
    );

  let renderContent = ((state, send), data) =>
    data
    |> Js.Array.map(({type_, onChangeFunc}) =>
         <div
           key=(DomHelper.getRandomKey())
           className=(
             ClassNameService.buildMultipleClassName([|
               _getTypeClassName(type_),
               type_ == state.selectedType ? "select" : "not-select",
             |])
           )
           onClick=(_e => send(Change(type_, onChangeFunc)))
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

let render = (data, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="TransformGizmoSwitch" className="transform-gizmo-switch">
    (ReasonReact.array(Method.renderContent((state, send), data)))
  </article>;

let make = (~data, ~defaultType, _children) => {
  ...component,
  initialState: () => {selectedType: defaultType},
  reducer,
  render: self => render(data, self),
};