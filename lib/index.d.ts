declare function createLayer({ type, options, data }: CreateLayerInputs): Layer;

declare function createPitch(pitchSelector: string, pitchOptions: PitchOptions): Pitch;

declare var Rabona: {
    pitch: typeof createPitch;
    layer: typeof createLayer;
};

export { Rabona as default };
