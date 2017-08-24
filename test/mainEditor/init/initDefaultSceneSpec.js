describe("test default getScene", function(){
    var state = null,
        sandbox = null,
        gl = null,
        uniform = 100,
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
        sandbox.stub(gl,"getUniformLocation").returns(uniform);

        state = init(state);
        renderBuss();
    });

    afterEach(function(){
        sandbox.restore();
        sceneTool.removeSceneGameObjects();
    });

    describe("test editor logic", function(){
        it(" default getScene should add triangle and camera to state", function(){
            expect(state.getIn(["scene", "triangle"])).not.toBeUndefined();
            expect(state.getIn(["scene","camera"])).not.toBeUndefined();
        });
    });

    describe("test engine logic", function(){
        var children = null;

        beforeEach(function () {
            children = sceneTool.getSceneGameObjects().children;
        });

        it(" default getScene should have two gameObject", function(){
            expect(children.length).toEqual(2);
        });
        it(" engine getScene should have triangle and camera object,acquire by getSceneGameObject method", function(){
            var camera = null,
                triangle = null;

            children.forEach(function (item) {
                if(item.geometry){
                    triangle = item;
                }
                else{
                    camera = item;
                }
            });

            expect(engineTool.isCamera(camera)).toBeTruthy();
            expect(engineTool.isTriangle(triangle)).toBeTruthy();
        });
    });
});
