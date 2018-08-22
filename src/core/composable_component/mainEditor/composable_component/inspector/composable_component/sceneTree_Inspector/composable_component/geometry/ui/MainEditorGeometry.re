type state = {isShowGeometryGroup: bool};

type action =
  | ShowGeometryGroup
  | HideGeometryGroup;

module Method = {
  let buildAssetGeometryComponent = () =>
    StateEditorService.getState()
    |> AssetGeometryNodeMapEditorService.getGeometryNodeMap
    |> Js.Array.map(geometry =>
         <div className="item-content" key=(DomHelper.getRandomKey())>
           (
             DomHelper.textEl(
               GeometryEngineService.getGeometryName(geometry)
               |> StateLogicService.getEngineStateToGetData,
             )
           )
         </div>
       );
};

let component = ReasonReact.reducerComponent("MainEditorGeometry");

let reducer = (action, state) =>
  switch (action) {
  | ShowGeometryGroup =>
    ReasonReact.Update({...state, isShowGeometryGroup: true})
  | HideGeometryGroup =>
    /* closeColorPickFunc(state.colorHex); */

    ReasonReact.Update({...state, isShowGeometryGroup: false})
  };

let render =
    (
      (store, dispatchFunc),
      geometryComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="MainEditorGeometry" className="wonder-inspector-geometry">
    <div className="geometry-select">
      (
        DomHelper.textEl(
          GeometryEngineService.getGeometryName(geometryComponent)
          |> StateLogicService.getEngineStateToGetData,
        )
      )
      <span className="select-title" onClick=(_e => send(ShowGeometryGroup))>
        (DomHelper.textEl("select"))
      </span>
    </div>
    (
      state.isShowGeometryGroup ?
        <div className="select-component-content">
          <div className="select-component-item">
            <div className="item-header">
              (DomHelper.textEl("Geometry"))
            </div>
            (ReasonReact.arrayToElement(Method.buildAssetGeometryComponent()))
          </div>
          <div
            className="select-component-bg"
            onClick=(_e => send(HideGeometryGroup))
          />
        </div> :
        ReasonReact.nullElement
    )
  </article>;

let make = (~store, ~dispatchFunc, ~geometryComponent, _children) => {
  ...component,
  initialState: () => {isShowGeometryGroup: false},
  reducer,
  render: self => render((store, dispatchFunc), geometryComponent, self),
};