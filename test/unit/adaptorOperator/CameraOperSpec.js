describe("testUi camera operator", function(){
    var sandbox = null,
        gl = null,
        uniform = 100,
        camera = null,
        children = null,
        device = null;

    var createCamera = we.createCamera,
        addSceneChildren = we.addSceneChildren,
        getDevice = we.getDevice,
        initDirector = we.initDirector,
        renderDirector = we.renderDirector,
        getSceneGameObjects = we.getSceneGameObjects,
        removeSceneGameObjects = we.removeSceneGameObjects;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        device = getDevice();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));

        gl = device.gl;
        sandbox.stub(gl,"getUniformLocation").returns(uniform);

        camera = createCamera();
        addSceneChildren(camera);

        initDirector();
        renderDirector();

        children = getSceneGameObjects().children;
    });

    afterEach(function(){
        sandbox.restore();
        removeSceneGameObjects();
    });

    it("scene should have one child", function(){
        expect(children.length).toEqual(1);
    });
    it("the child is camera", function(){
        expect(engineTool.isCamera(children[0])).toBeTruthy();
    });
});