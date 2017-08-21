describe("testUi camera operator", function(){
    var sandbox = null,
        gl = null,
        uniform = 100,
        camera = null,
        children = null,
        device = null;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        device = we.getDevice();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));

        gl = device.gl;
        sandbox.stub(gl,"getUniformLocation").returns(uniform);

        camera = we.createCamera();
        we.addSceneChildren(camera);

        we.directorInit();
        we.directorRender();

        children = we.getSceneGameObjects().children;
    });

    afterEach(function(){
        sandbox.restore();
        we.removeSceneGameObjects();
    });

    it("scene should have one child", function(){
        expect(children.length).toEqual(1);
    });
    it("the child is camera", function(){
        expect(engineTool.isCamera(children[0])).toBeTruthy();
    });
});