import { BasicMaterial } from "wonder.js/dist/es2015/component/material/BasicMaterial";
import { Color } from "wonder.js/dist/es2015/structure/Color";

import { create as createAdaptor, getColor as getColorAdaptor, setColor as setColorAdaptor } from "../../../../../../adaptor/BasicMaterialAdaptor";

export const create = createAdaptor;

export const getColor = getColorAdaptor;

export const setColor = setColorAdaptor;
