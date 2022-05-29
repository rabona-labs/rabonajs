import { Pitch } from '../Pitch';

export type RabonaLayerType = 'pass | shoot';

class Layer {
  constructor(public type: RabonaLayerType, public options: any, public data: any) {
    // console.log(type, options, data);
  }

  addTo(pitch: Pitch) {
    pitch.addLayer(this);
    return this;
  }
}

export { Layer };

export type CreateLayerInputs = {
  type: any;
  options: any;
  data: any;
};
export function createLayer({ type, options, data }: CreateLayerInputs) {
  return new Layer(type, options, data);
}
