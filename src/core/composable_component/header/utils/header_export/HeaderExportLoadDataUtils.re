open Js.Promise;

open WonderBsJszip;

let loadAndWriteIndexJsData = (fetchFunc, zip) =>
  fetchFunc("./export/wd.min.js")
  |> then_(response =>
       response
       |> Fetch.Response.text
       |> then_(jsStr =>
            zip |. Zip.write("wd.min.js", `str(jsStr)) |> resolve
          )
     );

let _replaceIndexHtmlData = (indexHtmlStr, sceneGraphArrayBuffer) =>
  indexHtmlStr
  |> Js.String.replaceByRe(
       [%re {|/\$totalWDBByteLength/img|}],
       sceneGraphArrayBuffer
       |> Js.Typed_array.ArrayBuffer.byteLength
       |> Js.Int.toString,
     );

let loadAndWriteIndexHtmlData = (sceneGraphArrayBuffer, fetchFunc, zip) =>
  fetchFunc("./export/index.html")
  |> then_(response =>
       response
       |> Fetch.Response.text
       |> then_(htmlStr =>
            zip
            |. Zip.write(
                 "index.html",
                 `str(_replaceIndexHtmlData(htmlStr, sceneGraphArrayBuffer)),
               )
            |> resolve
          )
     );

let _loadAndWriteResArrayBufferData = (name, fetchFunc, zip) =>
  fetchFunc({j|./export/res/loading/$name|j})
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
    fetchFunc({j|./export/res/loading/Lato-Regular-64.fnt|j})
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(str =>
              zip
              |. Zip.write({j|res/loading/Lato-Regular-64.fnt|j}, `str(str))
              |> resolve
            )
       )
    |> WonderBsMost.Most.fromPromise,
    _loadAndWriteResArrayBufferData("lato.png", fetchFunc, zip),
    _loadAndWriteResArrayBufferData("wonder.png", fetchFunc, zip),
  |])
  |> WonderBsMost.Most.drain
  |> then_(_ => zip |> resolve);

let _loadAndWriteDataData = (fileNamePath, fetchFunc, zip) =>
  fetchFunc({j|./export/data/$fileNamePath|j})
  |> then_(response =>
       response
       |> Fetch.Response.text
       |> then_(str =>
            zip |. Zip.write({j|data/$fileNamePath|j}, `str(str)) |> resolve
          )
     )
  |> WonderBsMost.Most.fromPromise;

let loadAndWriteDataData = (fetchFunc, zip) =>
  WonderBsMost.Most.mergeArray([|
    _loadAndWriteDataData("setting.json", fetchFunc, zip),
    _loadAndWriteDataData("no_worker/job/init_jobs.json", fetchFunc, zip),
    _loadAndWriteDataData("no_worker/job/loop_jobs.json", fetchFunc, zip),
    _loadAndWriteDataData(
      "no_worker/pipeline/init_pipelines.json",
      fetchFunc,
      zip,
    ),
    _loadAndWriteDataData(
      "no_worker/pipeline/loop_pipelines.json",
      fetchFunc,
      zip,
    ),
    _loadAndWriteDataData("no_worker/setting/setting.json", fetchFunc, zip),
    _loadAndWriteDataData("render/shader/shader_libs.json", fetchFunc, zip),
    _loadAndWriteDataData("render/shader/shaders.json", fetchFunc, zip),
  |])
  |> WonderBsMost.Most.drain
  |> then_(_ => zip |> resolve);