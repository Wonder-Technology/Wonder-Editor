describe("test default getScene", function(){
    var state = null,
        sandbox = null,
        gl = null,
        uniform = null,
        device = null;

    var init = we.initEngineBuss,
        getDeviceOper = we.getDeviceOper,
        renderBuss = we.renderBuss;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        state = stateTool.createState();

        device = getDeviceOper();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));

        gl = device.gl;

        // uniform = 100;
        // sandbox.stub(gl,"getUniformLocation").returns(uniform);

        // state = init(state);
        // state = renderBuss(state);
    });

    afterEach(function(){
        sandbox.restore();
        sceneTool.removeSceneGameObjects();
    });

    describe("test editor logic", function(){
        it(" default getScene should add triangle and camera to state", function(){
            state = init(state);

            expect(state.getIn(["scene", "triangle"])).not.toBeUndefined();
            expect(state.getIn(["scene","camera"])).not.toBeUndefined();
        });
    });

    describe("test engine logic", function(){
        var children = null;

        beforeEach(function () {
            state = init(state);

            children = sceneTool.getSceneGameObjects().children;
        });

        describe("test default scene", function () {
            it(" default getScene should have two gameObjects", function(){
                expect(children.length).toEqual(2);
            });

            describe("add camera", function(){
                function getCamera(children) {
                    return children.filter(function (item) {
                        return isCamera(item);
                    });
                }

                function isCamera(gameObject) {
                    return gameObject.geometry === null;
                }

                it("add one camera to scene", function(){
                    expect(getCamera(children).length).toEqual(1);
                });
                it("test camera default value", function(){
                    var camera = getCamera(children);

                    //todo need engine export get camera component value api

                    expect().toPass();
                });
            });

            describe("add triangle", function(){
                function getTriangle(children) {
                    return children.filter(function (item) {
                        return isTriangle(item);
                    });
                }

                function isTriangle(gameObject) {
                    return gameObject.geometry !== null;
                }

                it("add one triangle to scene", function(){
                    expect(getTriangle(children).length).toEqual(1);
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
});
