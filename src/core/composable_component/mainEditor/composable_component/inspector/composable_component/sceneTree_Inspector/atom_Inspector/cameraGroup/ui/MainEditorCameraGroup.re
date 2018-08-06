let component = ReasonReact.statelessComponent("MainEditorCameraGroup");

let render = ((store, dispatchFunc), _self) =>
  <article key="MainEditorCameraGroup" className="wonder-camera-group">
    <div className="">
      <div className=""> (DomHelper.textEl("CameView : ")) </div>
      <MainEditorCameraView store dispatchFunc />
    </div>
    <hr />
    <div className="">
      <div className=""> (DomHelper.textEl("Projection : ")) </div>
    </div>
  </article>;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};