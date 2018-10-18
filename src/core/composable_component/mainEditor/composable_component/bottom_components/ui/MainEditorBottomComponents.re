open BottomShowComponentStore;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

type state = {bottomComponentType};

type action =
  | ShowProject
  | ShowConsole;

module Method = {
  let isTypeEqualProject = componentType => componentType === Project;

  let isTypeEqualConsole = componentType => componentType === Console;
};

let component =
  ReasonReact.reducerComponentWithRetainedProps("MainEditorBottomComponents");

let reducer = (dispatchFunc, action, state) =>
  switch (action) {
  | ShowProject =>
    ReasonReactUtils.sideEffects(() => {
      dispatchFunc(AppStore.ShowComponentAction(ChangeComponent(Project)))
      |> ignore;
      dispatchFunc(
        AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
      )
      |> ignore;
    })
  | ShowConsole =>
    ReasonReactUtils.sideEffects(() => {
      dispatchFunc(AppStore.ShowComponentAction(ChangeComponent(Console)))
      |> ignore;
      dispatchFunc(
        AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
      )
      |> ignore;
    })
  };

let render =
    ((store, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article
    key="MainEditorBottomComponents" className="wonder-bottom-component">
    <div className="bottom-widget-category">
      <span
        className=(
          "category-name"
          ++ (
            Method.isTypeEqualProject(state.bottomComponentType) ?
              " category-active" : ""
          )
        )
        onClick=(
          _e =>
            Method.isTypeEqualProject(state.bottomComponentType) ?
              () : send(ShowProject)
        )>
        (DomHelper.textEl("Project"))
      </span>
      <span
        className=(
          "category-name"
          ++ (
            Method.isTypeEqualConsole(state.bottomComponentType) ?
              "" : " category-active"
          )
        )
        onClick=(
          _e =>
            Method.isTypeEqualConsole(state.bottomComponentType) ?
              () : send(ShowConsole)
        )>
        (DomHelper.textEl("Console"))
      </span>
    </div>
    (
      Method.isTypeEqualProject(state.bottomComponentType) ?
        <MainEditorAsset store dispatchFunc /> : ReasonReact.null
    )
    (
      Method.isTypeEqualConsole(state.bottomComponentType) ?
        <MainEditorConsole /> : ReasonReact.null
    )
  </article>;

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.BottomComponent);

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    bottomComponentType: store |> StoreUtils.getBottomCurrentComponentType,
  },
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  reducer: reducer(dispatchFunc),
  render: self => render((store, dispatchFunc), self),
};