open UiTool;

let importCss = (css:string) =>  {
};

importCss("./app.scss");

let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) =>
    <div className="app">
      <div className="fck"> (textEl("strings: " ++ state.notACounter)) </div>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.A)))>
        (textEl("add a"))
      </button>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.B)))>
        (textEl("add b"))
      </button>
      <button onClick=((_) => dispatch(IndexStore.TravelBackward))> (textEl("undo")) </button>
      <button onClick=((_) => dispatch(IndexStore.TravelForward))> (textEl("redo")) </button>
    </div>
};