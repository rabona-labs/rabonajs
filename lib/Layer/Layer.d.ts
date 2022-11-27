import { Pitch } from '../Pitch';
export declare enum RabonaLayerType {
    Line = "line",
    Circle = "circle",
    PassLayer = "passLayer"
}
export declare type RabonaLayer = RabonaLayerType;
export declare type RabonaLineLayerOptions = {
    color: string;
    width: number;
    showArrows?: boolean;
};
export declare type RabonaPassLayerOptions = RabonaLineLayerOptions & {
    radius?: number;
};
export declare type RabonaCircleLayerOptions = RabonaLineLayerOptions & {
    radius: number;
};
export declare type RabonaLayerOptions = RabonaLineLayerOptions | RabonaPassLayerOptions;
export declare type RabonaPassLayerData = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
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
export declare type RabonaData = RabonaLineLayerData[] | RabonaCircleLayerData[] | RabonaPassLayerData[];
declare class Layer {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaData;
    pitchToAdd?: Pitch;
    id?: string;
    constructor(type: RabonaLayer, options: RabonaLayerOptions, data: RabonaData);
    addTo(pitch: Pitch): this;
    remove(): this;
    removeFrom(obj?: Pitch): this;
}
export { Layer };
export declare type CreateLayerInputs = {
    type: RabonaLayer;
    options: RabonaLayerOptions;
    data: RabonaData;
};
export declare function createLayer({ type, options, data, }: {
    type: 'passLayer';
    options: RabonaPassLayerOptions;
    data: RabonaPassLayerData[];
}): Layer;
export declare function createLayer({ type, options, data, }: {
    type: 'line';
    options: RabonaLineLayerOptions;
    data: RabonaLineLayerData[];
}): Layer;
export declare function createLayer({ type, options, data, }: {
    type: 'circle';
    options: RabonaCircleLayerOptions;
    data: RabonaCircleLayerData[];
}): Layer;
