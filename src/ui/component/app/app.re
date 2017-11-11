open UiTool;

open Ant;

let importCss = (css: string) => {};

importCss("./app.scss");

let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  let fck = () => Js.log("hehe");
  {
    ...component,
    render: (_self) =>
      <div className="app">
        <Button _type="primary" size="small" onClick=((_) => fck())> (textEl("xne")) </Button>
        <NumberInput label="X" />
        <MainEditor state=state.stringState dispatch />
        <button onClick=((_) => dispatch(IndexStore.TravelBackward))> (textEl("undo")) </button>
        <button onClick=((_) => dispatch(IndexStore.TravelForward))> (textEl("redo")) </button>
      </div>
  }
};