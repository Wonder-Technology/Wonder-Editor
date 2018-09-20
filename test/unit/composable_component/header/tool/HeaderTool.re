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

let buildFakeJsZipCreateFunc = [%bs.raw
  (sandbox) => {|
    window.zipObject = {
      async:function(){
        console.log(1)
      }
    }

        var obj = {
           write: sandbox.stub(),
           file: sandbox.stub(),
           generateAsync: sandbox.stub(),
           generateAsyncBlob: sandbox.stub(),
           then: sandbox.stub(),
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

        obj.write = obj.write.returns(obj);
        obj.file =obj.file.returns(obj);
        obj.generateAsync =obj.generateAsync.returns(obj);
        obj.generateAsyncBlob =obj.generateAsyncBlob.returns(obj);

        return obj;

|}
];

let triggerAddBox = () => {
  let component =
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    );
  BaseEventTool.triggerComponentEvent(
    component,
    OperateGameObjectEventTool.triggerClickAddBox,
  );
};

let triggerDisposeBox = () => {
  let component =
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    );
  BaseEventTool.triggerComponentEvent(
    component,
    OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob,
  );
};

let triggerAddEmptyGameObject = () => {
  let component =
    BuildComponentTool.buildHeader(
      TestTool.buildAppStateSceneGraphFromEngine(),
    );
  BaseEventTool.triggerComponentEvent(
    component,
    OperateGameObjectEventTool.triggerClickAddEmptyGameObject,
  );
};

let fileLoad = HeaderLoadWDBUtils.loadSceneWDB;