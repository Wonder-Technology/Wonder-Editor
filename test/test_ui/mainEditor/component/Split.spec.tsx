import {mount, shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import Split from "../../../../src/editor/mainEditor/ui/component/Split";
import {getDom, getDomAttribute} from "../tool/domTool";
import {triggerEvent} from "../tool/eventTool";

describe("Split", () => {
    var ct,
        props,
        sandbox;

    describe("test dom", function() {
        const setShallowSplitProps = (position:string,minPercent:number,maxPercent:number) => {
            sandbox = sinon.sandbox.create();

            props = {
                position:position,
                minPercent:minPercent,
                maxPercent:maxPercent,
                onDrag:sandbox.stub(),
                onDragFinish:sandbox.stub()
            };

            ct = shallow(<Split {...props} />);
        };

        var getDiv = (ct)=>getDom(ct,"div");


        describe("test container", function(){
            var divs,
                div;


            beforeEach(function(){
                setShallowSplitProps("right",15,25);

                divs = getDiv(ct);
                div = getDiv(ct).at(0);

            });
            it("should add a div as container", function(){
                expect(divs.length).toEqual(1);
            });
            it("test class name",function () {
                expect(getDomAttribute(div,"className")).toEqual("drag-split");
            })
        });

        describe("test style", function(){
            var judgeStyle = (position:string,maxPercent:number,minPercent:number,width:string,height:string) => {

                setShallowSplitProps(position,minPercent,maxPercent);

                var div = getDiv(ct).at(0);

                expect(getDomAttribute(div,"style")[position]).toEqual("0px");
                expect(getDomAttribute(div,"style").width).toEqual(width);
                expect(getDomAttribute(div,"style").height).toEqual(height);
            };

            it("test position is right", function(){
                judgeStyle("right",25,15,"5px","100%");
            });
            it("test position is left", function(){
                judgeStyle("left",25,15,"5px","100%");
            });
            it("test position is top", function(){
                judgeStyle("top",25,15,"100%","5px");
            });
        });
    });

    describe("test event", function(){
        var className;

        const setMountSplitProps = (position:string,minPercent:number,maxPercent:number) =>{
            sandbox = sinon.sandbox.create();

            props = {
                position:position,
                minPercent:minPercent,
                maxPercent:maxPercent,
                onDrag:sandbox.stub(),
                onDragFinish:sandbox.stub()
            };

            ct = mount(<Split {...props} />, { attachTo: document.body } );
        };

        beforeEach(function(){
            className = ".drag-split";
        });

        it("should call onDrag during drag", function(){
            setMountSplitProps("right",15,25);

            triggerEvent(document.body.querySelector(className), "mousedown", {});
            triggerEvent(document, "mousemove", {});

            expect(props.onDrag).toCalledOnce();
        });
        it("should call onDragFinish when finish drag", function(){
            setMountSplitProps("right",15,25);

            triggerEvent(document.body.querySelector(className), "mousedown", {});
            triggerEvent(document, "mousemove", {});
            triggerEvent(document, "mouseup", {});

            expect(props.onDragFinish).toCalledOnce();
            expect(props.onDragFinish).toCalledAfter(props.onDrag);
        });

        describe("test onDrag", function(){
            var judge = (position:string, minPercent:number, maxPercent:number, [endX1, endY1], [endX2, endY2], [endX3, endY3], [endX4, endY4], [endX5, endY5, percentDistance]) => {
                it("if percent distance is larger than maxPercent,the distance is maxPercent", function(){
                    setMountSplitProps(position, minPercent, maxPercent);

                    triggerEvent(document.body.querySelector(className), "mousedown", {});
                    triggerEvent(document, "mousemove", {
                        clientX:endX1,
                        clientY:endY1
                    });
                    triggerEvent(document, "mouseup", {});

                    expect(props.onDrag).toCalledWith(maxPercent);
                });
                it("if percent distance is smaller than minPercent,the distance is minPercent", function(){
                    setMountSplitProps(position, minPercent, maxPercent);

                    triggerEvent(document.body.querySelector(className), "mousedown",{});
                    triggerEvent(document, "mousemove", {
                        clientX:endX2,
                        clientY:endY2
                    });
                    triggerEvent(document, "mouseup", {});

                    expect(props.onDrag).toCalledWith(minPercent);
                });
                it("if percent distance === maxPercent,the distance is maxPercent", function(){
                    setMountSplitProps(position, minPercent, maxPercent);

                    triggerEvent(document.body.querySelector(className), "mousedown", {});
                    triggerEvent(document, "mousemove", {
                        clientX:endX3,
                        clientY:endY3
                    });
                    triggerEvent(document, "mouseup", {});

                    expect(props.onDrag).toCalledWith(maxPercent);
                });
                it("if percent distance === minPercent,the distance is minPercent", function(){
                    setMountSplitProps(position, minPercent, maxPercent);

                    triggerEvent(document.body.querySelector(className), "mousedown",{});
                    triggerEvent(document, "mousemove", {
                        clientX:endX4,
                        clientY:endY4
                    });
                    triggerEvent(document, "mouseup", {});

                    expect(props.onDrag).toCalledWith(minPercent);
                });
                it("else,compute the distance", function(){
                    setMountSplitProps(position, minPercent, maxPercent);

                    triggerEvent(document.body.querySelector(className), "mousedown", {});
                    triggerEvent(document, "mousemove", {
                        clientX:endX5,
                        clientY:endY5
                    });
                    triggerEvent(document, "mouseup", {});

                    expect(props.onDrag).toCalledWith(percentDistance);
                });
            }

            describe("test the position is right,percent distance = endX/innerWidth*100", function(){
                judge("right", 15, 25, [400, 50], [100, 50], [256, 50],[153.6, 50], [250, 20, 24.41]);
            });

            describe("test the position is left,percent distance = (innerWidth - endX)/innerWidth*100", function(){
                judge("left", 15, 25, [700, 50], [900, 50],[768, 50],[870.4, 50], [800, 30, 21.88]);
            });

            describe("the position is top,percent distance = (innerHeight - endY)/innerHeight*100", function(){
                judge("top", 15, 25, [50, 500], [50, 680], [50, 576], [50, 652.8], [50, 620, 19.27]);
            });
        });
    });
});