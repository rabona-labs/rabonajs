import { Layer } from '../Layer';
export declare type PitchOptions = {
    scaler: number;
    height: number;
    width: number;
    padding: number;
    linecolour: string;
    fillcolour: string;
};
export declare class Pitch {
    private pitchSelector;
    private pitchOptions;
    private sixYardBox;
    private penaltyBox;
    private goal;
    private _pitch;
    get pitch(): any;
    set pitch(val: any);
    sizes: any;
    constructor(pitchSelector: string, pitchOptions: PitchOptions);
    getOptions(): PitchOptions;
    initPitch(pitchSelector: string, pitchOptions: PitchOptions, sizes: any): any;
    addLayer(this: Pitch, layer: Layer): Pitch;
}
export declare function createPitch(pitchSelector: string, pitchOptions: PitchOptions): Pitch;
