open Js.Promise;

let _handleGLTFZipType =
    (
      (fileName, jsZipBlob),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      createJsZipFunc,
      (editorState, engineState),
    ) =>
  LoadGLTFZipUtils.convertGLTFToGLB(jsZipBlob, createJsZipFunc)
  |> then_(glbArrayBuffer =>
       AssetHeaderHandleGLBUtils.handleGLBType(
         (fileName, glbArrayBuffer),
         (wdbNodeId, selectedFolderNodeInAssetTree),
         (editorState, engineState),
       )
     );

let _getZipRelativeFolderPath = zipRelativePath => {
  let arr = zipRelativePath |> Js.String.split("/");

  arr |> Js.Array.length > 0 ?
    arr
    |> Js.Array.slice(~start=0, ~end_=(arr |> Js.Array.length) - 1)
    |> Js.Array.joinWith("/") :
    "";
};

let _buildPathInAssetTree =
    (
      selectedFolderNodeInAssetTree,
      zipRelativePath,
      (editorState, engineState),
    ) => {
  let zipRelativeFolderPath = _getZipRelativeFolderPath(zipRelativePath);

  PathTreeAssetLogicService.getNodePath(
    selectedFolderNodeInAssetTree,
    (editorState, engineState),
  )
  ++ (zipRelativeFolderPath === "" ? "" : "/" ++ zipRelativeFolderPath);
};

let _handleAssetBundleZipType =
    (
      (fileName, jsZipBlob),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      createJsZipFunc,
      (editorState, engineState),
    ) =>
  WonderBsJszip.(
    createJsZipFunc()->(Zip.loadAsync(`blob(jsZipBlob)))
    |> WonderBsMost.Most.fromPromise
    |> WonderBsMost.Most.flatMap(zip => {
         let streamArr = [||];

         editorState |> StateEditorService.setState |> ignore;
         engineState |> StateEngineService.setState |> ignore;

         zip
         ->(
             Zip.forEach((relativePath, zipEntry) => {
               let extname = FileNameService.getExtName(relativePath);

               switch (extname) {
               | "" => ()
               | ".wab"
               | ".sab"
               | ".rab" =>
                 streamArr
                 |> ArrayService.push(
                      zipEntry->(ZipObject.asyncUint8())
                      |> Obj.magic
                      |> then_(content => {
                           let editorState = StateEditorService.getState();

                           let assetBundle =
                             content |> Js.Typed_array.Uint8Array.buffer;

                           let (editorState, assetNodeId) =
                             IdAssetEditorService.generateNodeId(editorState);

                           let (editorState, parentFolderNode) =
                             OperateTreeAssetLogicService.addFolderNodesToTreeByPath(
                               _buildPathInAssetTree(
                                 selectedFolderNodeInAssetTree,
                                 relativePath,
                                 (editorState, engineState),
                               ),
                               (editorState, engineState),
                             );

                           let editorState =
                             AssetBundleNodeAssetEditorService.addAssetBundleNodeToAssetTree(
                               parentFolderNode,
                               AssetBundleNodeAssetService.buildNode(
                                 ~nodeId=assetNodeId,
                                 ~name=
                                   OperateTreeAssetLogicService.getUniqueNodeName(
                                     FileNameService.getBaseName(
                                       relativePath,
                                     ),
                                     parentFolderNode,
                                     engineState,
                                   ),
                                 ~assetBundle,
                                 ~type_=
                                   AssetHeaderAssetBundleUtils.getAssetBundleTypeByExtname(
                                     extname,
                                   ),
                               ),
                               editorState,
                             );

                           editorState |> StateEditorService.setState |> ignore;

                           resolve();
                         })
                      |> WonderBsMost.Most.fromPromise,
                    )
                 |> ignore
               | extname =>
                 WonderLog.Log.fatal(
                   WonderLog.Log.buildFatalMessage(
                     ~description={j|_handleAssetBundleZipType|j},
                     ~reason="unknown extname: $extname",
                     ~solution={j||j},
                     ~params={j||j},
                   ),
                 )
               };
             })
           );

         Wonderjs.MostUtils.concatArray(streamArr);
       })
    |> WonderBsMost.Most.drain
    |> then_(_ =>
         resolve((
           StateEditorService.getState(),
           StateEngineService.unsafeGetState(),
         ))
       )
  );

let _judgeZipType = zip => {
  open WonderBsJszip;

  let isGLTFZip = ref(false);
  let isAssetBundleZip = ref(false);

  zip
  ->(
      Zip.forEach((relativePath, zipEntry) =>
        switch (FileNameService.getExtName(relativePath)) {
        | ".gltf" => isGLTFZip := true
        | ".wab"
        | ".sab"
        | ".rab" => isAssetBundleZip := true
        | _ => ()
        }
      )
    );

  (isGLTFZip^, isAssetBundleZip^);
};

let handleZipType =
    (
      (fileName, jsZipBlob),
      (wdbNodeId, selectedFolderNodeInAssetTree),
      createJsZipFunc,
      (editorState, engineState),
    ) =>
  WonderBsJszip.(
    createJsZipFunc()->(Zip.loadAsync(`blob(jsZipBlob)))
    |> then_(zip => {
         let (isGLTFZip, isAssetBundleZip) = _judgeZipType(zip);

         isGLTFZip ?
           _handleGLTFZipType(
             (fileName, jsZipBlob),
             (wdbNodeId, selectedFolderNodeInAssetTree),
             createJsZipFunc,
             (editorState, engineState),
           ) :
           isAssetBundleZip ?
             _handleAssetBundleZipType(
               (fileName, jsZipBlob),
               (wdbNodeId, selectedFolderNodeInAssetTree),
               createJsZipFunc,
               (editorState, engineState),
             ) :
             resolve((editorState, engineState));
       })
  );