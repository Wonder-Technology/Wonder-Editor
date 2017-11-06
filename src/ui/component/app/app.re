open UiTool;

open Ant;

let importCss = (css: string) => {};

importCss("./app.scss");

let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  let fck = () => {
    Js.log("hehe");
  };
  {
  ...component,
  render: (_self) =>
    <div className="app">
      <Button _type="primary" size="small" onClick=((_) => fck())>
        (textEl("xne"))
      </Button>
      <InputNumber defaultValue=44.0 value=2.11 min=0.0 max=200.0 step=0.1 />
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
  }
};