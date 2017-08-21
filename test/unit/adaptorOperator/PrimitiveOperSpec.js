describe("testUi primitive operator", function(){
    var sandbox = null,
        gl = null,
        uniform = 100,
        children = null,
        device = null;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        device = we.getDevice();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));

        gl = device.gl;
        sandbox.stub(gl,"getUniformLocation").returns(uniform);

    });

    afterEach(function(){
        sandbox.restore();
        we.removeSceneGameObjects();
    });

    describe("add triangle", function(){
        beforeEach(function(){
            we.addSceneChildren(we.createTriangle());

            we.directorInit();
            we.directorRender();

            children = we.getSceneGameObjects().children;
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
            we.addSceneChildren(we.createBox());

            we.directorInit();
            we.directorRender();

            children = we.getSceneGameObjects().children;
        });

        it("scene should have one child", function(){
            expect(children.length).toEqual(1);
        });
        it("the child is box", function(){
            expect(engineTool.isBox(children[0])).toBeTruthy();
        });
    });
});