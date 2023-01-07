import * as d3 from 'd3';

import Rabona from '../src/index';
import {
  RabonaBallMovementData,
  RabonaBallMovementOptions,
  RabonaCircleLayerData,
  RabonaCircleLayerOptions,
  RabonaLineLayerData,
  RabonaLineLayerOptions,
} from '../src/Layer/Layer';
import { Pitch, RabonaPitchOptions } from '../src/Pitch/Pitch';

describe('Pitch', () => {
  it('should create an instance of Pitch', () => {
    const pitchOptions: RabonaPitchOptions = {
      scaler: 6,
      height: 70,
      width: 105,
      padding: 10,
      linecolour: 'white',
      fillcolour: 'green',
    };
    const pitchSelector = 'pitch';
    const pitch = new Pitch(pitchSelector, pitchOptions);
    expect(pitch).toBeInstanceOf(Pitch);
  });

  it('should get the correct pitch options', () => {
    const pitchOptions: RabonaPitchOptions = {
      scaler: 6,
      height: 70,
      width: 105,
      padding: 10,
      linecolour: 'white',
      fillcolour: 'green',
    };
    const pitchSelector = 'pitch';
    const pitch = new Pitch(pitchSelector, pitchOptions);
    expect(pitch.getOptions()).toEqual(pitchOptions);
  });

  it('should calculate the correct sizes for the pitch', () => {
    const pitchOptions: RabonaPitchOptions = {
      scaler: 6,
      height: 70,
      width: 105,
      padding: 10,
      linecolour: 'white',
      fillcolour: 'green',
    };
    const pitchSelector = 'pitch';
    const pitch = new Pitch(pitchSelector, pitchOptions);
    const expectedSizes = {
      width: 630,
      height: 420,
      sixYardBoxWidth: 36,
      sixYardBoxHeight: 120,
      sixYardBoxTop: 180,
      penaltyBoxWidth: 108,
      penaltyBoxHeigth: 264,
      penaltyBoxTop: 108,
      goalBoxWidth: 18,
      goalBoxHeigth: 48,
      goalBoxTop: 216,
    };
    expect(pitch.sizes).toEqual(expectedSizes);
  });

  // Add more tests for the other methods in the Pitch class
});

describe('addLayer', () => {
  let pitch: Pitch;
  const pitchSelector = 'pitch';

  beforeEach(() => {
    const pitchOptions = {
      scaler: 6,
      height: 50,
      width: 100,
      padding: 10,
      linecolour: 'black',
      fillcolour: 'green',
    };
    pitch = new Pitch(pitchSelector, pitchOptions);
  });

  it('should add a new CircleLayer to the pitch', () => {
    const data: RabonaCircleLayerData[] = [
      {
        startX: 50,
        startY: 25,
        radius: 5,
        label: 'test',
      },
    ];
    const options: RabonaCircleLayerOptions = {
      width: 2,
      radius: 5,
      color: 'red',
      stroke: 'black',
      strokeWidth: 2,
    };
    const layer = Rabona.layer({ type: 'circle', data, options });
    pitch.addLayer(layer);
    expect(Object.keys(pitch.layers)).toHaveLength(1);
  });

  // same case but for LineLayer data

  it('should add a new LineLayer to the pitch', () => {
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

    const layer = Rabona.layer({ type: 'line', data, options });
    pitch.removeAllLayers();
    pitch.addLayer(layer);
    expect(Object.keys(pitch.layers)).toHaveLength(1);
  });

  it('should append a line, circle, and text element to the newLayer selection for each record in the RabonaBallMovementData array', () => {
    const data: RabonaBallMovementData[] = [
      {
        startX: 0,
        startY: 0,
        endX: 10,
        endY: 10,
        label: 'Test Label 1',
      },
      {
        startX: 10,
        startY: 10,
        endX: 20,
        endY: 20,
        label: 'Test Label 2',
      },
    ];
    const options: RabonaBallMovementOptions = {
      showArrows: true,
      color: 'magenta',
      getLineColor: () => 'cyan',
      getCircleColor: () => 'yellow',
      getTextColor: () => 'black',
      width: 2,
      getWidth: () => 3,
    };

    const layer = Rabona.layer({ type: 'ballMovement', data, options });
    pitch.removeAllLayers();
    pitch.addLayer(layer);
    expect(Object.keys(pitch.layers)).toHaveLength(1);

    const layerKey = Object.keys(pitch.layers)[0];
    expect(layerKey).toContain('rabona');
    // Select the newLayer selection for the layer
    const newLayer = d3.select(`#${pitchSelector} svg g#${layerKey}`);
    expect(newLayer).toBeDefined();
  });
});
