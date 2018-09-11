let buildFakeJsZipCreateFunc = [%bs.raw
  sandbox => {|
        var obj = {
           write: sandbox.stub(),
           file: sandbox.stub(),
           generateAsync: sandbox.stub(),
           generateAsyncBlob: sandbox.stub(),
           then: sandbox.stub()
        };

        obj.write = obj.write.returns(obj);
        obj.file =obj.file.returns(obj);
        obj.generateAsync =obj.generateAsync.returns(obj);
        obj.generateAsyncBlob =obj.generateAsyncBlob.returns(obj);

        /* return function(){
          return obj;
        } */
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