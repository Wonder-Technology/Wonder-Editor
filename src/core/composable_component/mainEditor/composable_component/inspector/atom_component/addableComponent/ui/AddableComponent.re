type state = {
  isShowAddableComponent: bool,
  isListEmpty: Js.boolean
};

type action =
  | ToggleAddableComponent;

module Method = {
  let addSpecificComponent = AddableComponentAddComponentEventHandler.MakeEventHandler.onClick;
  let buildGameObjectAddableComponent = (store, dispatch, currentSceneTreeNode, componentList) =>
    switch (componentList |> Js.List.length) {
    | 0 => [||]
    | _ =>
      componentList
      |> Js.List.foldLeft(
           [@bs]
           (
             (componentArray, type_) =>
               componentArray
               |> ArrayService.push(
                    <div
                      key=(DomHelper.getRandomKey())
                      onClick=(
                        (event) =>
                          addSpecificComponent((store, dispatch), type_, currentSceneTreeNode)
                      )>
                      (DomHelper.textEl(type_))
                    </div>
                  )
           ),
           [||]
         )
    };
  let toggleAddableComponent = (_event) => ToggleAddableComponent;
};

let component = ReasonReact.reducerComponent("addableComponent");

let reducer = (action, state) =>
  switch action {
  | ToggleAddableComponent =>
    ReasonReact.Update({...state, isShowAddableComponent: ! state.isShowAddableComponent})
  };

let render =
    (
      reduxTuple,
      currentSceneTreeNode,
      addableComponentList,
      {state, reduce}: ReasonReact.self('a, 'b, 'c)
    ) => {
  let (store, dispatch) = reduxTuple;
  <article className="addable-component">
    <button disabled=state.isListEmpty onClick=(reduce(Method.toggleAddableComponent))>
      (DomHelper.textEl("add component"))
    </button>
    (
      state.isShowAddableComponent ?
        ReasonReact.arrayToElement(
          addableComponentList
          |> Method.buildGameObjectAddableComponent(store, dispatch, currentSceneTreeNode)
        ) :
        ReasonReact.nullElement
    )
  </article>
};

let make = (~reduxTuple, ~currentSceneTreeNode, ~addableComponentList, _children) => {
  ...component,
  initialState: () =>
    switch (addableComponentList |> Js.List.length) {
    | 0 => {isListEmpty: Js.true_, isShowAddableComponent: false}
    | _ => {isListEmpty: Js.false_, isShowAddableComponent: false}
    },
  reducer,
  render: (self) => render(reduxTuple, currentSceneTreeNode, addableComponentList, self)
};