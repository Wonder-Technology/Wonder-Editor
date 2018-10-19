type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let showProject = dispatchFunc => {
    dispatchFunc(AppStore.ShowComponentAction(ChangeComponent(Project)))
    |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };

  let showConsole = dispatchFunc => {
    dispatchFunc(AppStore.ShowComponentAction(ChangeComponent(Console)))
    |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };

  let getConsoleMessageUnReadCount = (componentType, editorState) =>
    componentType |> MainEditorBottomComponentUtils.isTypeEqualConsole ?
      "0" :
      {
        let count =
          editorState |> ConsoleCheckedCountEditorService.unreadConsoleMessage;

        count >= 99 ? "99" : count |> string_of_int;
      };
};

let component =
  ReasonReact.statelessComponentWithRetainedProps(
    "MainEditorBottomComponents",
  );

let render = ((store, dispatchFunc), _self) => {
  let currentComponentType = store |> StoreUtils.getBottomCurrentComponentType;

  <article
    key="MainEditorBottomComponents" className="wonder-bottom-component">
    <div className="bottom-widget-category">
      <div
        className=(
          "category-name"
          ++ (
            MainEditorBottomComponentUtils.isTypeEqualProject(
              currentComponentType,
            ) ?
              " category-active" : ""
          )
        )
        onClick=(
          _e =>
            MainEditorBottomComponentUtils.isTypeEqualProject(
              currentComponentType,
            ) ?
              () : Method.showProject(dispatchFunc)
        )>
        <div className="name-header"> (DomHelper.textEl("Project")) </div>
      </div>
      <div
        className=(
          "category-name"
          ++ (
            MainEditorBottomComponentUtils.isTypeEqualConsole(
              currentComponentType,
            ) ?
              " category-active" : ""
          )
        )
        onClick=(
          _e =>
            MainEditorBottomComponentUtils.isTypeEqualConsole(
              currentComponentType,
            ) ?
              () : Method.showConsole(dispatchFunc)
        )>
        <div className="name-header"> (DomHelper.textEl("Console")) </div>
        <div className="name-tail">
          (
            DomHelper.textEl(
              Method.getConsoleMessageUnReadCount(currentComponentType)
              |> StateLogicService.getEditorState,
            )
          )
        </div>
      </div>
      <span className="category-name" />
    </div>
    <MainEditorAsset store dispatchFunc />
    <MainEditorConsole store dispatchFunc />
  </article>;
};

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.BottomComponent);

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  render: self => render((store, dispatchFunc), self),
};