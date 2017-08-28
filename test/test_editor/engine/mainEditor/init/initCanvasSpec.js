describe("init canvas", function () {
    var state = null,
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

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);



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

    it("set clear color which is defined in config", function () {
        var clearColor = [0, 0, 0, 1];

        sandbox.stub(containerConfig, "clearColor", clearColor);

        mainBussTool.initContainer(canvasId);

        expect(gl.clearColor).toCalled();
    });
});
