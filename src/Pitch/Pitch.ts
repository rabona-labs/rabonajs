import * as d3 from 'd3';
import uniqid from 'uniqid';

import { Layer } from '../Layer';

export type PitchOptions = {
  scaler: number;
  height: number;
  width: number;
  padding: number;
  linecolour: string;
  fillcolour: string;
};

export class Pitch {
  private sixYardBox = {
    width: 6,
    heigth: 20,
    top: 30,
  };

  private penaltyBox = {
    width: 18,
    heigth: 44,
    top: 18,
  };

  private goal = {
    width: 3,
    heigth: 8,
    top: 36,
  };

  private _pitch: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | undefined;

  get pitch() {
    return this._pitch;
  }

  set pitch(val) {
    this._pitch = val;
  }

  private _layers: any; //TODO add types for layer

  get layers() {
    return this._layers;
  }

  set layers(val) {
    this._layers = val;
  }

  sizes: any;

  constructor(private pitchSelector: string, private pitchOptions: PitchOptions) {
    this.sizes = {
      width: pitchOptions.width * pitchOptions.scaler,
      height: pitchOptions.height * pitchOptions.scaler,
      sixYardBoxWidth: this.sixYardBox.width * pitchOptions.scaler,
      sixYardBoxHeight: this.sixYardBox.heigth * pitchOptions.scaler,
      sixYardBoxTop: this.sixYardBox.top * pitchOptions.scaler,
      penaltyBoxWidth: this.penaltyBox.width * pitchOptions.scaler,
      penaltyBoxHeigth: this.penaltyBox.heigth * pitchOptions.scaler,
      penaltyBoxTop: this.penaltyBox.top * pitchOptions.scaler,
      goalBoxWidth: this.goal.width * pitchOptions.scaler,
      goalBoxHeigth: this.goal.heigth * pitchOptions.scaler,
      goalBoxTop: this.goal.top * pitchOptions.scaler,
    };

    this.layers = {};

    this.initPitch(pitchSelector, pitchOptions, this.sizes);
  }

  getOptions() {
    return this.pitchOptions;
  }

  initPitch(pitchSelector: string, pitchOptions: PitchOptions, sizes: any) {
    const svg = d3
      .select(`#${pitchSelector}`)
      .append('svg')
      .attr('width', sizes.width + pitchOptions.padding)
      .attr('height', sizes.height + pitchOptions.padding);

    svg
      .append('rect')
      .attr('x', 0) // position the left of the rectangle
      .attr('y', 0) // position the top of the rectangle
      .attr('width', sizes.width + pitchOptions.padding)
      .attr('height', sizes.height + pitchOptions.padding)
      .style('fill', pitchOptions.fillcolour);

    // draw a rectangle pitch outline
    svg
      .append('rect') // attach a rectangle
      .attr('x', 50) // position the left of the rectangle
      .attr('y', 50) // position the top of the rectangle
      .attr('height', sizes.height) // set the height
      .attr('width', sizes.width) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // draw a rectangle - half 1
    svg
      .append('rect') // attach a rectangle
      .attr('x', sizes.width / 2 + pitchOptions.padding - 50) // position the left of the rectangle
      .attr('y', 50) // position the top of the rectangle
      .attr('height', sizes.height) // set the height
      .attr('width', sizes.width / 2) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // middle circle
    svg
      .append('circle') // attach a circle
      .attr('cx', sizes.width / 2 + pitchOptions.padding - 50) // position the x-centre
      .attr('cy', sizes.height / 2 + 50) // position the y-centre
      .attr('r', 60) // set the radius
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // six yard box
    svg
      .append('rect') // attach a rectangle
      .attr('x', 50) // position the left of the rectangle
      .attr('y', sizes.sixYardBoxTop + 50) // position the top of the rectangle
      .attr('height', sizes.sixYardBoxHeight) // set the height
      .attr('width', sizes.sixYardBoxWidth) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // penalty box
    svg
      .append('rect')
      .attr('x', 50) // position the left of the rectangle
      .attr('y', sizes.penaltyBoxTop + 50) // position the top of the rectangle
      .attr('height', sizes.penaltyBoxHeigth) // set the height
      .attr('width', sizes.penaltyBoxWidth) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // six yard box2
    svg
      .append('rect') // attach a rectangle
      .attr('x', sizes.width + 14) // position the left of the rectangle
      .attr('y', sizes.sixYardBoxTop + 50) // position the top of the rectangle
      .attr('height', sizes.sixYardBoxHeight) // set the height
      .attr('width', sizes.sixYardBoxWidth) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // penalty box 2
    svg
      .append('rect')
      .attr('x', sizes.width - 58) // position the left of the rectangle
      .attr('y', sizes.penaltyBoxTop + 50) // position the top of the rectangle
      .attr('height', sizes.penaltyBoxHeigth) // set the height
      .attr('width', sizes.penaltyBoxWidth) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // goal 1
    svg
      .append('rect')
      .attr('x', 25 + 6) // position the left of the rectangle
      .attr('y', sizes.goalBoxTop + 50) // position the top of the rectangle
      .attr('height', sizes.goalBoxHeigth) // set the height
      .attr('width', sizes.goalBoxWidth) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // goal 2
    svg
      .append('rect')
      .attr('x', sizes.width + 50) // position the left of the rectangle
      .attr('y', sizes.goalBoxTop + 50) // position the top of the rectangle
      .attr('height', sizes.goalBoxHeigth) // set the height
      .attr('width', sizes.goalBoxWidth) // set the width
      .style('stroke-width', 5) // set the stroke width
      .style('stroke', pitchOptions.linecolour) // set the line colour
      .style('fill', 'none'); // set the fill colour

    // svg.call(d3.zoom().on('zoom', zoomed));

    // function zoomed({ transform }) {
    //   svg.attr('transform', transform);
    // }
    this.pitch = svg;

    return svg;
  }

  addLayer(this: Pitch, layer: Layer) {
    console.log('data', this, layer);
    let id = uniqid('rabona');
    if (this.layers[id]) {
      return this;
    }
    this.layers[id] = layer;

    layer.pitchToAdd = this;
    layer.id = id;

    // TODO add beforeAdd events here
    // if (layer.beforeAdd) {
    // 	layer.beforeAdd(this);
    // }

    const currentPitch = this.pitch?.append('g').attr('id', id);
    for (const pass of layer.data) {
      currentPitch
        .append('line')
        .style('stroke', 'magenta')
        .style('stroke-width', 1.2)
        .attr('x1', pass.startX * this.pitchOptions.scaler + 50)
        .attr('y1', pass.startY * this.pitchOptions.scaler + 50)
        .attr('x2', pass.endX * this.pitchOptions.scaler + 50)
        .attr('y2', pass.endY * this.pitchOptions.scaler + 50);
      // .attr('marker-end');
    }
    // console.log('add layer');
    return this;
  }

  removeLayer(layer: Layer) {
    let id = layer.id!;

    if (!this._layers[id]) {
      return this;
    }

    const selectedLayer = this.pitch.select(`#${id}`);
    selectedLayer.remove();
    delete this._layers[id];
    layer.pitchToAdd = undefined;
    layer.id = undefined;

    return this;
  }
}

export function createPitch(pitchSelector: string, pitchOptions: PitchOptions) {
  return new Pitch(pitchSelector, pitchOptions);
}
