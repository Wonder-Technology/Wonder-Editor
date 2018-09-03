type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

type state = {isShowProject: bool};

type action =
  | ShowProject
  | ShowConsole;

let component =
  ReasonReact.reducerComponentWithRetainedProps("MainEditorBottomComponents");

let reducer = (dispatchFunc, action, state) =>
  switch (action) {
  | ShowProject =>
    ReasonReactUtils.updateWithSideEffects(
      {...state, isShowProject: true}, state =>
      dispatchFunc(
        AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
      )
      |> ignore
    )
  | ShowConsole =>
    ReasonReactUtils.updateWithSideEffects(
      {...state, isShowProject: false}, state =>
      dispatchFunc(
        AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
      )
      |> ignore
    )
  };

let render =
    ((store, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article
    key="MainEditorBottomComponents" className="wonder-bottom-component">
    <div className="bottom-widget-category">
      <span
        className=(
          "category-name" ++ (state.isShowProject ? " category-active" : "")
        )
        onClick=(_e => send(ShowProject))>
        (DomHelper.textEl("Project"))
      </span>
      <span
        className=(
          "category-name" ++ (state.isShowProject ? "" : " category-active")
        )
        onClick=(_e => send(ShowConsole))>
        (DomHelper.textEl("Console"))
      </span>
    </div>
    (
      state.isShowProject ?
        <MainEditorAsset store dispatchFunc /> : <MainEditorConsole />
    )
  </article>;

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.BottomComponent);

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isShowProject: true},
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  reducer: reducer(dispatchFunc),
  render: self => render((store, dispatchFunc), self),
};