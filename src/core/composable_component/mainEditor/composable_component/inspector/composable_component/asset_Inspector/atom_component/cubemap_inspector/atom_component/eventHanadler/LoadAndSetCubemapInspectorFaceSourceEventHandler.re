module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (
    Wonderjs.CubemapTextureType.cubemapTexture,
    (
      Wonderjs.CubemapTextureType.cubemapTexture,
      WonderWebgl.DomExtendType.imageElement,
      Wonderjs.StateDataMainType.state
    ) =>
    Wonderjs.StateDataMainType.state,
    (
      Wonderjs.TextureType.format,
      Wonderjs.CubemapTextureType.cubemapTexture,
      Wonderjs.StateDataMainType.state
    ) =>
    Wonderjs.StateDataMainType.state,
  );
  type dataTuple = ReactEventRe.Form.t;
  type return = WonderBsMost.Most.stream(unit);

  let _getUploadSourceType = name => {
    let extname = FileNameService.getExtName(name);

    switch (extname) {
    | ".jpg"
    | ".jpeg"
    | ".png" => CubemapInspectorType.LoadSource
    | _ =>
      CubemapInspectorType.LoadError(
        LogUtils.buildErrorMessage(
          ~description=
            LanguageUtils.getMessageLanguageDataByType(
              "load-cubemap-faceSource-error",
              LanguageEditorService.unsafeGetType
              |> StateLogicService.getEditorState,
            ),
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    };
  };

  let _readFileByTypeSync = (reader, fileInfo: FileType.fileInfoType, type_) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|type_ not be LoadError|j},
                  ~actual={j|be|j},
                ),
                () =>
                switch (type_) {
                | CubemapInspectorType.LoadError(_) => assertFail()
                | _ => assertPass()
                }
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

    switch (_getUploadSourceType(fileInfo.name)) {
    | CubemapInspectorType.LoadSource =>
      FileReader.readAsDataURL(reader, fileInfo.file)
    };
  };

  let _loadImageFromBase64 =
      (fileResult: CubemapInspectorType.uploadFaceSourceFileResultType) =>
    Js.Promise.make((~resolve, ~reject) =>
      Image.onload(
        fileResult.base64 |> FileReader.convertResultToString,
        loadedImg => {
          ImageUtils.setImageName(loadedImg, fileResult.name);

          resolve(. loadedImg);
        },
      )
    );

  let _fileLoad =
      (uiState, cubemapTexture, (setSourceFunc, setFormatFunc), event) => {
    let e = ReactEventType.convertReactFormEventToJsEvent(event);
    EventHelper.preventDefault(e);

    let target = e##target;

    switch (target##files |> Js.Dict.values |> ArrayService.getFirst) {
    | None => WonderBsMost.Most.empty()
    | Some(file) =>
      let fileInfo = FileReader.convertFileJsObjectToFileInfoRecord(file);

      WonderBsMost.Most.fromPromise(
        Js.Promise.make((~resolve, ~reject) => {
          let reader = FileReader.createFileReader();

          FileReader.onload(reader, result =>
            resolve(.
              {
                name: fileInfo.name,
                type_: _getUploadSourceType(fileInfo.name),
                base64: result,
              }: CubemapInspectorType.uploadFaceSourceFileResultType,
            )
          );

          switch (_getUploadSourceType(fileInfo.name)) {
          | CubemapInspectorType.LoadError(msg) =>
            reject(. CubemapInspectorType.LoadFaceSourceException(msg))
          | type_ => _readFileByTypeSync(reader, fileInfo, type_)
          };
        }),
      )
      |> WonderBsMost.Most.flatMap(
           (fileResult: CubemapInspectorType.uploadFaceSourceFileResultType) =>
           WonderBsMost.Most.fromPromise(_loadImageFromBase64(fileResult))
           |> WonderBsMost.Most.tap(loadedImg => {
                let engineState = StateEngineService.unsafeGetState();

                engineState
                |> setSourceFunc(
                     cubemapTexture,
                     loadedImg |> ImageType.convertDomToImageElement,
                   )
                |> setFormatFunc(
                     TextureUtils.getFormat(
                       FileNameService.getExtName(fileResult.name),
                     ),
                     cubemapTexture,
                   )
                |> CubemapTextureEngineService.setIsNeedUpdate(
                     true,
                     cubemapTexture,
                   )
                |> StateLogicService.refreshEngineState;
              })
         )
      |> WonderBsMost.Most.tap(_ =>
           FileReader.makeSureCanLoadSameNameFileAgain(target)
         )
      |> MostUtils.ignore;
    };
  };

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (cubemapTexture, setSourceFunc, setFormatFunc),
        event,
      ) =>
    _fileLoad(uiState, cubemapTexture, (setSourceFunc, setFormatFunc), event)
    |> WonderBsMost.Most.tap(_ =>
         dispatchFunc(
           AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
         )
         |> ignore
       )
    |> WonderBsMost.Most.recoverWith(e => {
         AllHistoryService.handleUndo(uiState, dispatchFunc);

         let editorState = StateEditorService.getState();

         switch (ExnType.convertJsExnToExn(e)) {
         | CubemapInspectorType.LoadFaceSourceException(message) =>
           ConsoleUtils.error(
             LogUtils.buildErrorMessage(
               ~description={j|$message|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
             editorState,
           )
         | e =>
           let e = ExnType.convertExnToJsExn(e);
           let message = e |> Js.Exn.message;
           let stack = e |> Js.Exn.stack;

           ConsoleUtils.error(
             LogUtils.buildErrorMessage(
               ~description={j|$message|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
             editorState,
           );
           ConsoleUtils.logStack(stack) |> ignore;
         };

         WonderBsMost.Most.empty();
       });
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);