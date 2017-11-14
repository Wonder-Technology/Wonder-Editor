open UiTool;

open Ant;

type numberInputType = {
  label: string,
  onChange: string => unit
};

let importCss = (css: string) => {};

importCss("./app.scss");

let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  /* let inputProps = [%obj {a=1}]; */
  let fck = () => Js.log(AppConfig.appRecord);
  /* let fck = () => Js.log(inputProps); */
  let fck2 = (value) => Js.log(value);
  let redo = (_) => dispatch(IndexStore.TravelForward);
  let undo = (_) => dispatch(IndexStore.TravelBackward);
  let buildReactComponent = () => <div> (textEl("hehe")) </div>;
  let numberInputProps = {label: "YY", onChange: fck2};
  {
    ...component,
    render: (_self) =>
      <div className="app">
        (buildReactComponent())
        <Button _type="primary" size="small" onClick=fck> (textEl("xne")) </Button>
        <NumberInput label="X" onChange=fck2 />
        /* <NumberInput {...inputProps} /> */
        <MainEditor state=state.stringState dispatch />
        <button onClick=undo> (textEl("undo")) </button>
      </div>
    /* <button onClick=redo> (textEl("redo")) </button> */
  }
};