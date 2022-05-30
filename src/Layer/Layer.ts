import { Pitch } from '../Pitch';

export type RabonaLayerType = 'pass | shoot';

class Layer {

  public pitchToAdd?: Pitch
  public id?: string 
  constructor(public type: RabonaLayerType, public options: any, public data: any) {
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
  type: any;
  options: any;
  data: any;
};
export function createLayer({ type, options, data }: CreateLayerInputs) {
  return new Layer(type, options, data);
}
