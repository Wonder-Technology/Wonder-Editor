open Js.Promise;

open Js.Typed_array;

let _disposeAssets = () =>
  StateEditorService.getState()
  |> AssetTreeEditorService.deepDisposeAssetTreeRoot
  |> StateEditorService.setState;

let _readWPK = (wpk, dataView) => {
  let (sceneWDBByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. 0, dataView);

  let (asbByteLength, byteOffset) =
    DataViewUtils.getUint32_1(. byteOffset, dataView);

  (
    wpk
    |> ArrayBuffer.slice(
         ~start=byteOffset,
         ~end_=byteOffset + sceneWDBByteLength,
       ),
    wpk
    |> ArrayBuffer.sliceFrom(
         byteOffset + sceneWDBByteLength |> BufferUtils.alignedLength,
       ),
    dataView,
  );
};

let _isValueEqual = (key1, key2, getFunc, engineState) =>
  getFunc(key1, engineState)
  |>
  WonderLog.Log.print == (getFunc(key2, engineState) |> WonderLog.Log.print);

let _isBasicMaterialDataEqual = (material1, material2, engineState) =>
  _isValueEqual(
    material1,
    material2,
    BasicMaterialEngineService.getBasicMaterialName,
    engineState,
  )
  && _isValueEqual(
       material1,
       material2,
       BasicMaterialEngineService.getColor,
       engineState,
     );

let _findTextureNodeData = (texture, editorState) =>
  AssetTextureNodeMapEditorService.getValidValues(editorState)
  |> SparseMapService.find(
       ({textureComponent}: AssetNodeType.textureResultType) =>
       textureComponent === texture
     );

/* let _findImageNodeData = (texture, editorState) =>
   switch (_findTextureNodeData(texture, editorState)) {
   | None => None
   | Some(({image}: AssetNodeType.textureResultType)) =>
     AssetImageNodeMapEditorService.unsafeGetResult(image, editorState) |. Some
   }; */

/* let _isImageNodeDataEqual = (nodeData1, nodeData2, editorState) =>{
   WonderLog.Log.print("is image data equal") |> ignore;
     switch (nodeData1, nodeData2) {
     | (None, None) => true
     | (
         Some((nodeData1: AssetNodeType.imageResultType)),
         Some((nodeData2: AssetNodeType.imageResultType)),
       ) =>
       nodeData1.name == nodeData2.name
       && nodeData1.mimeType == nodeData2.mimeType
       && Base64Service.isBase64Equal(nodeData1.base64, nodeData2.base64)
       && Uint8ArrayService.isUint8ArrayEqual(
            nodeData1.uint8Array,
            nodeData2.uint8Array,
          )
     | _ => false
     };
   }; */

let _isImageValueEqual = (image1, image2, getFunc) =>
  getFunc(image1)
  |> WonderLog.Log.print == (getFunc(image2) |> WonderLog.Log.print);

let _isImageNodeDataEqual = (image1, image2) => {
  WonderLog.Log.print("is image data equal") |> ignore;

  _isImageValueEqual(image1, image2, ImageUtils.getImageName)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageWidth)
  && _isImageValueEqual(image1, image2, ImageUtils.getImageHeight);
};

/* let _isTextureDataEqual = (texture1, texture2, (editorState, engineState)) => */
let _isTextureDataEqual = (texture1, texture2, engineState) =>
  _isValueEqual(
    texture1,
    texture2,
    BasicSourceTextureEngineService.getBasicSourceTextureName,
    engineState,
  )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getWrapS,
       engineState,
     )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getWrapT,
       engineState,
     )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getMinFilter,
       engineState,
     )
  && _isValueEqual(
       texture1,
       texture2,
       BasicSourceTextureEngineService.getMagFilter,
       engineState,
     )
  && _isImageNodeDataEqual(
       /* _findImageNodeData(texture1, editorState),
          _findImageNodeData(texture2, editorState), */
       BasicSourceTextureEngineService.unsafeGetSource(texture1, engineState),
       BasicSourceTextureEngineService.unsafeGetSource(texture2, engineState),
     );

