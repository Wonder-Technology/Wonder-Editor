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
            initAssetBundleArrayBufferCacheFunc,
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
          initAssetBundleArrayBufferCacheFunc,
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
          initAssetBundleArrayBufferCacheFunc,
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
            initAssetBundleArrayBufferCacheFunc,
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
    open WonderBsMost;

    open Js.Typed_array;

    let initAssetBundleArrayBufferCache = (.) => Most.empty();

    let isAssetBundleArrayBufferCached =
      (. abRelativePath: string, hashId: string) => Most.just(false);

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
        Most.empty();
  };
};

let _buildDisposeGameObjectFunc = scriptAPIJsObj =>
  (. gameObject, engineState) => {
    let disposeGameObject = scriptAPIJsObj##disposeGameObject;

    let engineState = disposeGameObject(. gameObject, engineState);

    let engineState = engineState |> JobEngineService.execDisposeJob;

    engineState |> StateEngineService.setState |> ignore;

    SceneTreeSelectCurrentNodeUtils.clearCurrentData
    |> StateLogicService.getAndSetEditorState;

    UIStateService.getDispatch(
      (),
      AppStore.UpdateAction(
        Update([|UpdateStore.SceneTree, UpdateStore.Inspector|]),
      ),
    );

    StateEngineService.unsafeGetState();
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
    "disposeGameObject": _buildDisposeGameObjectFunc(scriptAPIJsObj),
    "getAssetBundlePath": AssetBundle.Path.getAssetBundlePath,
    "loadSABAndSetToState": AssetBundle.Load.loadSABAndSetToState,
    "loadAllDependencyRABAndSetToState": AssetBundle.Load.loadAllDependencyRABAndSetToState,
    "loadWABAndSetToState": AssetBundle.Load.loadWABAndSetToState,
    "loadAssetBundle": AssetBundle.Load.loadAssetBundle,
    "initAssetBundleArrayBufferCache": AssetBundle.Cache.initAssetBundleArrayBufferCache,
    "isAssetBundleArrayBufferCached": AssetBundle.Cache.isAssetBundleArrayBufferCached,
    "getAssetBundleArrayBufferCache": AssetBundle.Cache.getAssetBundleArrayBufferCache,
    "cacheAssetBundleArrayBuffer": AssetBundle.Cache.cacheAssetBundleArrayBuffer,
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