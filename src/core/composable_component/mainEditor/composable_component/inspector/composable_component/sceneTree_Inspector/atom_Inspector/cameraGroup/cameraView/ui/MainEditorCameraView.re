open MainEditorCameraViewType;

let component = ReasonReact.statelessComponent("MainEditorCameraView");

let render = ((store, dispatchFunc), _self) =>{
  <article key="MainEditorCameraView" className="wonder-camera-view">
    <Select
      label="type : "
      options=(MainEditorMaterialUtils.getMaterialOptions())
      selectedKey=(BasicCameraView |> convertCameraViewTypeToInt)
      onChange=(value => WonderLog.Log.print(value) |> ignore)
    />
    <div className="">
    <input id="checkbox1" _type="checkbox" value="101"/>
    </div>
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};