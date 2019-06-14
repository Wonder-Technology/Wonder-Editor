let _isGeometryNameEqual = (name1, name2) =>
  ConverterEngineService.isDefaultGeometryName(name1)
  && ConverterEngineService.isDefaultGeometryName(name2) ?
    true : name1 == name2;

let isGeometryNameEqual = (name1, name2) =>
  switch (name1, name2) {
  | (Some(name1), Some(name2)) => _isGeometryNameEqual(name1, name2)
  | (None, None) => true
  | _ => false
  };

let isGeometryDataEqualForDefaultGeometry =
    (
      (name1, vertices1, normals1, texCoords1),
      (name2, vertices2, normals2, texCoords2),
      engineState,
    ) =>
  isGeometryNameEqual(name1, name2);

let isDefaultGeometry = (geometry, (editorState, engineState)) => {
  let (defaultCubeGeometry, defaultCubeGeometryName) = (
    GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentLogicService.getDefaultCubeGeometryName(),
  );
  let (defaultSphereGeometry, defaultSphereGeometryName) = (
    GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
      editorState,
    ),
    PrepareDefaultComponentLogicService.getDefaultSphereGeometryName(),
  );

  GeometryAssetLogicService.isGeometryEqualDefaultGeometryData(
    geometry,
    defaultCubeGeometry,
    defaultCubeGeometryName,
    engineState,
  )
  || GeometryAssetLogicService.isGeometryEqualDefaultGeometryData(
       geometry,
       defaultSphereGeometry,
       defaultSphereGeometryName,
       engineState,
     );
};

let getTargetGeometryByJudgeDefaultGeometry =
    (
      geometryData,
      (
        (
          defaultCubeGeometry,
          defaultCubeGeometryName,
          defaultCubeGeometryData,
        ),
        (
          defaultSphereGeometry,
          defaultSphereGeometryName,
          defaultSphereGeometryData,
        ),
      ),
      isGeometryDataEqualFunc,
      engineState,
    ) =>
  isGeometryDataEqualFunc(geometryData, defaultCubeGeometryData, engineState) ?
    Some(defaultCubeGeometry) :
    isGeometryDataEqualFunc(
      geometryData,
      defaultSphereGeometryData,
      engineState,
    ) ?
      Some(defaultSphereGeometry) : None;

let replaceGeometryComponent =
    (gameObject, sourceGeomtry, targetGeometry, engineState) =>
  switch (targetGeometry) {
  | None => engineState
  | Some(targetGeometry) =>
    engineState
    |> GameObjectComponentEngineService.disposeGeometryComponent(
         gameObject,
         sourceGeomtry,
       )
    |> GameObjectComponentEngineService.addGeometryComponent(
         gameObject,
         targetGeometry,
       )
  };

let getGeometryData = (geometry, engineState) => (
  GeometryEngineService.getGeometryName(geometry, engineState),
  GeometryEngineService.unsafeGetGeometryVertices(geometry, engineState),
  GeometryEngineService.unsafeGetGeometryNormals(geometry, engineState),
  GeometryEngineService.unsafeGetGeometryTexCoords(geometry, engineState),
);

let replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent =
    (
      gameObject,
      (
        (
          defaultCubeGeometry,
          defaultCubeGeometryName,
          defaultCubeGeometryData,
        ),
        (
          defaultSphereGeometry,
          defaultSphereGeometryName,
          defaultSphereGeometryData,
        ),
      ),
      engineState,
    ) =>
  switch (
    GameObjectComponentEngineService.getGeometryComponent(
      gameObject,
      engineState,
    )
  ) {
  | None => engineState
  | Some(geometry) =>
    let targetGeometry =
      getTargetGeometryByJudgeDefaultGeometry(
        getGeometryData(geometry, engineState),
        (
          (
            defaultCubeGeometry,
            defaultCubeGeometryName,
            defaultCubeGeometryData,
          ),
          (
            defaultSphereGeometry,
            defaultSphereGeometryName,
            defaultSphereGeometryData,
          ),
        ),
        isGeometryDataEqualForDefaultGeometry,
        engineState,
      );

    replaceGeometryComponent(
      gameObject,
      geometry,
      targetGeometry,
      engineState,
    );
  };

let getDefaultGeometryData = (editorState, engineState) => {
  let defaultGeometry =
    GeometryDataAssetEditorService.unsafeGetDefaultCubeGeometryComponent(
      editorState,
    );
  let defaultCubeGeometryData = (
    defaultGeometry,
    PrepareDefaultComponentLogicService.getDefaultCubeGeometryName(),
    getGeometryData(defaultGeometry, engineState),
  );

  let defaultGeometry =
    GeometryDataAssetEditorService.unsafeGetDefaultSphereGeometryComponent(
      editorState,
    );
  let defaultSphereGeometryData = (
    defaultGeometry,
    PrepareDefaultComponentLogicService.getDefaultSphereGeometryName(),
    getGeometryData(defaultGeometry, engineState),
  );

  (defaultCubeGeometryData, defaultSphereGeometryData);
};