describe("test translation", function(){
    var state = null,
        sandbox = null,
        gl = null,
        triangle = null,
        mMatrixOld = [],
        mMatrixNew = [],
        device = null;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        state = stateEditTool.createState();

        device = deviceOperTool.getDevice();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));
        gl = device.gl;

        state = mainBussTool.initEditor(state);
        stateEditTool.setState(state);
        triangle = sceneGameObjectEditTool.getTriangleFromState(state);

    });
    afterEach(function(){
        sandbox.restore();
        mainAdaptorTool.removeSceneGameObjects();
    });

    it("test setTriangleTranslateView,get the triangle position compare", function(){
        mMatrixOld = transformOperTool.getTriangleMatrixElement(transformOperTool.getTransform(triangle));

        transformViewTool.setTriangleTranslation(0.8,0,0);

        mMatrixNew = transformOperTool.getTriangleMatrixElement(transformOperTool.getTransform(triangle));

        expect(mMatrixOld).not.toEqual(mMatrixNew)
    });
});

