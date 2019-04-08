let buildBasicMaterialComponent =
    (materialComponent, (changeColorFunc, closeColorPickFunc)) =>
  <article className="wonder-basic-material">
    <PickColorComponent
      label="Color"
      title="color"
      getColorFunc={
        InspectorMaterialUtils.getBasicMaterialColor(materialComponent)
      }
      changeColorFunc={changeColorFunc(materialComponent)}
      closeColorPickFunc
    />
  </article>;

let buildLightMaterialComponent =
    (
      (uiState, dispatchFunc),
      materialComponent,
      (
        changeColorFunc,
        changeShininessFunc,
        closeColorPickFunc,
        blurShininessFunc,
      ),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="wonder-light-material">
    <PickColorComponent
      label="Diffuse Color"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "material-diffuseColor-describe",
          languageType,
        )
      }
      getColorFunc={
        InspectorMaterialUtils.getLightMaterialColor(materialComponent)
      }
      changeColorFunc={changeColorFunc(materialComponent)}
      closeColorPickFunc
    />
    <MainEditorMaterialMap
      uiState
      dispatchFunc
      materialComponent
      label="Diffuse Map"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "material-diffuseMap-describe",
          languageType,
        )
      }
      getMapFunc=LightMaterialEngineService.getLightMaterialDiffuseMap
      removeTextureFunc=InspectorMaterialUtils.removeTexture
      onDropFunc=InspectorMaterialUtils.dragToSetLightMaterialTexture
      isShowTextureGroup=false
    />
    <MainEditorFloatInputBaseComponent
      label="Shininess"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "material-shininess-describe",
          languageType,
        )
      }
      defaultValue={
        LightMaterialEngineService.getLightMaterialShininess(
          materialComponent,
        )
        |> StateLogicService.getEngineStateToGetData
      }
      changeComponentValueFunc={changeShininessFunc(materialComponent)}
      blurValueFunc=blurShininessFunc
      dragDropFunc=blurShininessFunc
    />
  </article>;
};