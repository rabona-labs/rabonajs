import { Pitch } from '../Pitch';
export declare type RabonaLayer = 'line' | 'point' | 'circle' | 'passLayer';
export declare type RabonaLayerOptions = {
    color: string;
    width: number;
};
export declare type RabonaLineLayerData = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};
export declare type RabonaCircleLayerData = {
    radius: number;
    cx: number;
    cy: number;
};
declare class Layer {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaLineLayerData[] | RabonaCircleLayerData;
    pitchToAdd?: Pitch;
    id?: string;
    constructor(type: RabonaLayer, options: RabonaLayerOptions, data: RabonaLineLayerData[] | RabonaCircleLayerData);
    addTo(pitch: Pitch): this;
    remove(): this;
    removeFrom(obj?: Pitch): this;
}
export { Layer };
export declare type CreateLayerInputs = {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaLineLayerData[] | RabonaCircleLayerData;
};
export declare function createLayer({ type, options, data }: CreateLayerInputs): Layer;
