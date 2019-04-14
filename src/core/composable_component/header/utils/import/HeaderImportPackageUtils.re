open Js.Promise;

open Js.Typed_array;

let _disposeAssets = () => {
  let (editorState, engineState) =
    DisposeTreeAssetLogicService.disposeTree((
      StateEditorService.getState(),
      StateEngineService.unsafeGetState(),
    ));

  editorState |> StateEditorService.setState |> ignore;

  engineState |> StateEngineService.setState |> ignore;
};

let _readHeader = dataView => {
  let (version, byteOffset) = DataViewUtils.getUint32_1(. 0, dataView);

  let (sceneWDBByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  let (asbByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  (byteOffset, version, sceneWDBByteLength, asbByteLength);
};

let _readWPK = (wpk, dataView) => {
  let (byteOffset, version, sceneWDBByteLength, asbByteLength) =
    _readHeader(dataView);

  (
    version,
    wpk
    |> ArrayBuffer.slice(
         ~start=byteOffset,
         ~end_=byteOffset + sceneWDBByteLength,
       ),
    wpk
    |> ArrayBuffer.sliceFrom(
         byteOffset + (sceneWDBByteLength |> BufferUtils.alignedLength),
       ),
    dataView,
  );
};

let _initAssetTreeRoot = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  /* let (assetTree, editorState) =
     editorState |> AssetTreeUtils.initRootAssetTree(_, engineState); */

  editorState
  |> TreeAssetEditorService.createTree
  |> StateEditorService.setState
  /* editorState
     |> TreeRootAssetEditorService.setAssetTreeRoot(assetTree)
     |> StateEditorService.setState */
  |> ignore;

  engineState |> StateEngineService.setState |> ignore;

  ();
};

let _reInitDefaultMaterials = (editorState, engineState) => {
  let engineState =
    [|
      MaterialDataAssetEditorService.unsafeGetDefaultBasicMaterial(
        editorState,
      ),
    |]
    |> BasicMaterialEngineService.reInitMaterials(_, engineState);

  [|
    MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(editorState),
  |]
  |> LightMaterialEngineService.reInitMaterials(_, engineState);
};

let _checkMaterial = (gameObjectMaterials, type_, (editorState, engineState)) => {
  let materialAssets =
    MaterialNodeAssetEditorService.getMaterialComponentsByType(
      type_,
      editorState,
    );

  gameObjectMaterials
  |> Js.Array.filter(gameObjectMaterial =>
       materialAssets
       |> Js.Array.includes(gameObjectMaterial)
       || MaterialAssetLogicService.isDefaultMaterial(
            gameObjectMaterial,
            type_,
            (editorState, engineState),
          )
     )
  |> Js.Array.length === (gameObjectMaterials |> Js.Array.length);
};

let _checkMaterials = (where, gameObjects) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect=
              {j|all $where->materials should be material assets or default materials|j},
            ~actual={j|not|j},
          ),
          () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            (
              _checkMaterial(
                GameObjectEngineService.getAllLightMaterials(
                  gameObjects,
                  engineState,
                ),
                MaterialDataAssetType.LightMaterial,
                (editorState, engineState),
              )
              && _checkMaterial(
                   GameObjectEngineService.getAllBasicMaterials(
                     gameObjects,
                     engineState,
                   ),
                   MaterialDataAssetType.BasicMaterial,
                   (editorState, engineState),
                 )
            )
            |> assertTrue;
          },
        )
      )
    )
  );

let _checkSceneMaterials = () =>
  _checkMaterials(
    "scene gameObjects",
    SceneEngineService.getSceneGameObject(StateEngineService.unsafeGetState())
    |> HierarchyGameObjectEngineService.getAllGameObjects(
         _,
         StateEngineService.unsafeGetState(),
       ),
  );

let _checkWDBGameObjectMaterials = allWDBGameObjectArr =>
  _checkMaterials("wdb gameObjects", allWDBGameObjectArr);

