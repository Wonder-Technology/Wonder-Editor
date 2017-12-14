open ExtendParseType;

let convertdRecord = (extendObj) => {
  let result: panelType = {
    name: extendObj##name,
    parent: extendObj##parent,
    render: extendObj##render,
    willRender: extendObj##willRender,
    didMount: extendObj##didMount
  };
  result
};