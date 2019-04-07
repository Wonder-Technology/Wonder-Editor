let buildHeader = uiState =>
  ReactTestRenderer.create(
    <Header uiState dispatchFunc={TestTool.getDispatch()} />,
  );

let buildHeaderNotice = () =>
  ReactTestRenderer.create(
    <HeaderNotice
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
    />,
  );

let buildLeftHeader = () =>
  ReactTestRenderer.create(
    <MainEditorLeftHeader
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
    />,
  );

let buildSceneTree = uiState =>
  ReactTestRenderer.create(
    <MainEditorSceneTree uiState dispatchFunc={TestTool.getDispatch()} />,
  );

let buildConsole =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  ReactTestRenderer.create(<MainEditorConsole uiState dispatchFunc />);

let buildBottom =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  ReactTestRenderer.create(
    <MainEditorBottomComponents uiState dispatchFunc />,
  );

let buildBottomHeader =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  ReactTestRenderer.create(<MainEditorBottomHeader uiState dispatchFunc />);

let buildCameraProjection = () =>
  ReactTestRenderer.create(
    <MainEditorCameraProjection
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
    />,
  );

let buildCameraView = uiState =>
  ReactTestRenderer.create(
    <MainEditorCameraView uiState dispatchFunc={TestTool.getDispatch()} />,
  );

let buildInspectorComponent = (uiState, addableComponentConfig) =>
  ReactTestRenderer.create(
    <MainEditorInspector
      uiState
      dispatchFunc={TestTool.getDispatch()}
      addableComponentConfig
    />,
  );

let buildMeshRenderer = uiState =>
  ReactTestRenderer.create(
    <MainEditorMeshRenderer uiState dispatchFunc={TestTool.getDispatch()} />,
  );

let buildGeometry =
    (
      ~geometryComponent,
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~isShowGeometryGroup=false,
      (),
    ) =>
  ReactTestRenderer.create(
    <MainEditorGeometry
      uiState
      dispatchFunc
      currentSceneTreeNode=gameObject
      geometryComponent
      isShowGeometryGroup
    />,
  );

let buildMainEditorTransformComponent = (uiState, transformComponent) =>
  ReactTestRenderer.create(
    <MainEditorTransform
      uiState
      dispatchFunc={TestTool.getDispatch()}
      gameObject={GameObjectTool.unsafeGetCurrentSceneTreeNode()}
      transformComponent
    />,
  );

let buildMaterial =
    (
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~isShowMaterialGroup=false,
      (),
    ) =>
  ReactTestRenderer.create(
    <MainEditorMaterial
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
      currentSceneTreeNode={GameObjectTool.unsafeGetCurrentSceneTreeNode()}
      isShowMaterialGroup
    />,
  );

let buildMaterialMap =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~isShowTextureGroup=false,
      ~materialComponent=GameObjectTool.getCurrentSceneTreeNodeMaterial(),
      (),
    ) =>
  ReactTestRenderer.create(
    <MainEditorMaterialMap
      uiState
      dispatchFunc
      materialComponent
      label="Diffuse map"
      getMapFunc=LightMaterialEngineService.getLightMaterialDiffuseMap
      removeTextureFunc=InspectorMaterialUtils.removeTexture
      onDropFunc=InspectorMaterialUtils.dragToSetLightMaterialTexture
      isShowTextureGroup
    />,
  );

let buildBasicMaterialForGameObject = materialComponent =>
  ReactTestRenderer.create(
    <MainEditorBasicMaterialForGameObject
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
      materialComponent
    />,
  );

let buildLightMaterialForGameObject = materialComponent =>
  ReactTestRenderer.create(
    <MainEditorLightMaterialForGameObject
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
      materialComponent
    />,
  );

let buildLight = () =>
  ReactTestRenderer.create(
    <MainEditorLight
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
    />,
  );

let buildDirectionLight = lightComponent =>
  ReactTestRenderer.create(
    <MainEditorDirectionLight
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
      lightComponent
    />,
  );

let buildPointLight = lightComponent =>
  ReactTestRenderer.create(
    <MainEditorPointLight
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
      lightComponent
    />,
  );

let buildAssetComponent = () =>
  ReactTestRenderer.create(
    <MainEditorAsset
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
    />,
  );

let buildAssetTree = () =>
  ReactTestRenderer.create(
    <MainEditorAssetTree
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
      dragImg={DomHelper.createElement("img")}
    />,
  );
let buildAssetChildrenNode = (~debounceTime=10, ()) =>
  ReactTestRenderer.create(
    <MainEditorAssetChildrenNode
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
      dragImg={DomHelper.createElement("img")}
      debounceTime
    />,
  );

let buildController = () =>
  ReactTestRenderer.create(
    <Controller
      uiState={TestTool.buildEmptyAppState()}
      dispatchFunc={TestTool.getDispatch()}
    />,
  );

/* let buildUIArray = uiArr =>
   ReactTestRenderer.create(ReasonReact.array(uiArr)); */

let buildUI = ui => ReactTestRenderer.create(ui);

let buildScriptAttributeInspectorComponent =
    (
      ~currentNodeId,
      ~name,
      ~attribute,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~renameFunc=AssetTreeInspectorTool.Rename.renameAssetNode(
                    (uiState, dispatchFunc),
                    currentNodeId,
                  ),
      (),
    ) =>
  ReactTestRenderer.create(
    <ScriptAttributeInspector
      uiState
      dispatchFunc
      currentNodeId
      name
      attribute
      renameFunc
    />,
  );