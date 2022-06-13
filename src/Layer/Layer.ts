import { Pitch } from '../Pitch';

export type RabonaLayer = 'line' | 'point';
export type RabonaLayerOptions = {
  color: string;
};
export type RabonaLayerData = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  length: number;
  angle: number;
};

class Layer {
  public pitchToAdd?: Pitch;
  public id?: string;
  constructor(
    public type: RabonaLayer,
    public options: RabonaLayerOptions,
    public data: RabonaLayerData[],
  ) {
    // console.log(type, options, data);
  }

  addTo(pitch: Pitch) {
    pitch.addLayer(this);
    return this;
  }

  // @method remove: this
  // Removes the layer from the pitch it is currently active on.
  remove() {
    return this.removeFrom(this.pitchToAdd);
  }

  removeFrom(obj?: Pitch) {
    if (obj) {
      obj.removeLayer(this);
    }
    return this;
  }
}

export { Layer };

export type CreateLayerInputs = {
  type: RabonaLayer;
  options: RabonaLayerOptions;
  data: RabonaLayerData[];
};
export function createLayer({ type, options, data }: CreateLayerInputs) {
  return new Layer(type, options, data);
}
