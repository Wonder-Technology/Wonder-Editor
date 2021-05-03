module LoadData = {
  open Js.Promise;

  open WonderBsJszip;

  open WonderBsMost;

  let loadAndWriteIndexJsData = (useWorker, fetchFunc, zip) =>
    fetchFunc(. "./publish/wd.js")
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(jsStr => {
              zip->(Zip.write("wd.js", `str(jsStr)));

              useWorker ?
                fetchFunc(. "./publish/wd.render.worker.js")
                |> then_(response =>
                     response
                     |> Fetch.Response.text
                     |> then_(jsStr => {
                          zip
                          ->(Zip.write("wd.render.worker.js", `str(jsStr)));

                          resolve(zip);
                        })
                   ) :
                resolve(zip);
            })
       );

  let loadAndWriteIndexHtmlData =
      (useWorker, sceneGraphArrayBuffer, fetchFunc, zip) =>
    fetchFunc(.
      useWorker ? "./publish/index_worker.html" : "./publish/index.html",
    )
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(htmlStr =>
              zip->(Zip.write("index.html", `str(htmlStr))) |> resolve
            )
       );

  let _loadAndWriteSingleResArrayBufferData =
      (~name, ~fetchFunc, ~zip, ~dirname="./publish/res/loading", ()) =>
    fetchFunc(. {j|$dirname/$name|j})
    |> then_(response =>
         response
         |> Fetch.Response.arrayBuffer
         |> then_(arrayBuffer =>
              zip
              ->(
                  Zip.write(
                    ~options=Options.makeWriteOptions(~binary=true, ()),
                    {j|res/loading/$name|j},
                    `trustme(
                      arrayBuffer |> TypeArrayType.newBlobFromArrayBuffer,
                    ),
                  )
                )
              |> resolve
            )
       )
    |> Most.fromPromise;

  let loadAndWriteResData = (fetchFunc, zip) =>
    Most.mergeArray([|
      /* fetchFunc(.{j|./publish/res/loading/Lato-Regular-64.fnt|j})
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
         |> Most.fromPromise,
         _loadAndWriteSingleResArrayBufferData(
           ~name="lato.png",
           ~fetchFunc,
           ~zip,
           (),
         ), */
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
    |> Most.drain
    |> then_(_ => zip |> resolve);

  let _loadAndWriteSingleConfigDataWithTargetFileNamePath =
      (fileNamePath, targetFileNamePath, fetchFunc, zip) =>
    fetchFunc(. {j|./publish/config/$fileNamePath|j})
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(str =>
              zip->(Zip.write({j|config/$targetFileNamePath|j}, `str(str)))
              |> resolve
            )
       )
    |> Most.fromPromise;

  let _loadAndWriteSingleConfigData = (fileNamePath, fetchFunc, zip) =>
    _loadAndWriteSingleConfigDataWithTargetFileNamePath(
      fileNamePath,
      fileNamePath,
      fetchFunc,
      zip,
    );

  let loadAndWriteConfigData = (useWorker, fetchFunc, zip) => {
    let streamArr = [|
      _loadAndWriteSingleConfigDataWithTargetFileNamePath(
        useWorker ? "setting_worker.json" : "setting.json",
        "setting.json",
        fetchFunc,
        zip,
      ),
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
    |];

    let streamArr =
      useWorker ?
        streamArr
        |> ArrayService.fastConcat(
             _,
             [|
               _loadAndWriteSingleConfigData(
                 "worker/job/main/main_init_jobs.json",
                 fetchFunc,
                 zip,
               ),
               _loadAndWriteSingleConfigData(
                 "worker/job/main/main_loop_jobs.json",
                 fetchFunc,
                 zip,
               ),
               _loadAndWriteSingleConfigData(
                 "worker/job/worker/worker_jobs.json",
                 fetchFunc,
                 zip,
               ),
               _loadAndWriteSingleConfigData(
                 "worker/pipeline/main/main_init_pipelines.json",
                 fetchFunc,
                 zip,
               ),
               _loadAndWriteSingleConfigData(
                 "worker/pipeline/main/main_loop_pipelines.json",
                 fetchFunc,
                 zip,
               ),
               _loadAndWriteSingleConfigData(
                 "worker/pipeline/worker/worker_pipelines.json",
                 fetchFunc,
                 zip,
               ),
               _loadAndWriteSingleConfigData(
                 "worker/setting/setting.json",
                 fetchFunc,
                 zip,
               ),
             |],
           ) :
        streamArr;

    Most.mergeArray(streamArr) |> Most.drain |> then_(_ => zip |> resolve);
  };

  let loadAndWriteJsData = (fetchFunc, zip) =>
    fetchFunc(. "./publish/js/commonForNoWorkerAndWorker.js")
    |> then_(response =>
         response
         |> Fetch.Response.text
         |> then_(jsStr =>
              zip
              ->(Zip.write("js/commonForNoWorkerAndWorker.js", `str(jsStr)))
              |> resolve
            )
       );
};

