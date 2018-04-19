open SceneType;

let unsafeGetDiffMap = (sceneRecord) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|diffMap exist|j}, ~actual={j|not|j}),
              () => sceneRecord.diffMap |> assertExist
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug()
  );
  sceneRecord.diffMap |> Js.Option.getExn
};

let setDiffMap = (diffMap, sceneRecord) => {...sceneRecord, diffMap: Some(diffMap)};