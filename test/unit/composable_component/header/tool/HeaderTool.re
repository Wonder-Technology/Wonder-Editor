let buildFakeZipData = [%bs.raw
  arrayBuffer => {|
  return [
    ["Assets/",{}],
    ["Assets/newFolder",{}],
    ["Assets/newFolder 1",{}],
    ["Assets/newTex.tex",{
      async: function(){
          return new Promise((resolve, _) => resolve("this is texture file"))
      },
    }],
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
               console.log(data)
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