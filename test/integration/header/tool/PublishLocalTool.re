open Sinon;

open Js.Typed_array;

open Js.Promise;

let buildFakeFetch =
    (
      ~sandbox,
      ~html="html",
      ~js="js",
      ~resFnt="resFnt",
      ~resImage=ArrayBuffer.make(10),
      ~resLogo=ArrayBuffer.make(20),
      ~resIco=ArrayBuffer.make(30),
      ~dataSetting="dataSetting",
      ~dataInitJobs="dataInitJobs",
      ~dataLoopJobs="dataLoopJobs",
      ~dataInitPipelines="dataInitPipelines",
      ~dataLoopPipelines="dataLoopPipelines",
      ~dataNoWorkerSetting="dataNoWorkerSetting",
      ~dataShaderLibs="dataShaderLibs",
      ~dataShaders="dataShaders",
      (),
    ) => {
  let fetch = createEmptyStubWithJsObjSandbox(sandbox);

  fetch
  |> onCall(0)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(sandbox, html |> Obj.magic),
     )
  |> onCall(1)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(sandbox, js |> Obj.magic),
     )
  |> onCall(2)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         resFnt |> Obj.magic,
       ),
     )
  |> onCall(3)
  |> returns(
       BuildFetchTool.buildFakeFetchArrayBufferResponse(
         sandbox,
         resImage |> Obj.magic,
       ),
     )
  |> onCall(4)
  |> returns(
       BuildFetchTool.buildFakeFetchArrayBufferResponse(
         sandbox,
         resLogo |> Obj.magic,
       ),
     )
  |> onCall(5)
  |> returns(
       BuildFetchTool.buildFakeFetchArrayBufferResponse(
         sandbox,
         resIco |> Obj.magic,
       ),
     )
  |> onCall(6)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataSetting |> Obj.magic,
       ),
     )
  |> onCall(7)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataInitJobs |> Obj.magic,
       ),
     )
  |> onCall(8)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataLoopJobs |> Obj.magic,
       ),
     )
  |> onCall(9)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataInitPipelines |> Obj.magic,
       ),
     )
  |> onCall(10)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataLoopPipelines |> Obj.magic,
       ),
     )
  |> onCall(11)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataNoWorkerSetting |> Obj.magic,
       ),
     )
  |> onCall(12)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataShaderLibs |> Obj.magic,
       ),
     )
  |> onCall(13)
  |> returns(
       BuildFetchTool.buildFakeFetchTextResponse(
         sandbox,
         dataShaders |> Obj.magic,
       ),
     );

  fetch;
};

let getFetchPackageContentWithoutAssetCount = () => 14;
/* 
let getAssetJson =
    (
      ~sandbox,
      ~buildAssetTreeRootFunc,
      ~testFunc,
      ~fileCallCount=getFetchPackageContentWithoutAssetCount(),
      (),
    ) => {
  open Js.Promise;

  let assetTreeData = buildAssetTreeRootFunc();

  let fakeFetchFunc = buildFakeFetch(~sandbox, ());

  let obj = HeaderTool.buildExportFakeJsZipCreateFunc(sandbox^);

  HeaderExportUtils.exportPackage(() => obj, fakeFetchFunc)
  |> then_(_ => {
       let file = obj##file;

       (
         assetTreeData,
         file
         |> getCall(fileCallCount + 1)
         |> getArgs
         |> Js.List.nth(_, 1)
         |> OptionService.unsafeGet
         |> Obj.magic,
       )
       |> testFunc;
     });
}; */