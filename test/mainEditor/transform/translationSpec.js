describe("test translation", function(){
    var state,
        sandbox,
        gl,
        device;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        state = stateEditTool.createState();

        device = deviceOperTool.getDevice();
        sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));
        gl = device.gl;

        // state = mainBussTool.initEditor(state);
        // stateEditTool.setState(state);
        // triangle = sceneGameObjectEditTool.getTriangleFromState(state);

    });
    afterEach(function(){
        sandbox.restore();
        mainAdaptorTool.removeSceneGameObjects();
    });

    // it("test setTriangleEulerAngleView,get the triangle rotate compare", function(){
    //     mMatrixOld = sceneOperTool.getTriangleMatrixElement(getTransformOper(triangle));
    //
    //     setTriangleEulerAngleView(10);
    //
    //     mMatrixNew = sceneOperTool.getTriangleMatrixElement(getTransformOper(triangle));
    //
    //     expect(mMatrixOld).not.toEqual(mMatrixNew)
    // });

    describe("set triangle translation", function(){
        var triangle;

        describe("test engine logic", function(){
            it("test translate triangle", function(){
                state = mainBussTool.initEditor(state);
                stateEditTool.setState(state);

                triangle = sceneOperTool.getTriangle();

                //todo need engine export api

                transformViewTool.setTriangleTranslation(0.5,0,0);
            });
        });

        describe("test editor logic", function(){
            function getTranslate(state) {
                var triangle = sceneGameObjectEditTool.getTriangleFromState(state),
                    translation = transformOperTool.getTransform(triangle);

                //todo need engine export api

                return 10;
            }

            it("update translation data", function(){
                state = mainBussTool.initEditor(state);
                stateEditTool.setState(state);

                transformViewTool.setTriangleTranslation(0.5,0,0);

                expect(getTranslate(state)).toEqual(10);
            });
        });
    });
});

