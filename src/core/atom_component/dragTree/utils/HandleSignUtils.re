/* TODO rename sign to ? */
let handleSign = (startSign, targetSign, successFunc , failFunc) => {
  let successFunc = successFunc |> Obj.magic;
  switch startSign {
  /* TODO rename to sceneTree */
  | "scene" => targetSign === "scene" ? successFunc() : failFunc()
  | "folder" => targetSign === "folder" ? successFunc("folderToFolder") : failFunc()
  | "file" => targetSign === "folder" ? successFunc("fileToFolder") : failFunc()
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="handleSign",
        ~description={j|the startSign:$startSign not exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|startSign:$startSign|j}
      )
    )
  }
};