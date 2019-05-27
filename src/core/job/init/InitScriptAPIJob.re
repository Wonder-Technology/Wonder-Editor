module DisposeGameObject = {
  let handleEditorData = (gameObject, engineState, editorState) => {
    let editorState =
      editorState |> SceneTreeSelectCurrentNodeUtils.clearCurrentData;

    let editorState =
      switch (
        engineState
        |> GameObjectComponentEngineService.getBasicCameraViewComponent(
             gameObject,
           )
      ) {
      | Some(targetRemoveBasicCameraView) =>
        GameViewEditorService.isActiveBasicCameraView(
          targetRemoveBasicCameraView,
          editorState,
        ) ?
          GameViewEditorService.removeActivedBasicCameraView(editorState) :
          editorState
      | None => editorState
      };

    let editorState =
      switch (
        engineState
        |> GameObjectComponentEngineService.getGeometryComponent(gameObject)
      ) {
      | Some(geometry) =>
        editorState |> PickingEditorService.removeSphereShape(geometry)
      | None => editorState
      };

    /* TODO optimize: only clear material->maps cache */
    let editorState =
      editorState |> SourceTextureCacheInspectorCanvasEditorService.clearCache;

    editorState;
  };

  let dispatch = () =>
    UIStateService.getDispatch(
      (),
      AppStore.UpdateAction(
        Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
      ),
    );

  let buildDisposeGameObjectFunc = scriptAPIJsObj =>
    (. gameObject, engineState) => {
      let disposeGameObject = scriptAPIJsObj##disposeGameObject;

      let engineState = disposeGameObject(. gameObject, engineState);

      let engineState = engineState |> JobEngineService.execDisposeJob;

      let editorState =
        handleEditorData(
          gameObject,
          engineState,
          StateEditorService.getState(),
        );

      editorState |> StateEditorService.setState |> ignore;
      engineState |> StateEngineService.setState |> ignore;

      dispatch();

      StateEngineService.unsafeGetState();
    };
};

module AssetBundle = {
  open Js.Promise;

  module Path = {
    let getAssetBundlePath = (.) => "";
  };

  module Load = {
    let _buildFakeFetchArrayBufferResponse =
        arrayBuffer: Js.Promise.t(Fetch.Response.t) =>
      {
        "ok": true,
        "status": "",
        "statusText": "_buildFakeFetchArrayBufferResponse error",
        "arrayBuffer": () => arrayBuffer |> resolve,
      }
      |> resolve
      |> Obj.magic;