let _checkTextures = (where, gameObjects) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect={j|all $where->textures should be texture assets|j},
            ~actual={j|not|j},
          ),
          () => {
            let gameObjectTextures =
              GameObjectEngineService.getAllLightMaterials(
                gameObjects,
                StateEngineService.unsafeGetState(),
              )
              |> Js.Array.map(material =>
                   LightMaterialEngineService.getLightMaterialDiffuseMap(
                     material,
                     StateEngineService.unsafeGetState(),
                   )
                 )
              |> Js.Array.filter(diffuseMap => diffuseMap |> Js.Option.isSome)
              |> Js.Array.map(diffuseMap =>
                   diffuseMap |> OptionService.unsafeGet
                 );

            gameObjectTextures |> Js.Array.sortInPlace;

            let textureAssets =
              TextureNodeAssetEditorService.getTextureComponents(
                StateEditorService.getState(),
              );

            textureAssets |> Js.Array.sortInPlace;

            ArrayService.isInclude(textureAssets, gameObjectTextures)
            |> assertTrue;
          },
        )
      )
    )
  );

let _checkSceneTextures = () =>
  _checkTextures(
    "scene gameObjects",
    SceneEngineService.getSceneGameObject(StateEngineService.unsafeGetState())
    |> HierarchyGameObjectEngineService.getAllGameObjects(
         _,
         StateEngineService.unsafeGetState(),
       ),
  );

let _checkWDBGameObjectTextures = allWDBGameObjectArr =>
  _checkTextures("wdb gameObjects", allWDBGameObjectArr);

let _init = allWDBGameObjectArrRef => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let engineState = engineState |> ShaderEngineService.clearInitShaderCache;

  let engineState = _reInitDefaultMaterials(editorState, engineState);

  ArrayService.fastConcat(
    allWDBGameObjectArrRef^,
    HierarchyGameObjectEngineService.getAllGameObjects(
      SceneEngineService.getSceneGameObject(engineState),
      engineState,
    ),
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         GameObjectEngineService.initGameObject(gameObject, engineState),
       engineState,
     );
};

let _import = result => {
  _disposeAssets();

  StateEngineService.unsafeGetState()
  |> JobEngineService.execDisposeJob
  |> ReallocateCPUMemoryJob.reallocate(0.1)
  |> StateEngineService.setState
  |> ignore;

  _initAssetTreeRoot();

  PickingEditorService.clearSphereShape
  |> StateLogicService.getAndSetEditorState;

  let wpk = result |> FileReader.convertResultToArrayBuffer;

  let dataView = DataViewUtils.create(wpk);

  let (version, sceneWDB, asb, dataView) = _readWPK(wpk, dataView);

  let materialMapTupleRef =
    ref((
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    ));

  let asbImageUint8ArrayDataMapRef =
    ref(WonderCommonlib.ImmutableSparseMapService.createEmpty());

  let allWDBGameObjectArrRef = ref([||]);

  let wdbAssetGameObjectGeometryAssetArrRef = ref([||]);

  let scriptDataMapTupleRef =
    ref((
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
    ));

  let engineState = StateEngineService.unsafeGetState();

  HeaderImportASBUtils.importASB(asb)
  |> WonderBsMost.Most.map(
       (
         (
           (allWDBGameObjectArr, asbImageUint8ArrayDataMap),
           materialMapTuple,
           scriptDataMapTuple,
         ),
       ) => {
       ImportPackageRelateGameObjectAndAssetUtils.relateWDBAssetGameObjectsAndAssets(
         allWDBGameObjectArr,
         materialMapTuple,
         scriptDataMapTuple,
         asbImageUint8ArrayDataMap,
       );

       let editorState = StateEditorService.getState();
       let engineState = StateEngineService.unsafeGetState();

       allWDBGameObjectArrRef := allWDBGameObjectArr;
       materialMapTupleRef := materialMapTuple;
       wdbAssetGameObjectGeometryAssetArrRef :=
         GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
           allWDBGameObjectArr,
           (editorState, engineState),
         );
       scriptDataMapTupleRef := scriptDataMapTuple;
       asbImageUint8ArrayDataMapRef := asbImageUint8ArrayDataMap;

       editorState |> StateEditorService.setState |> ignore;
       engineState |> StateEngineService.setState |> ignore;

       ()
       |> WonderLog.Contract.ensureCheck(
            r => {
              _checkWDBGameObjectTextures(allWDBGameObjectArr);
              _checkWDBGameObjectMaterials(allWDBGameObjectArr);
            },
            StateEditorService.getStateIsDebug(),
          );
     })
  |> WonderBsMost.Most.concat(
       MostUtils.callStreamFunc(() =>
         SceneWDBUtils.importSceneWDB(sceneWDB)
         |> WonderBsMost.Most.map(
              ((sceneGameObject, _sceneGameObjectImageUint8ArrayDataMap)) => {
              WonderLog.Contract.requireCheck(
                () =>
                  WonderLog.(
                    Contract.(
                      Operators.(
                        test(
                          Log.buildAssertMessage(
                            ~expect=
                              {j|sceneGameObjectImageUint8ArrayDataMap be empty|j},
                            ~actual={j|not|j},
                          ),
                          () =>
                          _sceneGameObjectImageUint8ArrayDataMap
                          |> WonderCommonlib.ImmutableSparseMapService.length
                          == 0
                        )
                      )
                    )
                  ),
                StateEditorService.getStateIsDebug(),
              );

              ImportPackageRelateGameObjectAndAssetUtils.relateSceneWDBGameObjectsAndAssets(
                HierarchyGameObjectEngineService.getAllGameObjects(
                  sceneGameObject,
                )
                |> StateLogicService.getEngineStateToGetData,
                asbImageUint8ArrayDataMapRef^,
                materialMapTupleRef^,
                wdbAssetGameObjectGeometryAssetArrRef^,
                scriptDataMapTupleRef^,
              );

              ();
            })
       ),
     )
  |> WonderBsMost.Most.concat(
       MostUtils.callFunc(() => {
         WonderLog.Contract.requireCheck(
           () => {
             _checkSceneTextures();
             _checkSceneMaterials();
           },
           StateEditorService.getStateIsDebug(),
         );

         _init(allWDBGameObjectArrRef) |> StateLogicService.refreshEngineState;
       }),
     );
};

