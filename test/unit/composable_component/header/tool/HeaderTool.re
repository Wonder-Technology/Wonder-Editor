open Js.Promise;

let buildFakeZipData = [%bs.raw
  arrayBuffer => {|
  return [
    ["Assets/",{}],
    ["Assets/newFolder",{}],
    ["Assets/newFolder 1",{}],
    ["Assets/newJson.json",{
      async: function(){
          return new Promise((resolve, _) => resolve("this is json result"))
      },
    }],
    ["Assets/BoxTexture.wdb",{
      async: function(){
          return new Promise((resolve, _) => resolve(
            new Int8Array(arrayBuffer)
          ))
      },
    }],
    ["assets.json",{
      async: function(){
          return new Promise((resolve, _) => resolve(
            JSON.stringify(
              {
                "textures": [{
                  "path": "Assets/58eed7f99e14f",
                  "textureIndex": 0,
                  "warpS": 0,
                  "warpT": 0,
                  "minFilter": 0,
                  "magFilter": 1
                }, {
                  "path": "Assets/newFolder/newTexture",
                  "textureIndex": 1,
                  "warpS": 1,
                  "warpT": 1,
                  "minFilter": 1,
                  "magFilter": 1
                }],
                "sources": [{
                  "base64": "this is image result",
                  "name": "58eed7f99e14f.png",
                  "textureArray": [0, 1]
                }]
              }
            )
          ))
      },
    }],
  ]
|}
];

let buildExportFakeJsZipCreateFunc = [%bs.raw
  sandbox => {|
        var obj = {
           file: sandbox.stub(),
           generateAsync: sandbox.stub(),
        };

        obj.file = obj.file.returns(obj);
        obj.generateAsync = (a,b) => {
          return new Promise((resolve, _) => resolve(obj))
        };

        return obj;

|}
];
let buildImportFakeJsZipCreateFunc = [%bs.raw
  (sandbox, zipData) => {|
        var obj = {
           loadAsync: sandbox.stub(),
        };

        var obj2 = {
           forEach: function(handleFunc){
             zipData.forEach((data) => {
               handleFunc(data[0],data[1]);
             })
           },
           async: function() {
             return obj2
           }
        };

        obj.loadAsync = (zip, a) => {
          return new Promise((resolve, _) => resolve(obj2))
        };

        return obj;

|}
];

let fileLoad = HeaderLoadWDBUtils.loadSceneWDB;

let loadOneWDB =
    (~arrayBuffer, ~dispatchFunc=TestTool.getDispatch(), ~fileName="Wdb", ()) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  HeaderLoadWDBUtils.loadSceneWDB(
    dispatchFunc,
    BaseEventTool.buildWDBFileEvent(fileName, arrayBuffer),
  )
  |> then_(() => uploadedWDBNodeId |> resolve);
};