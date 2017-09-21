import { shallow, render, ShallowWrapper } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import ColorPicker from "../../../../../src/editor/mainEditor/component/inspector/component/material/ui/component/ColorPicker";

describe("ColorPicker Component", () => {

    var container: ShallowWrapper = null;
    var containerInst: ColorPicker = null;
    var color: string = null
    var onChange: sinon.SinonSpy = null;
    var sandbox: sinon.SinonSandbox = null;

    const button = () => container.find("> .button")
    const picker = () => container.find("> .picker")

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();
        color =  "#FFFFFF",
        onChange = sandbox.spy(),
        container = shallow(<ColorPicker color={"#FFFFFF"} onChange={onChange}/>);
        containerInst = container.instance() as ColorPicker
    });
    afterEach(()=>{
        sandbox.restore();
    });

    it("Should the button being with initial color", () => {
        expect(button().exists());
        expect(button().get(0).props.style).toHaveProperty("backgroundColor", color)
    });

    it("Should popup picker after click", () => {
        button().simulate("click");
        expect(container.state('displayPicker')).toBeTruthy();
        expect(picker().children().length).toBe(1);
        button().simulate("click");
        expect(container.state('displayPicker')).toBeFalsy();
        expect(picker().children().length).toBe(0);
    });

    it("Should call onChange with handleChange", () => {
        const newColor = "#000000"
        containerInst.handleChange(newColor)
        expect(onChange.calledOnce).toBeTruthy()
        expect(onChange.calledWith(newColor)).toBeTruthy()
    });

})