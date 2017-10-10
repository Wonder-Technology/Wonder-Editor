import { shallow} from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import {getDom, getDomAttribute} from "../../../../tool/domTool";
import {componentData_config} from "../../../../../../../src/editor/mainEditor/component/config/ComponentData_config";
import {execEventHandler} from "../../../../tool/eventTool";
import Position from "../../../../../../../src/editor/mainEditor/component/inspector/component/transform/ui/component/Position";

describe("Position Component", () => {
    var ct,
        props,
        component,
        sandbox;

    var getInputNumber = (ct)=>getDom(ct,"InputNumber"),
        getArticle = (ct) => getDom(ct,"article");

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        component = {index:2};

        props = {
            component:component,
            getLocalPosition: sandbox.stub().returns({
                x:0,
                y:0,
                z:0
            }),
            setLocalPosition: sandbox.stub(),
            fieldConfig:componentData_config.Transform.ThreeDTransform[0],
        };

        ct = shallow(<Position {...props}/>);
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("test dom", function() {
        var articles;

        beforeEach(function(){
            articles = getArticle(ct);
        });

        it("should add a article as container",() => {
           expect(articles.length).toEqual(1);
        });
        it("Position component should have 3 input number", () => {
            expect(getInputNumber(ct).length).toEqual(3);
        });
    });

    it("when change input number,setLocalPosition method should be called", function(){
        var inputNumber = getInputNumber(ct).at(0);
        execEventHandler(inputNumber,"onChange",0.1);

        expect(props.setLocalPosition).toCalledOnce();
    });

    describe("test change input number should call the setLocalPosition method with value",function () {
        function invokeOnChange(inputIndex,value){
            var inputNumber = getInputNumber(ct).at(inputIndex);
            execEventHandler(inputNumber,"onChange",value);
        }

        it("invoke first input number onchange with the x +0.1", function(){
            invokeOnChange(0,0.1);

            expect(props.setLocalPosition).toCalledWith(component,0.1,0,0);
        });
        it("invoke first input number onchange with the x -0.1", function(){
            invokeOnChange(0,-0.1);

            expect(props.setLocalPosition).toCalledWith(component,-0.1,0,0);
        });
        it("invoke second input number onchange with the y +0.1", function(){
            invokeOnChange(1,0.1);

            expect(props.setLocalPosition).toCalledWith(component,0,0.1,0);
        });
        it("invoke second input number onchange with the y -0.1", function(){
            invokeOnChange(1,-0.1);

            expect(props.setLocalPosition).toCalledWith(component,0,-0.1,0);
        });
        it("invoke third input number onchange with the z +0.1", function(){
            invokeOnChange(2,0.1);

            expect(props.setLocalPosition).toCalledWith(component,0,0,0.1);
        });
        it("invoke third input number onchange with the z -0.1", function(){
            invokeOnChange(2,-0.1);

            expect(props.setLocalPosition).toCalledWith(component,0,0,-0.1);
        });
    })
});
