// src/Layer/Layer.ts
var Layer = class {
  constructor(type, options, data) {
    this.type = type;
    this.options = options;
    this.data = data;
  }
  pitchToAdd;
  id;
  addTo(pitch) {
    pitch.addLayer(this);
    return this;
  }
  remove() {
    return this.removeFrom(this.pitchToAdd);
  }
  removeFrom(obj) {
    if (obj) {
      obj.removeLayer(this);
    }
    return this;
  }
};
function createLayer({ type, options, data }) {
  return new Layer(type, options, data);
}

// src/Pitch/Pitch.ts
import * as d3 from "d3";
import uniqid from "uniqid";
var Pitch = class {
  constructor(pitchSelector, pitchOptions) {
    this.pitchSelector = pitchSelector;
    this.pitchOptions = pitchOptions;
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
      goalBoxTop: this.goal.top * pitchOptions.scaler
    };
    this.layers = {};
    this.initPitch(pitchSelector, pitchOptions, this.sizes);
  }
  sixYardBox = {
    width: 6,
    heigth: 20,
    top: 30
  };
  penaltyBox = {
    width: 18,
    heigth: 44,
    top: 18
  };
  goal = {
    width: 3,
    heigth: 8,
    top: 36
  };
  _pitch;
  get pitch() {
    return this._pitch;
  }
  set pitch(val) {
    this._pitch = val;
  }
  _layers;
  get layers() {
    return this._layers;
  }
  set layers(val) {
    this._layers = val;
  }
  _sizes;
  get sizes() {
    return this._sizes;
  }
  set sizes(value) {
    this._sizes = value;
  }
  getOptions() {
    return this.pitchOptions;
  }
  initPitch(pitchSelector, pitchOptions, sizes) {
    const svg = d3.select(`#${pitchSelector}`).append("svg").attr("width", "100%").attr("viewBox", `0 0 ${sizes.width + pitchOptions.padding} ${sizes.height + pitchOptions.padding}`);
    if (pitchOptions.vertical) {
      svg.style("transform", "perspective(400px) rotateX(219deg) rotate(90deg)");
      svg.style("width", "70%");
      svg.style("margin", "0 auto");
      svg.style("display", "block");
    }
    svg.append("rect").attr("x", 0).attr("y", 0).attr("width", sizes.width + pitchOptions.padding).attr("height", sizes.height + pitchOptions.padding).style("fill", pitchOptions.fillcolour);
    svg.append("rect").attr("x", 50).attr("y", 50).attr("height", sizes.height).attr("width", sizes.width).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("rect").attr("x", sizes.width / 2 + pitchOptions.padding - 50).attr("y", 50).attr("height", sizes.height).attr("width", sizes.width / 2).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("circle").attr("cx", sizes.width / 2 + pitchOptions.padding - 50).attr("cy", sizes.height / 2 + 50).attr("r", 60).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("rect").attr("x", 50).attr("y", sizes.sixYardBoxTop + 50).attr("height", sizes.sixYardBoxHeight).attr("width", sizes.sixYardBoxWidth).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("rect").attr("x", 50).attr("y", sizes.penaltyBoxTop + 50).attr("height", sizes.penaltyBoxHeigth).attr("width", sizes.penaltyBoxWidth).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("rect").attr("x", sizes.width + 14).attr("y", sizes.sixYardBoxTop + 50).attr("height", sizes.sixYardBoxHeight).attr("width", sizes.sixYardBoxWidth).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("rect").attr("x", sizes.width - 58).attr("y", sizes.penaltyBoxTop + 50).attr("height", sizes.penaltyBoxHeigth).attr("width", sizes.penaltyBoxWidth).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("rect").attr("x", 25 + 6).attr("y", sizes.goalBoxTop + 50).attr("height", sizes.goalBoxHeigth).attr("width", sizes.goalBoxWidth).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    svg.append("rect").attr("x", sizes.width + 50).attr("y", sizes.goalBoxTop + 50).attr("height", sizes.goalBoxHeigth).attr("width", sizes.goalBoxWidth).style("stroke-width", 5).style("stroke", pitchOptions.linecolour).style("fill", "none");
    this.pitch = svg;
    return svg;
  }
  addLayer(layer) {
    var _a;
    const id = uniqid("rabona");
    if (this.layers[id]) {
      return this;
    }
    this.layers[id] = layer;
    layer.pitchToAdd = this;
    layer.id = id;
    const newLayer = (_a = this.pitch) == null ? void 0 : _a.append("g").attr("id", id);
    switch (layer.type) {
      case "circle":
        layer.data.forEach((circle) => {
          newLayer.append("circle").attr("cx", circle.cx * this.pitchOptions.scaler + 50).attr("cy", circle.cy * this.pitchOptions.scaler + 50).attr("r", circle.radius || 10).style("fill", layer.options.color);
        });
        break;
      case "ballMovement":
        layer.data.forEach((record) => {
          var _a2, _b;
          const { options } = layer;
          const radius = options.radius || 15;
          const lineColor = options.getLineColor ? options.getLineColor(record) : options.color;
          const circleColor = options.getCircleColor ? (_a2 = options.getCircleColor) == null ? void 0 : _a2.call(options, record) : options.color;
          const textColor = options.getTextColor ? (_b = options.getTextColor) == null ? void 0 : _b.call(options, record) : "black";
          layer.options.showArrows ? newLayer.append("svg:defs").append("svg:marker").attr("id", "arrow").attr("viewBox", "0 -5 10 10").attr("refX", 0).attr("markerWidth", 5).attr("markerHeight", 5).attr("strokeWidth", layer.options.width || 1.2).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5").style("fill", lineColor || "magenta") : null;
          newLayer.append("line").attr("id", "line").style("stroke", lineColor || "magenta").style("stroke-width", options.width || 1.2).attr("x1", record.startX * this.pitchOptions.scaler + 50).attr("y1", record.startY * this.pitchOptions.scaler + 50).attr("x2", record.endX * this.pitchOptions.scaler + 50).attr("y2", record.endY * this.pitchOptions.scaler + 50).attr("marker-end", "url(#arrow)");
          newLayer.append("circle").attr("cx", record.startX * this.pitchOptions.scaler + 50).attr("cy", record.startY * this.pitchOptions.scaler + 50).attr("r", radius).style("fill", circleColor);
          if (record.label) {
            newLayer.append("text").text(function() {
              return record.label;
            }).attr("id", "text").attr("x", record.startX * this.pitchOptions.scaler + 50).attr("y", record.startY * this.pitchOptions.scaler + 50).attr("font-family", "sans-serif").attr("font-size", radius + 3).attr("fill", textColor).attr("text-anchor", "middle").attr("transform", "translate(0,0)rotate(0)").attr("alignment-baseline", "middle").attr("z-index", 1e3).on("mouseover", (d) => d3.select(d.srcElement.parentNode).raise());
          }
        });
        break;
      case "line":
      default:
        layer.data.forEach((line) => {
          layer.options.showArrows ? newLayer.append("svg:defs").append("svg:marker").attr("id", "arrow").attr("viewBox", "0 -5 10 10").attr("refX", 0).attr("markerWidth", 5).attr("markerHeight", 5).attr("strokeWidth", layer.options.width || 1.2).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5").style("fill", layer.options.color || "magenta") : null;
          newLayer.append("line").style("stroke", layer.options.color || "magenta").style("stroke-width", layer.options.width || 1.2).attr("x1", line.startX * this.pitchOptions.scaler + 50).attr("y1", line.startY * this.pitchOptions.scaler + 50).attr("x2", line.endX * this.pitchOptions.scaler + 50).attr("y2", line.endY * this.pitchOptions.scaler + 50).attr("marker-end", "url(#arrow)");
        });
        break;
    }
    return this;
  }
  removeLayer(layer) {
    const id = layer.id;
    if (id && !this._layers[id]) {
      return this;
    }
    const selectedLayer = this.pitch.select(`#${id}`);
    selectedLayer.remove();
    if (id) {
      delete this._layers[id];
    }
    layer.pitchToAdd = void 0;
    layer.id = void 0;
    return this;
  }
};
function createPitch(pitchSelector, pitchOptions) {
  return new Pitch(pitchSelector, pitchOptions);
}

// src/index.ts
var Rabona = {
  pitch: createPitch,
  layer: createLayer
};
var src_default = Rabona;
export {
  src_default as default
};
