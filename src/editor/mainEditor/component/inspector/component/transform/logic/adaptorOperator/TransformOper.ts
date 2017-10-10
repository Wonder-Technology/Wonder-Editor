import { ThreeDTransform } from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

import {
    getLocalPosition as getLocalPositionAdaptor, getPosition as getPositionAdaptor,
    setLocalPosition as setLocalPositionAdaptor, setPosition as setPositionAdaptor, translate as translateAdaptor, translateLocal as translateLocalAdaptor
} from "../../../../../../adaptor/TransformAdaptor";

export const translate = translateAdaptor;

export const translateLocal = translateLocalAdaptor;

export const setPosition = setPositionAdaptor;

export const setLocalPosition = setLocalPositionAdaptor;

export const getPosition = getPositionAdaptor;

export const getLocalPosition = getLocalPositionAdaptor;
