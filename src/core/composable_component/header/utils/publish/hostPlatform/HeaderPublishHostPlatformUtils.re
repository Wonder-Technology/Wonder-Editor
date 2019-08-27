open WonderBsMost;

open WonderBsJson;

open UserDataType;

open Js.Promise;

let _loadConfigDataWithFileNamePath = (fileNamePath, configName, fetchFunc) =>
  fetchFunc(. {j|./publish/config/$fileNamePath|j})
  |> Most.fromPromise
  |> Most.flatMap(fetchResponse =>
       fetchResponse |> Fetch.Response.text |> Most.fromPromise
     )
  |> Most.map(configContent => {"name": configName, "content": configContent});

let getConfigFileStreamArray = (useWorker, fetchFunc) => {
  let configStreamArray = [|
    _loadConfigDataWithFileNamePath(
      useWorker ? "setting_worker.json" : "setting.json",
      "setting",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      useWorker ? "setting_worker.json" : "setting.json",
      "setting",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      "no_worker/job/init_jobs.json",
      "init_jobs",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      "no_worker/job/loop_jobs.json",
      "loop_jobs",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      "no_worker/pipeline/init_pipelines.json",
      "init_pipelines",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      "no_worker/pipeline/loop_pipelines.json",
      "loop_pipelines",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      "no_worker/setting/setting.json",
      "no_worker_setting",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      "render/shader/shader_libs.json",
      "shader_libs",
      fetchFunc,
    ),
    _loadConfigDataWithFileNamePath(
      "render/shader/shaders.json",
      "shaders",
      fetchFunc,
    ),
  |];

  useWorker ?
    configStreamArray
    |> ArrayService.fastConcat(
         _,
         [|
           _loadConfigDataWithFileNamePath(
             "worker/job/main/main_init_jobs.json",
             "main_init_jobs",
             fetchFunc,
           ),
           _loadConfigDataWithFileNamePath(
             "worker/job/main/main_loop_jobs.json",
             "main_loop_jobs",
             fetchFunc,
           ),
           _loadConfigDataWithFileNamePath(
             "worker/job/worker/worker_jobs.json",
             "worker_jobs",
             fetchFunc,
           ),
           _loadConfigDataWithFileNamePath(
             "worker/pipeline/main/main_init_pipelines.json",
             "main_init_pipelines",
             fetchFunc,
           ),
           _loadConfigDataWithFileNamePath(
             "worker/pipeline/main/main_loop_pipelines.json",
             "main_loop_pipelines",
             fetchFunc,
           ),
           _loadConfigDataWithFileNamePath(
             "worker/pipeline/worker/worker_pipelines.json",
             "worker_pipelines",
             fetchFunc,
           ),
           _loadConfigDataWithFileNamePath(
             "worker/setting/setting.json",
             "worker_setting",
             fetchFunc,
           ),
         |],
       ) :
    configStreamArray;
};
/*
 let getAssetBundleArray = (useAssetBundle, selectTreeForAssetBundle) =>
   useAssetBundle ?
     HeaderPublishLocalUtils.Publish.generateAssetBundleData(
       selectTreeForAssetBundle,
     )
     |> Js.Array.map(((relativePath, abArrayBuffer)) =>
          {"relativePath": relativePath, "arrayBuffer": abArrayBuffer}
        ) :
     [||]; */

