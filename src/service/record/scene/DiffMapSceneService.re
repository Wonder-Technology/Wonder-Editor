open SceneType;

let unsafeGetDiffMap = (sceneRecord) => sceneRecord.diffMap |> OptionService.unsafeGet;

let setDiffMap = (diffMap, sceneRecord) => {...sceneRecord, diffMap: Some(diffMap)};