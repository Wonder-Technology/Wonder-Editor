type state = {
  isShowGeometryGroup: bool,
  currentGeometry: int,
};

type action =
  | ChangeGeometry(int)
  | ShowGeometryGroup
  | HideGeometryGroup;

module Method = {
  let changeGeometry = MainEditorChangeGeometryEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildAssetGeometryComponent = (send, currentGeometry) =>
    StateEditorService.getState()
    |> AssetGeometryNodeMapEditorService.getGeometryNodeMap
    |> Js.Array.map(geometry => {
         let className =
           geometry === currentGeometry ?
             "item-content item-active" : "item-content";

         <div
           className
           key=(DomHelper.getRandomKey())
           onClick=(_e => send(ChangeGeometry(geometry)))>
           (
             DomHelper.textEl(
               GeometryEngineService.getGeometryName(geometry)
               |> StateLogicService.getEngineStateToGetData,
             )
           )
         </div>;
       });
};

let component = ReasonReact.reducerComponent("MainEditorGeometry");

let reducer = (reduxTuple, currentSceneTreeNode, action, state) =>
  switch (action) {
  | ChangeGeometry(targetGeometry) =>
    let sourceGeometry = state.currentGeometry;

    sourceGeometry === targetGeometry ?
      ReasonReact.NoUpdate :
      ReasonReactUtils.updateWithSideEffects(
        {...state, currentGeometry: targetGeometry}, _state =>
        Method.changeGeometry(
          reduxTuple,
          currentSceneTreeNode,
          (sourceGeometry, targetGeometry),
        )
      );

  | ShowGeometryGroup =>
    ReasonReact.Update({...state, isShowGeometryGroup: true})

  | HideGeometryGroup =>
    ReasonReact.Update({...state, isShowGeometryGroup: false})
  };

let render =
    ((store, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="MainEditorGeometry" className="wonder-inspector-geometry">
    <div className="geometry-select">
      (
        DomHelper.textEl(
          GeometryEngineService.getGeometryName(state.currentGeometry)
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
            (
              ReasonReact.arrayToElement(
                Method.buildAssetGeometryComponent(
                  send,
                  state.currentGeometry,
                ),
              )
            )
          </div>
          <div
            className="select-component-bg"
            onClick=(_e => send(HideGeometryGroup))
          />
        </div> :
        ReasonReact.nullElement
    )
  </article>;

let make =
    (
      ~store,
      ~dispatchFunc,
      ~currentSceneTreeNode,
      ~geometryComponent,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowGeometryGroup: false,
    currentGeometry: geometryComponent,
  },
  reducer: reducer((store, dispatchFunc), currentSceneTreeNode),
  render: self => render((store, dispatchFunc), self),
};