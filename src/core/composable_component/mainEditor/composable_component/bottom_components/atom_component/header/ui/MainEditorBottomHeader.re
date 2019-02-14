type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let showProject = dispatchFunc => {
    dispatchFunc(AppStore.ShowComponentAction(ChangeComponent(Project)))
    |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(
        Update([|UpdateStore.BottomHeader, UpdateStore.Project|]),
      ),
    )
    |> ignore;
  };

  let showConsole = dispatchFunc => {
    dispatchFunc(AppStore.ShowComponentAction(ChangeComponent(Console)))
    |> ignore;

    dispatchFunc(
      AppStore.UpdateAction(
        Update([|UpdateStore.BottomHeader, UpdateStore.Console|]),
      ),
    )
    |> ignore;
  };

  let getConsoleMessageUnReadCount = (componentType, editorState) =>
    componentType |> MainEditorBottomComponentUtils.isTypeEqualConsole ?
      "0" :
      {
        let count =
          editorState |> CheckedCountConsoleEditorService.unreadConsoleMessage;

        count >= 99 ? "99" : count |> string_of_int;
      };
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorBottomHeader");

let _renderConsole = (currentComponentType, dispatchFunc) => {
  let unreadCount =
    Method.getConsoleMessageUnReadCount(currentComponentType)
    |> StateLogicService.getEditorState;

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
    (
      unreadCount !== "0" ?
        <div className="name-tail"> (DomHelper.textEl(unreadCount)) </div> :
        ReasonReact.null
    )
  </div>;
};

let render = (uiState, dispatchFunc, _self) => {
  let currentComponentType = uiState |> StoreUtils.getBottomCurrentComponentType;

  <article className="bottom-header" key="MainEditorBottomHeader">
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
      (_renderConsole(currentComponentType, dispatchFunc))
      <span className="category-name" />
    </div>
  </article>;
};

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.BottomHeader);

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(uiState),
  },
  shouldUpdate,
  render: render(uiState, dispatchFunc),
};