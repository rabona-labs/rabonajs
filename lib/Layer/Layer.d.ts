import { Pitch } from '../Pitch';
export declare type RabonaLayerType = 'pass | shoot';
declare class Layer {
  type: RabonaLayerType;
  options: any;
  data: any;
  pitchToAdd?: Pitch;
  id?: string;
  constructor(type: RabonaLayerType, options: any, data: any);
  addTo(pitch: Pitch): this;
  remove(): this;
  removeFrom(obj?: Pitch): this;
}
export { Layer };
export declare type CreateLayerInputs = {
  type: any;
  options: any;
  data: any;
};
export declare function createLayer({ type, options, data }: CreateLayerInputs): Layer;
