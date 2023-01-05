import { Pitch, RabonaPitchOptions } from './pitch';

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
