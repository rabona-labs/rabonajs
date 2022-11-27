import { Pitch } from '../Pitch';

export type RabonaLayer = 'line' | 'circle' | 'passLayer';
export type RabonaLineLayerOptions = {
  color: string;
  width: number;
  showArrows?: boolean;
};

export type RabonaPassLayerOptions = RabonaLineLayerOptions & {
  circleRadius?: number;
};

export type RabonaLayerOptions = RabonaLineLayerOptions | RabonaPassLayerOptions;

export type RabonaPassLayerData = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type RabonaLineLayerData = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type RabonaCircleLayerData = {
  radius: number;
  cx: number;
  cy: number;
};

export type RabonaData =
  | RabonaLineLayerData[]
  | RabonaCircleLayerData[]
  | RabonaPassLayerData[];

class Layer {
  public pitchToAdd?: Pitch;
  public id?: string;
  constructor(
    public type: RabonaLayer,
    public options: RabonaLayerOptions,
    public data: RabonaData,
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
  data: RabonaData;
};
export function createLayer({ type, options, data }: CreateLayerInputs) {
  return new Layer(type, options, data);
}
