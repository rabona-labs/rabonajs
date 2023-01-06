declare function createPitch(pitchSelector: string, pitchOptions: RabonaPitchOptions): Pitch;

declare function createLayer({ type, options, data, }: {
    type: 'ballMovement';
    options: RabonaBallMovementOptions;
    data: RabonaBallMovementData[];
}): Layer;
declare function createLayer({ type, options, data, }: {
    type: 'line';
    options: RabonaLineLayerOptions;
    data: RabonaLineLayerData[];
}): Layer;
declare function createLayer({ type, options, data, }: {
    type: 'circle';
    options: RabonaCircleLayerOptions;
    data: RabonaCircleLayerData[];
}): Layer;

declare const Rabona: {
    pitch: typeof createPitch;
    layer: typeof createLayer;
};

export { Rabona as default };