let _handleIsRun = (dispatchFunc, languageType, editorState) => {
  ConsoleUtils.warn(
    LanguageUtils.getMessageLanguageDataByType(
      "header-import-package",
      languageType,
    ),
    editorState,
  );

  Js.Promise.make((~resolve, ~reject) =>
    resolve(.
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.NoUpdate|]))),
    )
  );
};

let _readFile = (fileInfo: FileType.fileInfoType, resolve) => {
  let reader = FileReader.createFileReader();

  FileReader.onload(reader, result =>
    resolve(.
      {
        name: fileInfo.name,
        type_: LoadAssetUtils.getUploadPackageType(fileInfo.name),
        result,
      }: NodeAssetType.nodeResultType,
    )
  );

  LoadAssetUtils.readPakckageByTypeSync(reader, fileInfo);
};

let _dispatch = dispatchFunc =>
  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])));

let importPackage = (dispatchFunc, event) => {
  let editorState = StateEditorService.getState();
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  StateEditorService.getIsRun() ?
    _handleIsRun(dispatchFunc, languageType, editorState) :
    {
      let e = ReactEventType.convertReactFormEventToJsEvent(event);
      EventHelper.preventDefault(e);

      switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
      | None =>
        Js.Promise.make((~resolve, ~reject) =>
          resolve(.
            dispatchFunc(
              AppStore.UpdateAction(Update([|UpdateStore.NoUpdate|])),
            ),
          )
        )
      | Some(file) =>
        let fileInfo: FileType.fileInfoType =
          file |> FileReader.convertFileJsObjectToFileInfoRecord;

        WonderBsMost.Most.fromPromise(
          Js.Promise.make((~resolve, ~reject) =>
            _readFile(fileInfo, resolve)
          ),
        )
        |> WonderBsMost.Most.flatMap(
             (fileResult: NodeAssetType.nodeResultType) =>
             _import(fileResult.result)
           )
        |> WonderBsMost.Most.drain
        |> then_(_ => {
             StackHistoryService.clearAllStack(
               AllStateData.getHistoryState(),
             );

             let engineState: Wonderjs.StateDataMainType.state =
               StateEngineService.unsafeGetState();
             let editorState = StateEditorService.getState();

             _dispatch(dispatchFunc) |> resolve;
           });
      };
    };
};