let getXAxisColor = () => [|1., 0., 0.|];

let getYAxisColor = () => [|0., 1., 0.|];

let getZAxisColor = () => [|0., 0., 1.|];

let getXYPlaneColor = () => getZAxisColor();

let getXZPlaneColor = () => getYAxisColor();

let getYZPlaneColor = () => getXAxisColor();