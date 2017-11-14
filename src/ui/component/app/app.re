open UiTool;

open Ant;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  let fck = () => Js.log(AppConfig.appRecord);
  let fck2 = (value) => Js.log(value);
  let redo = (_) => dispatch(IndexStore.TravelForward);
  let undo = (_) => dispatch(IndexStore.TravelBackward);
  let buildReactComponent = () => <div> (textEl("hehe")) </div>;
  {
    ...component,
    render: (_self) =>
      <div className="app">
        (buildReactComponent())
        <Button _type="primary" size="small" onClick=fck> (textEl("xne")) </Button>
        <NumberInput label="X" onChange=fck2 />
        <MainEditor state=state.stringState dispatch />
        <button onClick=undo> (textEl("undo")) </button>
      </div>
    /* <button onClick=redo> (textEl("redo")) </button> */
  }
};