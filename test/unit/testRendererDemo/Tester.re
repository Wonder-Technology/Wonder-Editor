let component = ReasonReact.statelessComponent("Tester");

let make = (_children) => {
  let clickHandle = () =>{
    Js.log(123);
  };
  {
  ...component,
  render: (_self) =>
    <div className="fck">
      <div className="fff number-input-input"> (ReasonReact.stringToElement("xxx")) </div>
    </div>
  }
};