import { Pitch } from '../Pitch';
export declare enum RabonaLayerType {
    Line = "line",
    Circle = "circle",
    BallMovement = "ballMovement"
}
export declare type RabonaLayer = RabonaLayerType;
export declare type RabonaLineLayerOptions = {
    color: string;
    width: number;
    showArrows?: boolean;
    getLineColor?: (data: any) => string;
};
export declare type RabonaBallMovementOptions = RabonaLineLayerOptions & {
    radius?: number;
    getCircleColor?: (data: any) => string;
    getTextColor?: (data: any) => string;
    getWitdh?: (data: any) => number;
};
export declare type RabonaCircleLayerOptions = RabonaLineLayerOptions & {
    radius: number;
    getCircleColor?: (data: any) => string;
    stroke?: string;
    strokeWidth?: number;
};
export declare type RabonaLayerOptions = RabonaLineLayerOptions | RabonaBallMovementOptions;
export declare type RabonaBallMovementData = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    label: string;
};
export declare type RabonaLineLayerData = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};
export declare type RabonaCircleLayerData = {
    radius: number;
    startX: number;
    startY: number;
    label?: string;
};
export declare type RabonaData = RabonaLineLayerData[] | RabonaCircleLayerData[] | RabonaBallMovementData[];
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
    type: 'ballMovement';
    options: RabonaBallMovementOptions;
    data: RabonaBallMovementData[];
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