    let rec _findAssetBundbleNodeData =
            (nodeNameHierachy, folderNode, editorState)
            : NodeAssetType.assetBundleNodeData => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                test(
                  Log.buildAssertMessage(
                    ~expect={j|nodeNameHierachy.length > 0|j},
                    ~actual={j|not|j},
                  ),
                  () =>
                  nodeNameHierachy |> Js.Array.length > 0
                )
              )
            )
          ),
        StateEditorService.getStateIsDebug(),
      );

      nodeNameHierachy |> Js.Array.length > 1 ?
        {
          let nextFolderNodeName =
            ArrayService.unsafeGetFirst(nodeNameHierachy);

          let nextFolderNode =
            FolderNodeAssetService.getChildrenNodes(folderNode)
            |> Js.Array.find(childNode =>
                 FolderNodeAssetService.isFolderNode(childNode)
                 && FolderNodeAssetService.getNodeName(
                      FolderNodeAssetService.getNodeData(childNode),
                    )
                 === nextFolderNodeName
               )
            |> OptionService.unsafeGet;

          _findAssetBundbleNodeData(
            nodeNameHierachy |> Js.Array.sliceFrom(1),
            nextFolderNode,
            editorState,
          );
        } :
        {
          let assetBundleNodeName =
            ArrayService.unsafeGetFirst(nodeNameHierachy)
            |> FileNameService.getBaseName;

          FolderNodeAssetService.getChildrenNodes(folderNode)
          |> Js.Array.find(childNode =>
               AssetBundleNodeAssetService.isAssetBundleNode(childNode)
               && AssetBundleNodeAssetService.getNodeName(
                    AssetBundleNodeAssetService.getNodeData(childNode),
                  )
               === assetBundleNodeName
             )
          |> OptionService.unsafeGet
          |> AssetBundleNodeAssetService.getNodeData;
        };
    };

    let _buildFakeFetchAssetBundle =
      (. abRelativePath) => {
        let editorState = StateEditorService.getState();

        let nodeNameHierachy = abRelativePath |> Js.String.split("/");

        _findAssetBundbleNodeData(
          nodeNameHierachy,
          RootTreeAssetEditorService.getRootNode(editorState),
          editorState,
        ).
          assetBundle
        |> _buildFakeFetchArrayBufferResponse;
      };

    let loadSABAndSetToState =
        (
          sabRelativePath,
          wholeManifest,
          (
            getAssetBundlePathFunc,
            isAssetBundleArrayBufferCachedFunc,
            getAssetBundleArrayBufferCacheFunc,
            cacheAssetBundleArrayBufferFunc,
          ),
        ) =>
      Wonderjs.ImportABSystem.SAB.loadSABAndSetToState(
        sabRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
          _buildFakeFetchAssetBundle,
        ),
      );

    let loadAllDependencyRABAndSetToState =
      (.
        abRelativePath,
        wholeManifest,
        (
          getAssetBundlePathFunc,
          isAssetBundleArrayBufferCachedFunc,
          getAssetBundleArrayBufferCacheFunc,
          cacheAssetBundleArrayBufferFunc,
        ),
      ) =>
        Wonderjs.ImportABSystem.RAB.loadAllDependencyRABAndSetToState(
          abRelativePath,
          wholeManifest,
          (
            getAssetBundlePathFunc,
            isAssetBundleArrayBufferCachedFunc,
            getAssetBundleArrayBufferCacheFunc,
            cacheAssetBundleArrayBufferFunc,
            _buildFakeFetchAssetBundle,
          ),
        );

    let loadWABAndSetToState =
      (. wabRelativePath, getAssetBundlePathFunc) =>
        Wonderjs.ImportABSystem.WAB.loadWABAndSetToState(
          wabRelativePath,
          (getAssetBundlePathFunc, _buildFakeFetchAssetBundle),
        );

    let loadAssetBundle =
      (. abPath) =>
        Wonderjs.LoadABSystem.load(abPath, _buildFakeFetchAssetBundle);
  };
  module Cache = {
    open Js.Typed_array;

    let initAssetBundleArrayBufferCache =
      (.) =>
        Js.Promise.make((~resolve, ~reject) =>
          (Wonderjs.PromiseType.convertResolveToUnit(resolve))(.)
        );

    let isAssetBundleArrayBufferCached =
      (. abRelativePath: string, hashId: string) =>
        Js.Promise.make((~resolve, ~reject) => resolve(. false));

    let getAssetBundleArrayBufferCache =
      (. abRelativePath: string) =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="getAssetBundleArrayBufferCache",
            ~description={j|need rewrite|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        );

    let cacheAssetBundleArrayBuffer =
      (. abRelativePath: string, ab: ArrayBuffer.t, hashId: string) =>
        Js.Promise.make((~resolve, ~reject) =>
          (Wonderjs.PromiseType.convertResolveToUnit(resolve))(.)
        );
  };

  module Editor = {
    let _addGameObjectAllComponentTypeToMap =
        (gameObject, engineState, editorState) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                test(
                  Log.buildAssertMessage(
                    ~expect=
                      {j|gameObject: $gameObject should has transform component|j},
                    ~actual={j|not|j},
                  ),
                  () =>
                  GameObjectComponentEngineService.hasTransformComponent(
                    gameObject,
                    engineState,
                  )
                  |> assertTrue
                )
              )
            )
          ),
        StateEditorService.getStateIsDebug(),
      );

      let editorState =
        editorState
        |> InspectorEditorService.addComponentTypeToMap(
             gameObject,
             InspectorComponentType.Transform,
           );
      let editorState =
        InspectorRenderGroupUtils.hasRenderGroupComponents(
          gameObject,
          engineState,
        ) ?
          editorState
          |> InspectorEditorService.addComponentTypeToMap(
               gameObject,
               InspectorComponentType.RenderGroup,
             ) :
          editorState;
      let editorState =
        CameraGroupEngineService.hasCameraGroupComponents(
          gameObject,
          (
            GameObjectComponentEngineService.hasBasicCameraViewComponent,
            GameObjectComponentEngineService.hasPerspectiveCameraProjectionComponent,
          ),
          engineState,
        ) ?
          editorState
          |> InspectorEditorService.addComponentTypeToMap(
               gameObject,
               InspectorComponentType.CameraGroup,
             ) :
          editorState;
      let editorState =
        GameObjectComponentEngineService.hasArcballCameraControllerComponent(
          gameObject,
          engineState,
        ) ?
          editorState
          |> InspectorEditorService.addComponentTypeToMap(
               gameObject,
               InspectorComponentType.ArcballCameraController,
             ) :
          editorState;
      let editorState =
        GameObjectComponentEngineService.hasGeometryComponent(
          gameObject,
          engineState,
        ) ?
          editorState
          |> InspectorEditorService.addComponentTypeToMap(
               gameObject,
               InspectorComponentType.Geometry,
             ) :
          editorState;
      let editorState =
        LightEngineService.hasLightComponent(gameObject, engineState) ?
          editorState
          |> InspectorEditorService.addComponentTypeToMap(
               gameObject,
               InspectorComponentType.Light,
             ) :
          editorState;
      let editorState =
        GameObjectComponentEngineService.hasSourceInstanceComponent(
          gameObject,
          engineState,
        ) ?
          editorState
          |> InspectorEditorService.addComponentTypeToMap(
               gameObject,
               InspectorComponentType.SourceInstance,
             ) :
          editorState;
      let editorState =
        GameObjectComponentEngineService.hasScriptComponent(
          gameObject,
          engineState,
        ) ?
          editorState
          |> InspectorEditorService.addComponentTypeToMap(
               gameObject,
               InspectorComponentType.Script,
             ) :
          editorState;

      editorState;
    };

    let buildAddSABSceneGameObjectChildrenToSceneFunc = scriptAPIJsObj =>
      (. sabSceneGameObject, engineState) => {
        let addSABSceneGameObjectChildrenToScene =
          scriptAPIJsObj##addSABSceneGameObjectChildrenToScene;

        let editorState = StateEditorService.getState();

        let editorState =
          HierarchyGameObjectEngineService.getAllChildren(
            sabSceneGameObject,
            engineState,
          )
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. editorState, gameObject) =>
                 _addGameObjectAllComponentTypeToMap(
                   gameObject,
                   engineState,
                   editorState,
                 ),
               editorState,
             );

        let engineState =
          addSABSceneGameObjectChildrenToScene(.
            sabSceneGameObject,
            engineState,
          );

        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        UIStateService.getDispatch(
          (),
          AppStore.UpdateAction(Update([|UpdateStore.SceneTree|])),
        );

        StateEngineService.unsafeGetState();
      };

    let _getActiveBasicCameraViews = (gameObjectArr, engineState) =>
      gameObjectArr
      |> Js.Array.map(gameObject =>
           engineState
           |> GameObjectComponentEngineService.getBasicCameraViewComponent(
                gameObject,
              )
         )
      |> Js.Array.filter(basicCameraViewOpt =>
           switch (basicCameraViewOpt) {
           | None => false
           | Some(basicCameraView) =>
             BasicCameraViewEngineService.isActiveBasicCameraView(
               basicCameraView,
               engineState,
             )
           }
         )
      |> WonderLog.Contract.ensureCheck(
           activeBasicCameraViews =>
             WonderLog.(
               Contract.(
                 Operators.(
                   test(
                     Log.buildAssertMessage(
                       ~expect=
                         {j|only has zero or one active basic camera view|j},
                       ~actual={j|has more|j},
                     ),
                     () =>
                     activeBasicCameraViews |> Js.Array.length <= 1
                   )
                 )
               )
             ),
           StateEditorService.getStateIsDebug(),
         );

    let _setActiveBasicCameraViewEditorData =
        (gameObjectArr, engineState, editorState) =>
      switch (
        _getActiveBasicCameraViews(gameObjectArr, engineState)
        |> ArrayService.getFirst
      ) {
      | None => editorState
      | Some(activeBasicCameraView) =>
        GameViewEditorService.setActivedBasicCameraView(
          activeBasicCameraView,
          editorState,
        )
      };

    let buildSetSABSceneGameObjectToBeSceneFunc = scriptAPIJsObj =>
      (. sabSceneGameObject, engineState) => {
        WonderLog.Contract.requireCheck(
          () =>
            WonderLog.(
              Contract.(
                Operators.(
                  test(
                    Log.buildAssertMessage(
                      ~expect=
                        {j|sabSceneGameObject shouldn't has basicCameraView component|j},
                      ~actual={j|has|j},
                    ),
                    () =>
                    GameObjectComponentEngineService.hasBasicCameraViewComponent(
                      sabSceneGameObject,
                      engineState,
                    )
                    |> assertFalse
                  )
                )
              )
            ),
          StateEditorService.getStateIsDebug(),
        );

        let setSABSceneGameObjectToBeScene =
          scriptAPIJsObj##setSABSceneGameObjectToBeScene;

        let sabSceneGameObjectChildren =
          HierarchyGameObjectEngineService.getAllChildren(
            sabSceneGameObject,
            engineState,
          );

        let editorState = StateEditorService.getState();

        let editorState =
          ArrayService.fastConcat(
            [|sabSceneGameObject|],
            sabSceneGameObjectChildren,
          )
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. editorState, gameObject) =>
                 _addGameObjectAllComponentTypeToMap(
                   gameObject,
                   engineState,
                   editorState,
                 ),
               editorState,
             );

        let editorState =
          editorState
          |> GameViewEditorService.removeActivedBasicCameraView
          |> _setActiveBasicCameraViewEditorData(
               sabSceneGameObjectChildren,
               engineState,
             );

        let editorState = editorState |> PickingEditorService.clearSphereShape;

        let editorState =
          editorState
          |> SourceTextureCacheInspectorCanvasEditorService.clearCache;

        let engineState =
          engineState
          |> GameObjectEngineService.setGameObjectIsRoot(
               sabSceneGameObject,
               false,
             );

        let engineState =
          setSABSceneGameObjectToBeScene(. sabSceneGameObject, engineState);

        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        UIStateService.getDispatch(
          (),
          AppStore.UpdateAction(
            Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
          ),
        );

        StateEngineService.unsafeGetState();
      };

    let buildDisposeSceneAllChildrenFunc = scriptAPIJsObj =>
      (. engineState) => {
        let disposeSceneAllChildren = scriptAPIJsObj##disposeSceneAllChildren;
        let editorState =
          HierarchyGameObjectEngineService.getAllGameObjects(
            SceneEngineService.getSceneGameObject(engineState),
            engineState,
          )
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. editorState, gameObject) =>
                 DisposeGameObject.handleEditorData(
                   gameObject,
                   engineState,
                   editorState,
                 ),
               StateEditorService.getState(),
             );

        let editorState = editorState |> PickingEditorService.clearSphereShape;

        let engineState = disposeSceneAllChildren(. engineState);

        let engineState = engineState |> JobEngineService.execDisposeJob;

        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        DisposeGameObject.dispatch();

        StateEngineService.unsafeGetState();
      };
  };
};

