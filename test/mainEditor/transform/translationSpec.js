describe("test translation", function(){
    var state = null,
        sandbox = null,
        gl = null,
        uniform = 100,
        triangle,
        mMatrixOld = [],
        mMatrixNew = [],
        device = null;

    var setTriangleTranslateView = we.setTriangleTranslateView,
        init = we.initEngineBuss,
        getDeviceOper = we.getDeviceOper,
        renderBuss = we.renderBuss,
        MainViewData = we.MainViewData,
        getTransformOper = we.getTransformOper;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        state = stateTool.createState();

        device = getDeviceOper();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));

        gl = device.gl;
        sandbox.stub(gl,"getUniformLocation").returns(uniform);

        state = init(state);
        renderBuss();

        MainViewData.state = state;
        triangle = state.getIn(["scene", "triangle"]);

        getTransformOper(triangle).mMatrix.elements.forEach(function (i) {
            mMatrixOld.push(i)
        });
    });
    afterEach(function(){
        sandbox.restore();
        sceneTool.removeSceneGameObjects();
    });

    it("test setTriangleTranslateView,get the triangle position compare", function(){
        setTriangleTranslateView(0.5,0,0);

        getTransformOper(triangle).mMatrix.elements.forEach(function (i) {
            mMatrixNew.push(i)
        });

        expect(mMatrixOld).not.toEqual(mMatrixNew)
    });
});

