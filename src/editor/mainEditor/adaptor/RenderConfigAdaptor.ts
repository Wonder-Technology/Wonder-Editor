import { IRenderConfig } from "wonder.js/dist/es2015/renderer/worker/both_file/data/render_config";

export const setConfigData = (render_config:IRenderConfig, name:string, value:any) => {
    render_config[name] = value;
}