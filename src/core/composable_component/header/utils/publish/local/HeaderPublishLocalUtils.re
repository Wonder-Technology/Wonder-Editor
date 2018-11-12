module LoadData = {
  open Js.Promise;

  open WonderBsJszip;

  let loadAndWriteIndexJsData = (fetchFunc, zip) =>
    fetchFunc("./publish/wd.min.js")
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(jsStr =>
              zip |. Zip.write("wd.min.js", `str(jsStr)) |> resolve
            )
       );

  let _replaceIndexHtml = (indexHtmlStr, sceneGraphArrayBuffer) =>
    indexHtmlStr
    |> Js.String.replaceByRe(
         [%re {|/\$totalWDBByteLength/img|}],
         sceneGraphArrayBuffer
         |> Js.Typed_array.ArrayBuffer.byteLength
         |> Js.Int.toString,
       );

  let loadAndWriteIndexHtmlData = (sceneGraphArrayBuffer, fetchFunc, zip) =>
    fetchFunc("./publish/index.html")
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(htmlStr =>
              zip
              |. Zip.write(
                   "index.html",
                   `str(_replaceIndexHtml(htmlStr, sceneGraphArrayBuffer)),
                 )
              |> resolve
            )
       );

  let _loadAndWriteSingleResArrayBufferData =
      (~name, ~fetchFunc, ~zip, ~dirname="./publish/res/loading", ()) =>
    fetchFunc({j|$dirname/$name|j})
    |> then_(response =>
         response
         |> Fetch.Response.arrayBuffer
         |> then_(arrayBuffer =>
              zip
              |. Zip.write(
                   ~options=Options.makeWriteOptions(~binary=true, ()),
                   {j|res/loading/$name|j},
                   `trustme(
                     arrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
                   ),
                 )
              |> resolve
            )
       )
    |> WonderBsMost.Most.fromPromise;

  let loadAndWriteResData = (fetchFunc, zip) =>
    WonderBsMost.Most.mergeArray([|
      fetchFunc({j|./publish/res/loading/Lato-Regular-64.fnt|j})
      |> then_(response =>
           response
           |> Fetch.Response.text
           |> then_(str =>
                zip
                |. Zip.write(
                     {j|res/loading/Lato-Regular-64.fnt|j},
                     `str(str),
                   )
                |> resolve
              )
         )
      |> WonderBsMost.Most.fromPromise,
      _loadAndWriteSingleResArrayBufferData(
        ~name="lato.png",
        ~fetchFunc,
        ~zip,
        (),
      ),
      _loadAndWriteSingleResArrayBufferData(
        ~dirname="./public/logo",
        ~name="logo.png",
        ~fetchFunc,
        ~zip,
        (),
      ),
      _loadAndWriteSingleResArrayBufferData(
        ~dirname="./public/logo",
        ~name="favicon.ico",
        ~fetchFunc,
        ~zip,
        (),
      ),
    |])
    |> WonderBsMost.Most.drain
    |> then_(_ => zip |> resolve);

  let _loadAndWriteSingleConfigData = (fileNamePath, fetchFunc, zip) =>
    fetchFunc({j|./publish/config/$fileNamePath|j})
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(str =>
              zip
              |. Zip.write({j|config/$fileNamePath|j}, `str(str))
              |> resolve
            )
       )
    |> WonderBsMost.Most.fromPromise;

  let loadAndWriteConfigData = (fetchFunc, zip) =>
    WonderBsMost.Most.mergeArray([|
      _loadAndWriteSingleConfigData("setting.json", fetchFunc, zip),
      _loadAndWriteSingleConfigData(
        "no_worker/job/init_jobs.json",
        fetchFunc,
        zip,
      ),
      _loadAndWriteSingleConfigData(
        "no_worker/job/loop_jobs.json",
        fetchFunc,
        zip,
      ),
      _loadAndWriteSingleConfigData(
        "no_worker/pipeline/init_pipelines.json",
        fetchFunc,
        zip,
      ),
      _loadAndWriteSingleConfigData(
        "no_worker/pipeline/loop_pipelines.json",
        fetchFunc,
        zip,
      ),
      _loadAndWriteSingleConfigData(
        "no_worker/setting/setting.json",
        fetchFunc,
        zip,
      ),
      _loadAndWriteSingleConfigData(
        "render/shader/shader_libs.json",
        fetchFunc,
        zip,
      ),
      _loadAndWriteSingleConfigData(
        "render/shader/shaders.json",
        fetchFunc,
        zip,
      ),
    |])
    |> WonderBsMost.Most.drain
    |> then_(_ => zip |> resolve);
};

module Publish = {
  open Js.Promise;

  open WonderBsJszip;

  let publishZip = (createZipFunc, fetchFunc, zipName) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (engineState, sceneGraphArrayBuffer) =
      HeaderExportSceneWDBUtils.generateSceneWDB(editorState, engineState);

    engineState |> StateEngineService.setState;

    createZipFunc()
    |> WonderBsMost.Most.just
    |> WonderBsMost.Most.flatMap(zip =>
         WonderBsMost.Most.fromPromise(
           LoadData.loadAndWriteIndexHtmlData(
             sceneGraphArrayBuffer,
             fetchFunc,
             zip,
           ),
         )
       )
    |> WonderBsMost.Most.flatMap(zip =>
         WonderBsMost.Most.fromPromise(
           LoadData.loadAndWriteIndexJsData(fetchFunc, zip),
         )
       )
    |> WonderBsMost.Most.flatMap(zip =>
         WonderBsMost.Most.fromPromise(
           LoadData.loadAndWriteResData(fetchFunc, zip),
         )
       )
    |> WonderBsMost.Most.flatMap(zip =>
         WonderBsMost.Most.fromPromise(
           LoadData.loadAndWriteConfigData(fetchFunc, zip),
         )
       )
    |> WonderBsMost.Most.tap(zip =>
         zip
         |. Zip.write(
              ~options=Options.makeWriteOptions(~binary=true, ()),
              "Scene.wdb",
              `trustme(
                sceneGraphArrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
              ),
            )
         |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
         |> Js.Promise.then_(content =>
              FileSaver.saveAs(content, zipName ++ ".zip")
              |> Js.Promise.resolve
            )
         |> ignore
       )
    |> WonderBsMost.Most.drain;
  };
};