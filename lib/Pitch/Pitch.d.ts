import { Layer } from '../Layer';
export declare type RabonaPitchOptions = {
    scaler: number;
    height: number;
    width: number;
    padding: number;
    linecolour: string;
    fillcolour: string;
    vertical?: boolean;
    showArrows?: boolean;
};
declare type RabonaPitchSizeOptions = {
    width: number;
    height: number;
    sixYardBoxWidth: number;
    sixYardBoxHeight: number;
    sixYardBoxTop: number;
    penaltyBoxWidth: number;
    penaltyBoxHeigth: number;
    penaltyBoxTop: number;
    goalBoxWidth: number;
    goalBoxHeigth: number;
    goalBoxTop: number;
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
    private _layers;
    get layers(): {
        [id: string]: Layer;
    };
    set layers(val: {
        [id: string]: Layer;
    });
    private _sizes;
    get sizes(): RabonaPitchSizeOptions;
    set sizes(value: RabonaPitchSizeOptions);
    constructor(pitchSelector: string, pitchOptions: RabonaPitchOptions);
    getOptions(): RabonaPitchOptions;
    initPitch(pitchSelector: string, pitchOptions: RabonaPitchOptions, sizes: RabonaPitchSizeOptions): any;
    addLayer(this: Pitch, layer: Layer): Pitch;
    removeLayer(layer: Layer): this;
}
export declare function createPitch(pitchSelector: string, pitchOptions: RabonaPitchOptions): Pitch;
export {};
