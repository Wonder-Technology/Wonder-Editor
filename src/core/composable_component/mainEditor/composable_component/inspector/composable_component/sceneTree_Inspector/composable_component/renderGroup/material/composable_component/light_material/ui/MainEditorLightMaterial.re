open Color;

open ColorType;

module Method = {
  let getColor = (materialComponent, ()) =>
    LightMaterialEngineService.getLightMaterialDiffuseColor(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let changeColor = (isShowInspectorCanvas, materialComponent, value) => {
    let colorArray =
      value |> convertColorObjToColorPickType |> getEngineColorRgbArr;

    StateEngineService.unsafeGetState()
    |> LightMaterialEngineService.setLightMaterialDiffuseColor(
         colorArray,
         materialComponent,
       )
    |> StateLogicService.refreshEngineState;

    isShowInspectorCanvas ?
      StateInspectorEngineService.unsafeGetState()
      |> InspectorEngineMaterialChangeValueUtils.changeMaterialValue(
           colorArray,
           (
             GameObjectComponentEngineService.getLightMaterialComponent,
             LightMaterialEngineService.setLightMaterialDiffuseColor,
           ),
         ) :
      ();
  };

  let closeColorPick = LightMaterialCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let dragToSetMaterialTexture = LightMaterialDragTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeTexture = ((uiState, dispatchFunc), (), materialComponent) =>
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    ) {
    | None => ()
    | Some(_mapId) =>
      LightMaterialRemoveTextureEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (uiState, dispatchFunc),
        (),
        materialComponent,
      )
    };

  let blurShininessEvent =
      ((uiState, dispatchFunc), materialComponent, shininessValue) =>
    LightMaterialEngineService.getLightMaterialShininess(materialComponent)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, shininessValue) ?
      () :
      LightMaterialShininessBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        materialComponent,
        shininessValue,
      );

  let changeShininess = (isShowInspectorCanvas, materialComponent, value) => {
    StateEngineService.unsafeGetState()
    |> LightMaterialEngineService.setLightMaterialShininess(
         value,
         materialComponent,
       )
    |> StateLogicService.refreshEngineState;

    isShowInspectorCanvas ? {

      StateInspectorEngineService.unsafeGetState()
      |> InspectorEngineMaterialChangeValueUtils.changeMaterialValue(
           value,
           (
             GameObjectComponentEngineService.getLightMaterialComponent,
             LightMaterialEngineService.setLightMaterialShininess,
           ),
         );
    }:();

  };
};

let component = ReasonReact.statelessComponent("MainEditorLightMaterial");

let render =
    (
      (uiState, dispatchFunc),
      materialComponent,
      isShowInspectorCanvas,
      _self,
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
      getColorFunc={Method.getColor(materialComponent)}
      changeColorFunc={
        Method.changeColor(isShowInspectorCanvas, materialComponent)
      }
      closeColorPickFunc={
        Method.closeColorPick((uiState, dispatchFunc), materialComponent)
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
      removeTextureFunc=Method.removeTexture
      onDropFunc=Method.dragToSetMaterialTexture
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
      changeComponentValueFunc={
        Method.changeShininess(isShowInspectorCanvas, materialComponent)
      }
      blurValueFunc={
        Method.blurShininessEvent((uiState, dispatchFunc), materialComponent)
      }
      dragDropFunc={
        Method.blurShininessEvent((uiState, dispatchFunc), materialComponent)
      }
    />
  </article>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~materialComponent,
      ~isShowInspectorCanvas,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      materialComponent,
      isShowInspectorCanvas,
      self,
    ),
};