let publishToHostPlatform =
    (useWorker, useAssetBundle, selectTreeForAssetBundle, fetchFunc) => {
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
        HeaderPublishLocalUtils.Publish.generateSceneWDB(
          editorState,
          engineState,
        );

      engineState |> StateEngineService.setState;

      let chunkSize = ClientConfig.getFileChunkSize();
      let fileSize =
        Js.Typed_array.ArrayBuffer.byteLength(sceneGraphArrayBuffer);
      let userId = UserDataEditorService.getUserId(editorState);
      let userName = UserDataEditorService.getUserName(editorState);
      let userRepo = UserDataEditorService.getCurrentRepo(editorState);
      let resultArray = [||];

      getConfigFileStreamArray(useWorker, fetchFunc)
      |> Most.mergeArray
      |> Most.map(result =>
           resultArray |> ArrayService.push(result) |> ignore
         )
      |> Most.concat(
           MostUtils.callStreamFunc(() =>
             sceneGraphArrayBuffer
             |> Crypto.getHashValue
             |> Most.fromPromise
             |> Most.flatMap(fileHash => {
                  let blockCount =
                    Js.Math.ceil(
                      (fileSize |> float_of_int) /. (chunkSize |> float_of_int),
                    );

                  (
                    fileHash,
                    blockCount,
                    FileReader.buildFileChunkFromDataArray(
                      (blockCount, chunkSize),
                      fileHash,
                      fileSize,
                      Blob.newBlobFromArrayBuffer(sceneGraphArrayBuffer, ""),
                    ),
                  )
                  |> Most.just;
                })
             |> Most.flatMap(((fileHash, blockCount, fileChunkArray)) =>
                  fileChunkArray
                  |> Most.from
                  |> Most.flatMap(formData =>
                       Fetch.fetchWithInit(
                         ClientConfig.getServerPath() ++ "/uploadFileChunk",
                         Fetch.RequestInit.make(
                           ~method_=Post,
                           ~body=Fetch.BodyInit.makeWithFormData(formData),
                           (),
                         ),
                       )
                       |> Most.fromPromise
                       |> MostUtils.ignore
                     )
                  |> Most.concat(
                       MostUtils.callStreamFunc(() =>
                         Fetch.fetchWithInit(
                           ClientConfig.getServerPath() ++ "/publishUserRepo",
                           Fetch.RequestInit.make(
                             ~method_=Post,
                             ~body=
                               Fetch.BodyInit.make(
                                 Js.Json.stringify(
                                   Json.Encode.object_([
                                     ("total", Json.Encode.int(blockCount)),
                                     ("hash", Json.Encode.string(fileHash)),
                                     (
                                       "userName",
                                       Json.Encode.string(userName),
                                     ),
                                     (
                                       "repoId",
                                       Json.Encode.int(userRepo.id),
                                     ),
                                     (
                                       "useWorker",
                                       Json.Encode.int(useWorker ? 1 : 0),
                                     ),
                                     (
                                       "useAssetBundle",
                                       Json.Encode.int(
                                         useAssetBundle ? 1 : 0,
                                       ),
                                     ),
                                     (
                                       "configArray",
                                       Json.Encode.array(
                                         configItem =>
                                           Json.Encode.object_([
                                             (
                                               "name",
                                               Json.Encode.string(
                                                 configItem##name,
                                               ),
                                             ),
                                             (
                                               "content",
                                               Json.Encode.string(
                                                 configItem##content,
                                               ),
                                             ),
                                           ]),
                                         resultArray,
                                       ),
                                     ),
                                   ]),
                                 ),
                               ),
                             ~headers=
                               Fetch.HeadersInit.make({
                                 "Content-Type": "application/json",
                               }),
                             (),
                           ),
                         )
                         |> Most.fromPromise
                         |> Most.flatMap(fetchResponse =>
                              fetchResponse
                              |> Fetch.Response.json
                              |> Most.fromPromise
                            )
                         |> Most.tap(result => {
                              let resultObj =
                                result |> JsonType.convertToJsObj;

                              ResponseUtils.isResponseSuccess(resultObj) ?
                                ConsoleUtils.log(
                                  {j|已成功发布到托管平台|j},
                                )
                                |> StateLogicService.getEditorState :
                                {
                                  let errorMsg = resultObj##msg;

                                  ConsoleUtils.error(
                                    {j|发布失败, 错误信息: $errorMsg|j},
                                  )
                                  |> StateLogicService.getEditorState;
                                };
                            })
                         |> MostUtils.ignore
                       ),
                     )
                )
           ),
         )
      |> Most.drain
      |> Js.Promise.then_(_ => None |> Js.Promise.resolve);
    };
};