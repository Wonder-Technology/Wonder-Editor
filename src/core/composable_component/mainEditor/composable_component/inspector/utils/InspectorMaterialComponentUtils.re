let buildBasicMaterialComponent =
    (reduxTuple, materialComponent, changeColorFunc) =>
  <article className="wonder-basic-material">
    <PickColorComponent
      label="Color"
      title="color"
      getColorFunc={
        InspectorMaterialUtils.getBasicMaterialColor(materialComponent)
      }
      changeColorFunc={changeColorFunc(materialComponent)}
      closeColorPickFunc={
        InspectorMaterialUtils.closeBasicMaterialColorPick(
          reduxTuple,
          materialComponent,
        )
      }
    />
  </article>;

let buildLightMaterialComponent =
    (
      (uiState, dispatchFunc),
      materialComponent,
      (changeColorFunc, changeShininessFunc),
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
      closeColorPickFunc={
        InspectorMaterialUtils.closeLightMaterialColorPick(
          (uiState, dispatchFunc),
          materialComponent,
        )
      }
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
      getComponentValueFunc={
        LightMaterialEngineService.getLightMaterialShininess(
          materialComponent,
        )
      }
      changeComponentValueFunc={changeShininessFunc(materialComponent)}
      blurValueFunc={
        InspectorMaterialUtils.blurShininessEvent(
          (uiState, dispatchFunc),
          materialComponent,
        )
      }
      dragDropFunc={
        InspectorMaterialUtils.blurShininessEvent(
          (uiState, dispatchFunc),
          materialComponent,
        )
      }
    />
  </article>;
};