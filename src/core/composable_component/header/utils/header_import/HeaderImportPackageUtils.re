open Js.Promise;

open Js.Typed_array;

let _disposeAssets = () =>
  StateEditorService.getState()
  |> AssetTreeEditorService.deepDisposeAssetTreeRoot
  |> StateEditorService.setState;

let _readWPK = (wpk, dataView) => {
  let (sceneWDBAlignedByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. 0, dataView);

  let (asbAlignedByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  (
    wpk
    |> ArrayBuffer.slice(~start=byteOffset, ~end_=sceneWDBAlignedByteLength),
    wpk
    |> ArrayBuffer.slice(
         ~start=byteOffset + sceneWDBAlignedByteLength,
         ~end_=asbAlignedByteLength,
       ),
    dataView,
  );
};

let _getBasicMaterialData =
    (material, engineState)
    : ImportAssetType.basicMaterialData => {
  color: BasicMaterialEngineService.getColor(material, engineState),
  map: BasicMaterialEngineService.getBasicMaterialMap(material, engineState),
};

let _isBasicMaterialDataEqual = (data1, data2) => data1 == data2;

let _getLightMaterialData =
    (material, engineState)
    : ImportAssetType.lightMaterialData => {
  diffuseColor:
    LightMaterialEngineService.getLightMaterialDiffuseColor(
      material,
      engineState,
    ),
  diffuseMap:
    LightMaterialEngineService.getLightMaterialDiffuseMap(
      material,
      engineState,
    ),
  shininess:
    LightMaterialEngineService.getLightMaterialShininess(
      material,
      engineState,
    ),
};

let _isLightMaterialDataEqual = (data1, data2) => data1 == data2;

let _replaceToAssetMaterialComponent =
    (
      gameObject,
      materialMap,
      (
        unsafeGetMaterialComponentFunc,
        getMaterialDataFunc,
        isMaterialDataEqualFunc,
        disposeMaterialComponentFunc,
        addMaterialComponentFunc,
      ),
      engineState,
    ) => {
  let material = unsafeGetMaterialComponentFunc(gameObject, engineState);

  let materialData = getMaterialDataFunc(material, engineState);

  switch (
    materialMap
    |> SparseMapService.getValidValues
    |> SparseMapService.find(material =>
         isMaterialDataEqualFunc(
           getMaterialDataFunc(material, engineState),
           materialData,
         )
       )
  ) {
  | None => engineState
  | Some(assetMaterialComponent) =>
    engineState
    |> disposeMaterialComponentFunc(gameObject, material)
    |> addMaterialComponentFunc(gameObject, assetMaterialComponent)
  };
};

let _replaceGameObjectMaterialComponentToAssetMaterialComponent =
    (gameObject, (basicMaterialMap, lightMaterialMap), engineState) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    _replaceToAssetMaterialComponent(
      gameObject,
      basicMaterialMap,
      (
        GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
        _getBasicMaterialData,
        _isBasicMaterialDataEqual,
        GameObjectComponentEngineService.disposeBasicMaterialComponent,
        GameObjectComponentEngineService.addBasicMaterialComponent,
      ),
      engineState,
      /* let material =
           GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
             gameObject,
             engineState,
           );

         let materialData =
           _getBasicMaterialData(material, engineState);

         switch (
           basicMaterialMap
           |> SparseMapService.getValidValues
           |> SparseMapService.find((. material) =>
                _isBasicMaterialDataEqual(
                  _getBasicMaterialData(material, engineState),
                  materialData,
                )
              )
         ) {
         | None => engineState
         | Some(assetMaterialComponent) =>
           engineState
           |> GameObjectComponentEngineService.disposeBasicMaterialComponent(
                gameObject,
                material,
              )
           |> GameObjectComponentEngineService.addBasicMaterialComponent(
                gameObject,
                assetMaterialComponent,
              )
         }; */
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      _replaceToAssetMaterialComponent(
        gameObject,
        lightMaterialMap,
        (
          GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
          _getLightMaterialData,
          _isLightMaterialDataEqual,
          GameObjectComponentEngineService.disposeLightMaterialComponent,
          GameObjectComponentEngineService.addLightMaterialComponent,
        ),
        engineState,
      ) :
      engineState;

let _relateWDBGameObjectsAndAssets =
    (allGameObjectsArr, (basicMaterialMap, lightMaterialMap)) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let engineState =
    allGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           engineState
           |> _replaceGameObjectMaterialComponentToAssetMaterialComponent(
                gameObject,
                (basicMaterialMap, lightMaterialMap),
              )
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};

let _import = ({name, type_, result}: AssetNodeType.nodeResultType) => {
  _disposeAssets();

  let wpk = result |> FileReader.convertResultToArrayBuffer;

  let dataView = DataViewUtils.create(wpk);

  let (sceneWDB, asb, dataView) = _readWPK(wpk, dataView);

  let materialMapTupleRef =
    ref((
      WonderCommonlib.SparseMapService.createEmpty(),
      WonderCommonlib.SparseMapService.createEmpty(),
    ));

  SceneWDBUtils.importSceneWDB(sceneWDB)
  |> WonderBsMost.Most.map(_ => ())
  |> WonderBsMost.Most.concat(
       HeaderImportASBUtils.importASB(asb)
       |> WonderBsMost.Most.map(((allGameObjectsArr, materialMapTuple)) => {
            _relateWDBGameObjectsAndAssets(
              allGameObjectsArr,
              materialMapTuple,
            );

            materialMapTupleRef := materialMapTuple;

            ();
          }),
     )
  |> WonderBsMost.Most.tap(_ => {
       let engineState = StateEngineService.unsafeGetState();

       _relateWDBGameObjectsAndAssets(
         GameObjectEngineService.getAllGameObjects(
           SceneEngineService.getSceneGameObject(engineState),
           engineState,
         ),
         materialMapTupleRef^,
       );

       ();
     });
};

let importPackage = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None => ()
  | Some(file) =>
    let fileInfo: FileType.fileInfoType =
      file |> AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord;

    WonderBsMost.Most.fromPromise(
      Js.Promise.make((~resolve, ~reject) => {
        let reader = FileReader.createFileReader();

        FileReader.onload(reader, result =>
          resolve(.
            {
              name: fileInfo.name,
              type_: AssetTreeNodeUtils.getUploadFileType(fileInfo.name),
              result,
            }: AssetNodeType.nodeResultType,
          )
        );

        AssetTreeNodeUtils.readFileByTypeSync(reader, fileInfo);
      }),
    )
    |> WonderBsMost.Most.flatMap((fileResult: AssetNodeType.nodeResultType) =>
         _import(fileResult)
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => {
         dispatchFunc(
           AppStore.SceneTreeAction(
             SetSceneGraph(
               Some(
                 SceneTreeUtils.getSceneGraphDataFromEngine
                 |> StateLogicService.getStateToGetData,
               ),
             ),
           ),
         );
         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
         |> resolve;
       })
    |> ignore;

    ();
  };
};