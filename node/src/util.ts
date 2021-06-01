import Color from "./color";
import colors from "./lib/colors";

const extend = require("extend");
const Util = {
  extractBodyProperties: function(body: any) {
    const vertices = [];
    for (let j = 0; j < body.vertices.length; j++) {
      vertices.push({
        x: body.vertices[j].x,
        y: body.vertices[j].y,
        index: body.vertices[j].index,
        isInternal: body.vertices[j].isInternal
      });
    }
    const parts = [];
    for (let j = 0; j < body.parts.length; j++) {
      const vertices2 = [];
      for (let k = 0; k < body.parts[j].vertices.length; k++) {
        vertices2.push({
          x: body.parts[j].vertices[k].x,
          y: body.parts[j].vertices[k].y,
          isInternal: body.parts[j].vertices[k].isInternal
        });
      }
      parts.push({
        id: body.parts[j].id,
        vertices: vertices2,
        render: body.parts[j].render,
        position: body.parts[j].position,
        angle: body.parts[j].angle,
        bounds: body.parts[j].bounds,
        axes: body.parts[j].axes
      });
    }

    return {
      ...body,
      parts: parts,
      vertices: vertices,
      parent: undefined
      // id: body.id,
      // label: body.label,
      // velocity: body.velocity,
      // render: body.render,
      // position: body.position,
      // angle: body.angle,
      // bounds: body.bounds,
      // isStatic: body.isStatic
    };
  },
  clip: function(val: number, min: number, max: number) {
    val = Math.max(min, val);
    val = Math.min(max, val);
    return val;
  },
  interpolate: function(start: number, end: number, fact: number) {
    fact = Util.clip(fact, 0, 1);
    return start + (end - start) * fact;
  },
  merge: function(list: any[]) {
    function ext(o1: any, o2: any) {
      const result = {};
      extend(result, o1, o2);
      return result;
    }

    if (list.length <= 0) return {};
    if (list.length == 1) return list[0];
    else {
      let res = {};
      for (let i = 0; i < list.length; i++) res = ext(res, list[i]);
      return res;
    }
  },
  clone: function(obj: any) {
    const result = {};
    extend(result, {}, obj);
    return result;
  },
  getRandomInt: function(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getRandom: function(min: number, max: number) {
    return Math.random() * (max - min) + min;
  },
  getRandomColor: function() {
    const colorsNames = Object.keys(colors);
    const colorsVals = Object.values(colors);
    const idx = Util.getRandomInt(0, colorsVals.length);
    const c = new Color(colorsVals[idx]);
    c.name = colorsNames[idx];
    return c;
  }
};

export default Util;