module Publish = {
  open Js.Promise;

  open WonderBsJszip;

  open WonderBsMost;

  let _generateAssetBundleData = selectTree =>
    IterateTreeSelectTreeService.fold(
      ~tree=selectTree,
      ~acc=WonderCommonlib.ArrayService.createEmpty(),
      ~valueNodeFunc=
        (abDataArr, nodeId, nodeData) =>
          ValueNodeSelectTreeService.getIsSelect(nodeData) ?
            {
              let value = ValueNodeSelectTreeService.getValue(nodeData);

              switch (ValueNodeSelectTreeService.getType(nodeData)) {
              | "assetBundle" =>
                let {type_, path, assetBundle}: HeaderAssetBundleType.assetBundleData =
                  value |> HeaderAssetBundleType.convertValueToAssetBundleData;

                abDataArr |> ArrayService.push((path, assetBundle));
              | type_ =>
                WonderLog.Log.fatal(
                  WonderLog.Log.buildFatalMessage(
                    ~title="_generateAssetBundleData",
                    ~description={j|unknown type_: $type_|j},
                    ~reason="",
                    ~solution={j||j},
                    ~params={j||j},
                  ),
                )
              };
            } :
            abDataArr,
      ~folderNodeFunc=(acc, nodeId, nodeData, children) => acc,
      (),
    );

  let _writeAssetBundleData =
      (useAssetBundle, selectTreeForAssetBundle, createZipStream) =>
    useAssetBundle ?
      createZipStream
      |> Most.map(zip =>
           _generateAssetBundleData(selectTreeForAssetBundle)
           |> WonderCommonlib.ArrayService.reduceOneParam(
                (. zip, (relativePath, ab)) =>
                  zip
                  ->(
                      Zip.write(
                        ~options=Options.makeWriteOptions(~binary=true, ()),
                        relativePath,
                        `trustme(ab |> TypeArrayType.newBlobFromArrayBuffer),
                      )
                    ),
                zip,
              )
         ) :
      createZipStream;

  let _loadData =
      (useWorker, sceneGraphArrayBuffer, fetchFunc, createZipStream) =>
    createZipStream
    |> Most.flatMap(zip =>
         Most.fromPromise(
           LoadData.loadAndWriteIndexHtmlData(
             useWorker,
             sceneGraphArrayBuffer,
             fetchFunc,
             zip,
           ),
         )
       )
    |> Most.flatMap(zip =>
         Most.fromPromise(
           LoadData.loadAndWriteIndexJsData(useWorker, fetchFunc, zip),
         )
       )
    |> Most.flatMap(zip =>
         Most.fromPromise(LoadData.loadAndWriteResData(fetchFunc, zip))
       )
    |> Most.flatMap(zip =>
         Most.fromPromise(
           LoadData.loadAndWriteConfigData(useWorker, fetchFunc, zip),
         )
       )
    |> Most.flatMap(zip =>
         Most.fromPromise(LoadData.loadAndWriteJsData(fetchFunc, zip))
       );

  let _generateSceneWDB = (editorState, engineState) =>
    HeaderExportSceneWDBUtils.generateSceneWDB(
      false,
      GenerateSceneGraphEngineService.generateSceneWDB,
      Js.Nullable.return(
        Uint8ArrayAssetEditorService.buildBasicSourceTextureImageUint8ArrayMap(editorState),
      ),
      engineState,
    );

  let publishZip =
      (
        (zipName, useWorker),
        (useAssetBundle, selectTreeForAssetBundle),
        createZipFunc,
        fetchFunc,
      ) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    StateEditorService.getIsRun() ?
      {
        ConsoleUtils.warn(
          LanguageUtils.getMessageLanguageDataByType(
            "should-in-stop",
            LanguageEditorService.unsafeGetType(editorState),
          ),
          editorState,
        );

        Js.Promise.make((~resolve, ~reject) => resolve(. None));
      } :
      {
        let (engineState, sceneGraphArrayBuffer) =
          _generateSceneWDB(editorState, engineState);

        engineState |> StateEngineService.setState;

        createZipFunc()
        |> Most.just
        |> _writeAssetBundleData(useAssetBundle, selectTreeForAssetBundle)
        |> _loadData(useWorker, sceneGraphArrayBuffer, fetchFunc)
        |> Most.tap(zip =>
             zip
             ->(
                 Zip.write(
                   ~options=Options.makeWriteOptions(~binary=true, ()),
                   "Scene.wdb",
                   `trustme(
                     sceneGraphArrayBuffer
                     |> TypeArrayType.newBlobFromArrayBuffer,
                   ),
                 )
               )
             ->(Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions()))
             |> Js.Promise.then_(content =>
                  FileSaver.saveAs(content, {j|$zipName.zip|j})
                  |> Js.Promise.resolve
                )
             |> ignore
           )
        |> Most.drain
        |> then_(_ => None |> resolve);
      };
  };
};