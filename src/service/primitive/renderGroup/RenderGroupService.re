open Wonderjs;

open RenderGroupType;

/* let checkEditAndRunRenderGroupWithDiff =
    ((editRenderGroup, runRenderGroup), editEngineState, runEngineState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect=
                {j|editMateral and runRenderGroup diff should == meshRender material diff value|j},
              ~actual={j|not|j},
            ),
            () => {
              let _getDiffValueByType = type_ =>
                StateEditorService.getState()
                |> SceneEditorService.unsafeGetDiffMap
                |> DiffComponentService.getEditEngineComponent(type_);

              let meshRendererDiffValue =
                _getDiffValueByType(DiffType.MeshRenderer);

              let basicMaterialDiffValue =
                _getDiffValueByType(DiffType.BasicMaterial);

              let lightMaterialDiffValue =
                _getDiffValueByType(DiffType.LightMaterial);

              let _getRenderGroupDiffValue = () => (
                editRenderGroup.meshRenderer - runRenderGroup.meshRenderer,
                editRenderGroup.material - runRenderGroup.material,
              );

              _getRenderGroupDiffValue()
              == (meshRendererDiffValue, basicMaterialDiffValue)
              ||
              _getRenderGroupDiffValue() == (
                                              meshRendererDiffValue,
                                              lightMaterialDiffValue,
                                            );
            },
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (runRenderGroup, editEngineState, runEngineState);
}; */