let _extend = [%raw
  (destination, source) => {|
                for (let property in source) {
                    destination[property] = source[property];
                }

                return destination;
    |}
];

let _rewriteScriptAPIJsObj = scriptAPIJsObj =>
  {
    /* TODO improve: should only set MainEditorTransform->local position values
       "setTransformLocalPosition": scriptAPIJsObj##setTransformLocalPosition, */
    "disposeGameObject":
      DisposeGameObject.buildDisposeGameObjectFunc(scriptAPIJsObj),
    "getAssetBundlePath": AssetBundle.Path.getAssetBundlePath,
    "loadSABAndSetToState": AssetBundle.Load.loadSABAndSetToState,
    "loadAllDependencyRABAndSetToState": AssetBundle.Load.loadAllDependencyRABAndSetToState,
    "loadWABAndSetToState": AssetBundle.Load.loadWABAndSetToState,
    "loadAssetBundle": AssetBundle.Load.loadAssetBundle,
    "initAssetBundleArrayBufferCache": AssetBundle.Cache.initAssetBundleArrayBufferCache,
    "isAssetBundleArrayBufferCached": AssetBundle.Cache.isAssetBundleArrayBufferCached,
    "getAssetBundleArrayBufferCache": AssetBundle.Cache.getAssetBundleArrayBufferCache,
    "cacheAssetBundleArrayBuffer": AssetBundle.Cache.cacheAssetBundleArrayBuffer,
    "addSABSceneGameObjectChildrenToScene":
      AssetBundle.Editor.buildAddSABSceneGameObjectChildrenToSceneFunc(
        scriptAPIJsObj,
      ),
    "setSABSceneGameObjectToBeScene":
      AssetBundle.Editor.buildSetSABSceneGameObjectToBeSceneFunc(
        scriptAPIJsObj,
      ),
    "disposeSceneAllChildren":
      AssetBundle.Editor.buildDisposeSceneAllChildrenFunc(scriptAPIJsObj),
  }
  |> _extend(
       scriptAPIJsObj
       |> Obj.magic
       |> WonderCommonlib.MutableHashMapService.copy,
     );

let initJob =
    (_, ({apiRecord}: Wonderjs.StateDataMainType.state) as engineState) => {
  ...engineState,
  apiRecord: {
    ...apiRecord,
    scriptAPIJsObj:
      _rewriteScriptAPIJsObj(apiRecord.scriptAPIJsObj |> Obj.magic),
  },
};