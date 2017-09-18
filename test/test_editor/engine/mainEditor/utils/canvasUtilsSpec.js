describe("test canvasUtils engine", function(){
    var sandbox,
        engineState,
        gl;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        testTool.clearAndOpenContractCheck(sandbox);

        engineState = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(engineState);

    });
    afterEach(function(){
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("resizeCanvas", function(){
        var canvasParent,
            fakeCanvasParentProperty,
            mainCanvas,
            fakeCanvasProperty;

        beforeEach(function(){
            fakeCanvasParentProperty = {
                offsetWidth:650,
                offsetHeight:850
            };

            fakeCanvasProperty = {
                width:0,
                height:0,
                style:{
                    width:0,
                    height:0
                }
            };

            sandbox.stub(document, "querySelector").withArgs(".canvas-parent").returns(fakeCanvasParentProperty);
            sandbox.stub(document, "querySelector").withArgs("#webgl").returns(fakeCanvasProperty);

            sandbox.stub(window, "getComputedStyle").returns({
                getPropertyValue:sandbox.stub().returns(0)
            });

            canvasParent = document.querySelector(".canvas-parent");
            mainCanvas = document.querySelector("#webgl");
        });

        it("set canvas's width and height equal to canvasParent's width and height", function(){
            canvasUtilsTool.resizeCanvas();

            expect(fakeCanvasProperty.width).toEqual(fakeCanvasParentProperty.offsetWidth);
            expect(fakeCanvasProperty.height).toEqual(fakeCanvasParentProperty.offsetHeight);
        });
        it("set canvas's css style width and height equal to canvasParent's", function(){
            var styleWidth = 800,
                styleHeight = 1000;
            window.getComputedStyle.onCall(0).returns({
                getPropertyValue:sandbox.stub().returns(styleWidth)
            });
            window.getComputedStyle.onCall(1).returns({
                getPropertyValue:sandbox.stub().returns(styleHeight)
            });

            canvasUtilsTool.resizeCanvas();

            expect(fakeCanvasProperty.style.width).toEqual(styleWidth);
            expect(fakeCanvasProperty.style.height).toEqual(styleHeight);
        });
        it("called method gl.viewport to resize viewport",function () {
            canvasUtilsTool.resizeCanvas();

            expect(gl.viewport).toCalledWith(0,0,650,850);
        })
    });
});

