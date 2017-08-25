describe("test default getScene", function(){
    var state = null,
        sandbox = null,
        gl = null,
        uniform = null,
        device = null;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        state = stateEditTool.createState();

        device = deviceOperTool.getDevice();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));

        gl = device.gl;
    });

    afterEach(function(){
        sandbox.restore();
        mainAdaptorTool.removeSceneGameObjects();
    });

    describe("test engine logic", function(){
        var children = null;

        beforeEach(function () {
            state = mainBussTool.initEditor(state);

            children = mainAdaptorTool.getSceneGameObjects().children;
        });

        describe("test default scene", function () {
            it(" default getScene should have two gameObjects", function(){
                expect(children.length).toEqual(2);
            });

            describe("add camera", function(){
                it("add one camera to scene", function(){
                    expect(sceneOperTool.getCamera().length).toEqual(1);
                });
                it("test camera default value", function(){
                    var camera = sceneOperTool.getCamera();

                    //todo need engine export get camera component value api

                    expect().toPass();
                });
            });

            describe("add triangle", function(){
                it("add one triangle to scene", function(){
                    expect(sceneOperTool.getTriangle().length).toEqual(1);
                });

                //todo need engine export api
                describe("test material", function () {
                    it("add basic material", function(){
                    });
                    it("color should be red", function(){

                    });
                    it("opacity should be 1", function(){

                    });
                });

                describe("test components", function () {
                    it("should add meshRenderer component", function(){
                        //todo need engine export api
                    });

                    describe("test geometry component", function () {
                        //todo need test
                    })
                });
            });
        });

        it("init director", function(){
            //todo need engine export api
        });
    });

    describe("test editor logic", function(){
        it(" default getScene should add triangle and camera to state", function(){
            state = mainBussTool.initEditor(state);

            expect(sceneGameObjectEditTool.getTriangleFromState(state)).not.toBeUndefined();
            expect(state.getIn(["scene","camera"])).not.toBeUndefined();
        });
    });
});
