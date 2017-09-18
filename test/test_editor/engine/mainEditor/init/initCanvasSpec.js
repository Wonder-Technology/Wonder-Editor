describe("test init canvas engine", function () {
    var editorState = null,
        engineState = null,
        sandbox = null,
        gl;
    var canvas;
    var canvasId;
    var DomQuery;

    var containerConfig = we.containerConfig;

    function buildFakeDomQuery(canvasDom){
        return {
            css:sandbox.stub(),
            get:sandbox.stub().returns(canvasDom)
        };
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        editorState = stateEditTool.createState();

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);



        DomQuery = domTool.getDomQuery();


        canvas = {
            style:{},
            width:1,
            height:2,
            getContext:sandbox.stub().returns(gl)
        };

        canvasId = "webgl";

        sandbox.stub(DomQuery, "create");

        DomQuery.create.withArgs("#" + canvasId).returns(buildFakeDomQuery(canvas));
        DomQuery.create.withArgs("body").returns(buildFakeDomQuery(canvas));
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("init Main", function () {
        it("add canvas dom", function () {
            mainBussTool.initContainer(canvasId);

            expect(DomQuery.create).toCalled();
        });
        it("set canvas id", function () {
            mainBussTool.initContainer(canvasId);

            expect(DomQuery.create).toCalledWith("#" + canvasId);
        });
    });

    describe("set clear color which is defined in config", function() {
        var clearColor;

        beforeEach(function(){
            clearColor = [0, 0.1, 1, 1];

            sandbox.stub(containerConfig, "clearColor", clearColor);
        });

        it("set clear color after init", function () {
            mainBussTool.initContainer(canvasId);

            expect(gl.clearColor).toCalledOnce();
            expect(gl.clearColor).toCalledWith(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
        });
        it("set clear color only onvec", function () {
            mainBussTool.initContainer(canvasId);
            editorState = mainBussTool.initEditor(editorState);
            stateEditTool.setState(editorState);

            mainBussTool.loopBody(editorState);

            expect(gl.clearColor).toCalledOnce();
        });
    });
});
