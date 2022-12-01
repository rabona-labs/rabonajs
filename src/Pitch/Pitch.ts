import * as d3 from 'd3';
import uniqid from 'uniqid';

import { Layer } from '../Layer';
import {
  RabonaBallMovementData,
  RabonaBallMovementOptions,
  RabonaCircleLayerData,
  RabonaLineLayerData,
} from '../Layer/Layer';

export type RabonaPitchOptions = {
  scaler: number;
  height: number;
  width: number;
  padding: number;
  linecolour: string;
  fillcolour: string;
  vertical?: boolean;
};

type RabonaPitchSizeOptions = {
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
  public get pitch() {
    return this._pitch;
  }
  public set pitch(val) {
    this._pitch = val;
  }

  private _layers: { [id: string]: Layer };
  public get layers() {
    return this._layers;
  }
  public set layers(val) {
    this._layers = val;
  }

  private _sizes: RabonaPitchSizeOptions;
  public get sizes(): RabonaPitchSizeOptions {
    return this._sizes;
  }
  public set sizes(value: RabonaPitchSizeOptions) {
    this._sizes = value;
  }

  constructor(private pitchSelector: string, private pitchOptions: RabonaPitchOptions) {
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

  initPitch(
    pitchSelector: string,
    pitchOptions: RabonaPitchOptions,
    sizes: RabonaPitchSizeOptions,
  ) {
    const svg = d3
      .select(`#${pitchSelector}`)
      .append('svg')
      .attr('width', '100%')
      .attr(
        'viewBox',
        `0 0 ${sizes.width + pitchOptions.padding} ${
          sizes.height + pitchOptions.padding
        }`,
      );

    // experimental
    if (pitchOptions.vertical) {
      svg.style('transform', 'perspective(400px) rotateX(219deg) rotate(90deg)');
      svg.style('width', '70%');
      svg.style('margin', '0 auto');
      svg.style('display', 'block');
    }

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
    const id = uniqid('rabona');
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

    const newLayer = this.pitch?.append('g').attr('id', id);

    layer.options.showArrows
      ? newLayer
          .append('svg:defs')
          .append('svg:marker')
          .attr('id', 'arrow')
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 0) //so that it comes towards the center.
          .attr('markerWidth', 5)
          .attr('markerHeight', 5)
          .attr('strokeWidth', layer.options.width || 1.2)
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('d', 'M0,-5L10,0L0,5')
          .style('fill', layer.options.color || 'magenta')
      : null;

    switch (layer.type) {
      case 'circle':
        (layer.data as RabonaCircleLayerData[]).forEach((circle) => {
          newLayer
            .append('circle')
            .attr('cx', circle.cx * this.pitchOptions.scaler + 50)
            .attr('cy', circle.cy * this.pitchOptions.scaler + 50)
            .attr('r', circle.radius || 10)
            .style('fill', layer.options.color);
        });
        break;
      case 'ballMovement':
        (layer.data as RabonaBallMovementData[]).forEach((pass) => {
          const radius = (layer.options as RabonaBallMovementOptions).radius || 15;
          newLayer
            .append('line')
            .attr('id', 'line')
            .style('stroke', layer.options.color || 'magenta')
            .style('stroke-width', layer.options.width || 1.2)
            .attr('x1', pass.startX * this.pitchOptions.scaler + 50)
            .attr('y1', pass.startY * this.pitchOptions.scaler + 50)
            .attr('x2', pass.endX * this.pitchOptions.scaler + 50)
            .attr('y2', pass.endY * this.pitchOptions.scaler + 50)
            .attr('marker-end', 'url(#arrow)');
          newLayer
            .append('circle')
            .attr('cx', pass.startX * this.pitchOptions.scaler + 50)
            .attr('cy', pass.startY * this.pitchOptions.scaler + 50)
            .attr('r', radius)
            .style('fill', layer.options.color);

          /* Create the text for each block */
          if (pass.label) {
            newLayer
              .append('text')
              .text(function () {
                return pass.label;
              })
              .attr('id', 'text')
              .attr('x', pass.startX * this.pitchOptions.scaler + 50)
              .attr('y', pass.startY * this.pitchOptions.scaler + 50)
              .attr('font-family', 'sans-serif')
              .attr('font-size', radius + 3)
              // .attr('fill', 'red')
              .attr('text-anchor', 'middle')
              .attr('transform', 'translate(0,0)rotate(0)')
              .attr('alignment-baseline', 'middle')
              .attr('z-index', 1000)
              .on('mouseover', (d) => d3.select(d.srcElement.parentNode).raise());
          }
        });

        break;
      case 'line':
      default:
        (layer.data as RabonaLineLayerData[]).forEach((line) => {
          newLayer
            .append('line')
            .style('stroke', layer.options.color || 'magenta')
            .style('stroke-width', layer.options.width || 1.2)
            .attr('x1', line.startX * this.pitchOptions.scaler + 50)
            .attr('y1', line.startY * this.pitchOptions.scaler + 50)
            .attr('x2', line.endX * this.pitchOptions.scaler + 50)
            .attr('y2', line.endY * this.pitchOptions.scaler + 50)
            .attr('marker-end', 'url(#arrow)');
        });
        break;
    }
    return this;
  }

  removeLayer(layer: Layer) {
    const id = layer.id;

    if (id && !this._layers[id]) {
      return this;
    }

    const selectedLayer = this.pitch.select(`#${id}`);
    selectedLayer.remove();
    if (id) {
      delete this._layers[id];
    }
    layer.pitchToAdd = undefined;
    layer.id = undefined;

    return this;
  }
}

export function createPitch(pitchSelector: string, pitchOptions: RabonaPitchOptions) {
  return new Pitch(pitchSelector, pitchOptions);
}
