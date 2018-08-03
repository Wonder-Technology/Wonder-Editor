let checkEditAndRunLightWithDiff =
    ((editLight, runLight), type_, editEngineState, runEngineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|editLight and runLight diff should == lightType diff value|j},
                ~actual={j|not|j},
              ),
              () => {
                let diffValue =
                  StateEditorService.getState()
                  |> SceneEditorService.unsafeGetDiffMap
                  |> DiffComponentService.getEditEngineComponent(type_);

                editLight - runLight == diffValue;
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (runLight, editEngineState, runEngineState);
};