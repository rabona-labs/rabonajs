import { Pitch } from '../Pitch';
export declare type RabonaLayer = 'line' | 'point';
export declare type RabonaLayerOptions = {
    color: string;
};
export declare type RabonaLayerData = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    length: number;
    angle: number;
};
declare class Layer {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaLayerData[];
    pitchToAdd?: Pitch;
    id?: string;
    constructor(type: RabonaLayer, options: RabonaLayerOptions, data: RabonaLayerData[]);
    addTo(pitch: Pitch): this;
    remove(): this;
    removeFrom(obj?: Pitch): this;
}
export { Layer };
export declare type CreateLayerInputs = {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaLayerData[];
};
export declare function createLayer({ type, options, data }: CreateLayerInputs): Layer;
