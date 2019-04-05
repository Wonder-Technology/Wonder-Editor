let changeMaterialType =
    (
      ~material,
      ~sourceMaterialType,
      ~targetMaterialType,
      ~materialNodeId,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MaterialInspector.Method.changeMaterialType(
    (uiState, dispatchFunc),
    (materialNodeId, material),
    (sourceMaterialType, targetMaterialType),
  );

let createMaterialSphereInToInspectorCanvas = MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas;

let didMount = MaterialInspector.Method.didMount;

let willUnmount = MaterialInspector.Method.willUnmount;