describe("init canvas", function(){
    var state = null,
        sandbox = null,
        gl = null,
        uniform = null,
        device = null;

    var init = we.initCanvasBuss;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        state = stateTool.createState();

        // device = getDeviceOper();
        // sandbox.stub(device,"gl",glslUtils.buildFakeGl(sandbox));

        // gl = device.gl;

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
    });

    describe("test engine logic", function(){
        var children = null;
        var parentDomId = null;
        var parentDom;

        function buildFakeParentDom(parentDomId) {
            return $("<div>").attr("id", parentDomId);
        }

        function addDom(dom) {
            $("body").append(dom);
        }

        function removeDom(dom) {
            dom.remove();
        }

        beforeEach(function () {
            parentDomId = "parent";
            parentDom = buildFakeParentDom(parentDomId);

            addDom(parentDom);
        });
        afterEach(function () {
            removeDom(parentDom);
        })

        describe("init Main", function(){
            var canvasId;

            beforeEach(function () {
                canvasId = "webgl";
                init(canvasId, parentDomId);
            })

            it("add canvas dom", function(){
                expect($("canvas").length).toEqual(1);
            });
            it("set canvas id", function(){
                expect($("canvas").attr("id")).toEqual(canvasId)
            });
            it("set canvas's parent dom id", function(){
                expect($("canvas").parent().attr("id")).toEqual(parentDomId)
            });
        });

        it("set clear color", function(){
            //todo need engine export set clear color api

            expect().toPass();
        });
    });
});