let _isLightMaterialDataEqual = (material1, material2, engineState) => {
  WonderLog.Log.print(("mat equal: ", material1, material2)) |> ignore;

  _isValueEqual(
    material1,
    material2,
    LightMaterialEngineService.getLightMaterialName,
    engineState,
  )
  && _isValueEqual(
       material1,
       material2,
       LightMaterialEngineService.getLightMaterialDiffuseColor,
       engineState,
     )
  && _isValueEqual(
       material1,
       material2,
       LightMaterialEngineService.getLightMaterialShininess,
       engineState,
     )
  && (
    switch (
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        material1,
        engineState,
      ),
      LightMaterialEngineService.getLightMaterialDiffuseMap(
        material2,
        engineState,
      ),
    ) {
    | (None, None) => true
    | (Some(map1), Some(map2)) =>
      WonderLog.Log.print("texture data equal") |> ignore;
      /* _isValueEqual(
           map1,
           map2,
           BasicSourceTextureEngineService.getMagFilter,
           engineState,
         ); */

      _isTextureDataEqual(map1, map2, engineState);
    | _ => false
    }
  );
};

let _replaceToAssetMaterialComponent =
    (
      gameObject,
      materialMap,
      defaultMaterial,
      (
        unsafeGetMaterialComponentFunc,
        isDefaultMaterialComponentFunc,
        isMaterialDataEqualFunc,
        disposeMaterialComponentFunc,
        addMaterialComponentFunc,
      ),
      engineState,
    ) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      test(
        Log.buildAssertMessage(
          ~expect=
            {j|asset material component has not been added to gameObject|j},
          ~actual={j|has|j},
        ),
        () => {
          let material =
            unsafeGetMaterialComponentFunc(gameObject, engineState);

          materialMap
          |> SparseMapService.getValidValues
          |> SparseMapService.includes(material)
          |> assertFalse;
        },
      );
      test(
        Log.buildAssertMessage(
          ~expect=
            {j|default material component has not been added to gameObject|j},
          ~actual={j|has|j},
        ),
        () => {
          let material =
            unsafeGetMaterialComponentFunc(gameObject, engineState);

          material !== defaultMaterial;
        },
      );
    },
    StateEditorService.getStateIsDebug(),
  );

  let material = unsafeGetMaterialComponentFunc(gameObject, engineState);

  let targetMaterial =
    isDefaultMaterialComponentFunc(material, defaultMaterial, engineState) ?
      Some(defaultMaterial) :
      (
        switch (
          materialMap
          |> SparseMapService.getValidValues
          |> SparseMapService.find(assetMaterialComponent =>
               isMaterialDataEqualFunc(
                 assetMaterialComponent,
                 material,
                 engineState,
               )
             )
        ) {
        | None => None
        | Some(assetMaterialComponent) => Some(assetMaterialComponent)
        }
      );

  switch (targetMaterial) {
  | None => engineState
  | Some(targetMaterial) =>
    engineState
    |> disposeMaterialComponentFunc(gameObject, material)
    |> addMaterialComponentFunc(gameObject, targetMaterial)
  };
};

let _isDefaultBasicMaterial =
    (gameObjectMaterial, defaultMaterial, engineState) =>
  engineState
  |>
  BasicMaterialEngineService.getBasicMaterialName(gameObjectMaterial) === (
                                                                    engineState
                                                                    |>
                                                                    BasicMaterialEngineService.getBasicMaterialName(
                                                                    defaultMaterial,
                                                                    )
                                                                    );

let _isDefaultLightMaterial =
    (gameObjectMaterial, defaultMaterial, engineState) =>
  engineState
  |>
  LightMaterialEngineService.getLightMaterialName(gameObjectMaterial) === (
                                                                    engineState
                                                                    |>
                                                                    LightMaterialEngineService.getLightMaterialName(
                                                                    defaultMaterial,
                                                                    )
                                                                    );

