open WonderBsMost;

open WonderBsJson;

open UserDataType;

let savePackage = fetchFunc => {
  let editorState = StateEditorService.getState();
  let languageType = LanguageEditorService.unsafeGetType(editorState);

  StateEditorService.getIsRun() ?
    ConsoleUtils.warn(
      LanguageUtils.getMessageLanguageDataByType(
        "should-in-stop",
        languageType,
      ),
      editorState,
    )
    |> Most.just :
    {
      ConsoleUtils.log({j|正在保存|j}) |> StateLogicService.getEditorState;

      let wpkArrayBuffer = HeaderExportPackageUtils.export();
      let chunkSize = ClientConfig.getFileChunkSize();
      let fileSize = Js.Typed_array.ArrayBuffer.byteLength(wpkArrayBuffer);

      let userId = UserDataEditorService.unsafeGetUserId(editorState);
      let userName = UserDataEditorService.unsafeGetUserName(editorState);
      let userRepo = UserDataEditorService.unsafeGetCurrentRepo(editorState);

      wpkArrayBuffer
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
               Blob.newBlobFromArrayBuffer(wpkArrayBuffer, ""),
             ),
           )
           |> Most.just;
         })
      |> Most.flatMap(((fileHash, blockCount, fileChunkArray)) =>
           fileChunkArray
           |> Most.from
           |> Most.flatMap(formData =>
                fetchFunc(
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
                  fetchFunc(
                    ClientConfig.getServerPath() ++ "/uploadUserRepoFile",
                    Fetch.RequestInit.make(
                      ~method_=Post,
                      ~body=
                        Fetch.BodyInit.make(
                          Js.Json.stringify(
                            Json.Encode.object_([
                              ("total", Json.Encode.int(blockCount)),
                              ("hash", Json.Encode.string(fileHash)),
                              ("userName", Json.Encode.string(userName)),
                              ("userId", Json.Encode.int(userId)),
                              ("repoId", Json.Encode.int(userRepo.id)),
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
                       fetchResponse |> Fetch.Response.json |> Most.fromPromise
                     )
                  |> Most.tap(result =>
                       ConsoleUtils.log({j|保存成功|j})
                       |> StateLogicService.getEditorState
                     )
                  |> MostUtils.ignore
                ),
              )
         );
    };
};