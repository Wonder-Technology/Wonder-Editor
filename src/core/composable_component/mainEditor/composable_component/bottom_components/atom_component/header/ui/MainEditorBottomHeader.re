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

let render = (store, dispatchFunc, _self) => {
  let currentComponentType = store |> StoreUtils.getBottomCurrentComponentType;
  let unreadCount =
    Method.getConsoleMessageUnReadCount(currentComponentType)
    |> StateLogicService.getEditorState;

  <article key="MainEditorBottomHeader">
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
        <div
          className="name-tail"
          style=(
            unreadCount === "0" ?
              ReactDOMRe.Style.make(~display="none", ()) :
              ReactDOMRe.Style.make()
          )>
          (DomHelper.textEl(unreadCount))
        </div>
      </div>
      <span className="category-name" />
    </div>
  </article>;
};

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.BottomHeader);

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  render: render(store, dispatchFunc),
};