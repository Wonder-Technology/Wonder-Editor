let changeMaterialType =
    (
      ~material,
      ~sourceMaterialType,
      ~targetMaterialType,
      ~materialNodeId,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MaterialInspector.Method.changeMaterialType(
    (store, dispatchFunc),
    (materialNodeId, material),
    (sourceMaterialType, targetMaterialType),
  );