let _replaceGameObjectMaterialComponentToAssetMaterialComponent =
    (
      gameObject,
      (defaultBasicMaterial, defaultLightMaterial),
      (basicMaterialMap, lightMaterialMap),
      engineState,
    ) =>
  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    _replaceToAssetMaterialComponent(
      gameObject,
      basicMaterialMap,
      defaultBasicMaterial,
      (
        GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
        _isDefaultBasicMaterial,
        _isBasicMaterialDataEqual,
        GameObjectComponentEngineService.disposeBasicMaterialComponent,
        GameObjectComponentEngineService.addBasicMaterialComponent,
      ),
      engineState,
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      _replaceToAssetMaterialComponent(
        gameObject,
        lightMaterialMap,
        defaultLightMaterial,
        (
          GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
          _isDefaultLightMaterial,
          _isLightMaterialDataEqual,
          GameObjectComponentEngineService.disposeLightMaterialComponent,
          GameObjectComponentEngineService.addLightMaterialComponent,
        ),
        engineState,
      ) :
      engineState;

let _relateWDBGameObjectsAndAssets =
    (allWDBGameObjectsArr, (basicMaterialMap, lightMaterialMap)) => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let defaultBasicMaterial =
    AssetMaterialDataEditorService.unsafeGetDefaultBasicMaterial(editorState);
  let defaultLightMaterial =
    AssetMaterialDataEditorService.unsafeGetDefaultLightMaterial(editorState);

  let engineState =
    allWDBGameObjectsArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) =>
           _replaceGameObjectMaterialComponentToAssetMaterialComponent(
             gameObject,
             (defaultBasicMaterial, defaultLightMaterial),
             (basicMaterialMap, lightMaterialMap),
             engineState,
           )
           |> GameObjectEngineService.initGameObject(gameObject),
         engineState,
       );

  engineState |> StateEngineService.setState |> ignore;
};

let _initAssetTreeRoot = () => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();

  let (assetTree, editorState) =
    editorState |> AssetTreeNodeUtils.initRootAssetTree(_, engineState);

  editorState
  |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree)
  |> StateEditorService.setState
  |> ignore;

  engineState |> StateEngineService.setState |> ignore;

  ();
};

let _import = result => {
  _disposeAssets();

  _initAssetTreeRoot();

  let wpk = result |> FileReader.convertResultToArrayBuffer;

  let dataView = DataViewUtils.create(wpk);

  let (sceneWDB, asb, dataView) = _readWPK(wpk, dataView);

  let materialMapTupleRef =
    ref((
      WonderCommonlib.SparseMapService.createEmpty(),
      WonderCommonlib.SparseMapService.createEmpty(),
    ));

  HeaderImportASBUtils.importASB(asb)
  |> WonderBsMost.Most.map(((allWDBGameObjectsArr, materialMapTuple)) => {
       WonderLog.Log.print(("allWDBGameObjectsArr: ", allWDBGameObjectsArr))
       |> ignore;
       _relateWDBGameObjectsAndAssets(allWDBGameObjectsArr, materialMapTuple);

       materialMapTupleRef := materialMapTuple;

       ();
     })
  |> WonderBsMost.Most.concat(
       MostUtils.callStreamFunc(() =>
         SceneWDBUtils.importSceneWDB(sceneWDB)
         |> WonderBsMost.Most.map(sceneGameObject => {
              let engineState = StateEngineService.unsafeGetState();


              WonderLog.Log.print("replace scene wdb") |> ignore;
              _relateWDBGameObjectsAndAssets(
                GameObjectEngineService.getAllGameObjects(
                  sceneGameObject,
                  engineState,
                )
                |> WonderLog.Log.print,
                materialMapTupleRef^,
              );

              ();
            })
       ),
     )
  |> WonderBsMost.Most.concat(
       MostUtils.callFunc(() => StateLogicService.getAndRefreshEngineState()),
     );
};

let importPackage = (dispatchFunc, event) => {
  let e = ReactEventType.convertReactFormEventToJsEvent(event);
  DomHelper.preventDefault(e);

  switch (e##target##files |> Js.Dict.values |> ArrayService.getFirst) {
  | None => Js.Promise.make((~resolve, ~reject) => resolve(. Obj.magic(-1)))
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
         _import(fileResult.result)
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
       });
  };
};