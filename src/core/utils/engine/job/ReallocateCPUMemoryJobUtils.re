open Wonderjs;

open StateDataMainType;

let _reallocateGeometryToNewBuffer = ({settingRecord} as engineState) => {
  let geometryRecord = RecordGeometryMainService.getRecord(engineState);

  {
    ...engineState,
    geometryRecord:
      Some(
        if (QueryCPUMemoryService.isDisposeTooMany(
              geometryRecord.disposeCount,
              settingRecord,
            )) {
          geometryRecord.disposeCount = 0;

          let geometryPointCount =
            BufferSettingService.getGeometryPointCount(settingRecord);
          let geometryCount =
            BufferSettingService.getGeometryCount(settingRecord);
          let (
            buffer,
            vertices,
            texCoords,
            normals,
            indices,
            indices32,
            verticesInfos,
            texCoordsInfos,
            normalsInfos,
            indicesInfos,
          ) =
            RecordGeometryMainService._initBufferData(
              geometryPointCount,
              geometryCount,
            );

          ReallocateGeometryCPUMemoryService.reAllocateToBuffer(
            (
              buffer,
              vertices,
              texCoords,
              normals,
              indices,
              indices32,
              verticesInfos,
              texCoordsInfos,
              normalsInfos,
              indicesInfos,
            ),
            geometryRecord,
          );
        } else {
          geometryRecord;
        },
      ),
  };
};

let reallocateJob = (_, engineState) =>
  engineState
  |> ReallocateCPUMemoryJobUtils._reallocateGameObjectByDisposeCount
  |> _reallocateGeometryToNewBuffer;