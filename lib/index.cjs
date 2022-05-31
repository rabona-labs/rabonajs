"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } var _class;// src/Layer/Layer.ts
var Layer = class {
  constructor(type, options, data) {
    this.type = type;
    this.options = options;
    this.data = data;
  }
  
  
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
var _d3 = require('d3'); var d3 = _interopRequireWildcard(_d3);
var _uniqid = require('uniqid'); var _uniqid2 = _interopRequireDefault(_uniqid);
var Pitch = (_class = class {
  constructor(pitchSelector, pitchOptions) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);
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
  __init() {this.sixYardBox = {
    width: 6,
    heigth: 20,
    top: 30
  }}
  __init2() {this.penaltyBox = {
    width: 18,
    heigth: 44,
    top: 18
  }}
  __init3() {this.goal = {
    width: 3,
    heigth: 8,
    top: 36
  }}
  
  get pitch() {
    return this._pitch;
  }
  set pitch(val) {
    this._pitch = val;
  }
  
  get layers() {
    return this._layers;
  }
  set layers(val) {
    this._layers = val;
  }
  
  getOptions() {
    return this.pitchOptions;
  }
  initPitch(pitchSelector, pitchOptions, sizes) {
    const svg = d3.select(`#${pitchSelector}`).append("svg").attr("width", sizes.width + pitchOptions.padding).attr("height", sizes.height + pitchOptions.padding);
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
    console.log("data", this, layer);
    const id = _uniqid2.default.call(void 0, "rabona");
    if (this.layers[id]) {
      return this;
    }
    this.layers[id] = layer;
    layer.pitchToAdd = this;
    layer.id = id;
    const currentPitch = (_a = this.pitch) == null ? void 0 : _a.append("g").attr("id", id);
    for (const pass of layer.data) {
      currentPitch.append("line").style("stroke", "magenta").style("stroke-width", 1.2).attr("x1", pass.startX * this.pitchOptions.scaler + 50).attr("y1", pass.startY * this.pitchOptions.scaler + 50).attr("x2", pass.endX * this.pitchOptions.scaler + 50).attr("y2", pass.endY * this.pitchOptions.scaler + 50);
    }
    return this;
  }
  removeLayer(layer) {
    const id = layer.id;
    if (!this._layers[id]) {
      return this;
    }
    const selectedLayer = this.pitch.select(`#${id}`);
    selectedLayer.remove();
    delete this._layers[id];
    layer.pitchToAdd = void 0;
    layer.id = void 0;
    return this;
  }
}, _class);
function createPitch(pitchSelector, pitchOptions) {
  return new Pitch(pitchSelector, pitchOptions);
}

// src/index.ts
var Rabona = {
  pitch: createPitch,
  layer: createLayer
};
var src_default = Rabona;


exports.default = src_default;
