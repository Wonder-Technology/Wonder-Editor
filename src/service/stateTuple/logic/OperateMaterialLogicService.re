let _checkEditAndRunMaterialWithDiff =
    ((editMaterial, runMaterial), type_, editEngineState, runEngineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|editMateral and runMaterial diff should == materialType diff value|j},
                ~actual={j|not|j},
              ),
              () => {
                let diffValue =
                  StateEditorService.getState()
                  |> SceneEditorService.unsafeGetDiffMap
                  |> DiffComponentService.getEditEngineComponent(type_);

                editMaterial - runMaterial == diffValue;
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (runMaterial, editEngineState, runEngineState);
};

let createMaterial = (editEngineState, runEngineState) => {
  let (editEngineState, _editMaterial) =
    editEngineState |> BasicMaterialEngineService.create;
  let (runEngineState, runMaterial) =
    runEngineState |> BasicMaterialEngineService.create;

  _checkEditAndRunMaterialWithDiff(
    (_editMaterial, runMaterial),
    DiffType.Material,
    editEngineState,
    runEngineState,
  );
};