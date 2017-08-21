describe("testUi primitive operator", function(){
    var sandbox = null,
        gl = null,
        uniform = 100,
        children = null,
        device = null;

    var createTriangle = we.createTriangle,
        createBox = we.createBox,
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

    });

    afterEach(function(){
        sandbox.restore();
        removeSceneGameObjects();
    });

    describe("add triangle", function(){
        beforeEach(function(){
            addSceneChildren(createTriangle());

            initDirector();
            renderDirector();

            children = getSceneGameObjects().children;
        });

        it("scene should have one child", function(){
            expect(children.length).toEqual(1);
        });
        it("the child is triangle", function(){
            expect(engineTool.isTriangle(children[0])).toBeTruthy();
        });
    });
    describe("add box", function(){
        beforeEach(function(){
            addSceneChildren(createBox());

            initDirector();
            renderDirector();

            children = getSceneGameObjects().children;
        });

        it("scene should have one child", function(){
            expect(children.length).toEqual(1);
        });
        it("the child is box", function(){
            expect(engineTool.isBox(children[0])).toBeTruthy();
        });
    });
});