import {
  createLayer,
  Layer,
  RabonaCircleLayerOptions,
  RabonaData,
  RabonaLayerType,
  RabonaLineLayerData,
  RabonaLineLayerOptions,
} from './layer';

describe('createLayer', () => {
  it('should create a layer with the correct type and options', () => {
    const options: RabonaCircleLayerOptions = {
      color: 'red',
      width: 5,
      radius: 10,
    };
    const data: RabonaData = [
      {
        radius: 10,
        startX: 0,
        startY: 0,
        label: 'Test Circle',
      },
    ];
    const layer = createLayer({
      type: RabonaLayerType.Circle,
      options,
      data,
    });
    expect(layer).toBeInstanceOf(Layer);
    expect(layer.type).toEqual(RabonaLayerType.Circle);
    expect(layer.options).toEqual(options);
    expect(layer.data).toEqual(data);
  });
});

describe('Layer', () => {
  it('should add the layer to the given pitch', () => {
    const pitch = {
      addLayer: jest.fn(),
    };
    const data: RabonaLineLayerData[] = [
      {
        startX: 0,
        startY: 0,
        endX: 100,
        endY: 50,
      },
    ];

    const options: RabonaLineLayerOptions = {
      width: 2,
      color: 'red',
    };
    const layer = new Layer(RabonaLayerType.Line, options, data);
    pitch.addLayer(layer);
    expect(pitch.addLayer).toHaveBeenCalledWith(layer);
  });

  it('should remove the layer from the pitch it is currently active on', () => {
    const pitch = {
      removeLayer: jest.fn(),
    };
    const data: RabonaLineLayerData[] = [
      {
        startX: 0,
        startY: 0,
        endX: 100,
        endY: 50,
      },
    ];

    const options: RabonaLineLayerOptions = {
      width: 2,
      color: 'red',
    };
    const layer = new Layer(RabonaLayerType.Line, options, data);
    // @ts-ignore
    layer.pitchToAdd = pitch;
    layer.remove();
    expect(pitch.removeLayer).toHaveBeenCalledWith(layer);
  });
});
