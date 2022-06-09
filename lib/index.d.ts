declare function createPitch(pitchSelector: string, pitchOptions: PitchOptions): Pitch;

declare function createLayer({ type, options, data }: CreateLayerInputs): Layer;

declare const Rabona: {
    pitch: typeof createPitch;
    layer: typeof createLayer;
};

export { Rabona as default };
