module Method = {
  let splitDragMove = distance => Js.log(distance);

  let splitDragDrop = () => Js.log("split drop");
};

let component = ReasonReact.statelessComponent("MainEditorLeftComponents");

let render = ((uiState, dispatchFunc), _self) =>
  <article
    key="MainEditorLeftComponents"
    className="inline-component wonder-left-components">
    <MainEditorLeftHeader uiState dispatchFunc />
    <MainEditorSceneTree uiState dispatchFunc />
    /* <Split
      position=SplitType.Right
      minPercent=20.
      maxPercent=30.
      dragMoveFunc=Method.splitDragMove
      dragDropFunc=Method.splitDragDrop
    /> */
  </article>;

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), self),
};