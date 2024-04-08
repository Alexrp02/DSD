//
// Autogenerated by Thrift Compiler (0.20.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;
var Int64 = require('node-int64');


var ttypes = require('./calculadora_compleja_types');
//HELPER FUNCTIONS AND STRUCTURES

var CalculadoraCompleja_ping_args = function(args) {
};
CalculadoraCompleja_ping_args.prototype = {};
CalculadoraCompleja_ping_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_ping_args.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_ping_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_ping_result = function(args) {
};
CalculadoraCompleja_ping_result.prototype = {};
CalculadoraCompleja_ping_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_ping_result.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_ping_result');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_sumarVectores_args = function(args) {
  this.vec1 = null;
  this.vec2 = null;
  if (args) {
    if (args.vec1 !== undefined && args.vec1 !== null) {
      this.vec1 = Thrift.copyList(args.vec1, [null]);
    }
    if (args.vec2 !== undefined && args.vec2 !== null) {
      this.vec2 = Thrift.copyList(args.vec2, [null]);
    }
  }
};
CalculadoraCompleja_sumarVectores_args.prototype = {};
CalculadoraCompleja_sumarVectores_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        this.vec1 = [];
        var _rtmp31 = input.readListBegin();
        var _size0 = _rtmp31.size || 0;
        for (var _i2 = 0; _i2 < _size0; ++_i2) {
          var elem3 = null;
          elem3 = input.readDouble();
          this.vec1.push(elem3);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        this.vec2 = [];
        var _rtmp35 = input.readListBegin();
        var _size4 = _rtmp35.size || 0;
        for (var _i6 = 0; _i6 < _size4; ++_i6) {
          var elem7 = null;
          elem7 = input.readDouble();
          this.vec2.push(elem7);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_sumarVectores_args.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_sumarVectores_args');
  if (this.vec1 !== null && this.vec1 !== undefined) {
    output.writeFieldBegin('vec1', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec1.length);
    for (var iter8 in this.vec1) {
      if (this.vec1.hasOwnProperty(iter8)) {
        iter8 = this.vec1[iter8];
        output.writeDouble(iter8);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.vec2 !== null && this.vec2 !== undefined) {
    output.writeFieldBegin('vec2', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec2.length);
    for (var iter9 in this.vec2) {
      if (this.vec2.hasOwnProperty(iter9)) {
        iter9 = this.vec2[iter9];
        output.writeDouble(iter9);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_sumarVectores_result = function(args) {
  this.success = null;
  this.e = null;
  if (args instanceof ttypes.InvalidSize) {
    this.e = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [null]);
    }
    if (args.e !== undefined && args.e !== null) {
      this.e = args.e;
    }
  }
};
CalculadoraCompleja_sumarVectores_result.prototype = {};
CalculadoraCompleja_sumarVectores_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        this.success = [];
        var _rtmp311 = input.readListBegin();
        var _size10 = _rtmp311.size || 0;
        for (var _i12 = 0; _i12 < _size10; ++_i12) {
          var elem13 = null;
          elem13 = input.readDouble();
          this.success.push(elem13);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.e = new ttypes.InvalidSize();
        this.e.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_sumarVectores_result.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_sumarVectores_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.DOUBLE, this.success.length);
    for (var iter14 in this.success) {
      if (this.success.hasOwnProperty(iter14)) {
        iter14 = this.success[iter14];
        output.writeDouble(iter14);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.e !== null && this.e !== undefined) {
    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
    this.e.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_restarVectores_args = function(args) {
  this.vec1 = null;
  this.vec2 = null;
  if (args) {
    if (args.vec1 !== undefined && args.vec1 !== null) {
      this.vec1 = Thrift.copyList(args.vec1, [null]);
    }
    if (args.vec2 !== undefined && args.vec2 !== null) {
      this.vec2 = Thrift.copyList(args.vec2, [null]);
    }
  }
};
CalculadoraCompleja_restarVectores_args.prototype = {};
CalculadoraCompleja_restarVectores_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        this.vec1 = [];
        var _rtmp316 = input.readListBegin();
        var _size15 = _rtmp316.size || 0;
        for (var _i17 = 0; _i17 < _size15; ++_i17) {
          var elem18 = null;
          elem18 = input.readDouble();
          this.vec1.push(elem18);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        this.vec2 = [];
        var _rtmp320 = input.readListBegin();
        var _size19 = _rtmp320.size || 0;
        for (var _i21 = 0; _i21 < _size19; ++_i21) {
          var elem22 = null;
          elem22 = input.readDouble();
          this.vec2.push(elem22);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_restarVectores_args.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_restarVectores_args');
  if (this.vec1 !== null && this.vec1 !== undefined) {
    output.writeFieldBegin('vec1', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec1.length);
    for (var iter23 in this.vec1) {
      if (this.vec1.hasOwnProperty(iter23)) {
        iter23 = this.vec1[iter23];
        output.writeDouble(iter23);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.vec2 !== null && this.vec2 !== undefined) {
    output.writeFieldBegin('vec2', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec2.length);
    for (var iter24 in this.vec2) {
      if (this.vec2.hasOwnProperty(iter24)) {
        iter24 = this.vec2[iter24];
        output.writeDouble(iter24);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_restarVectores_result = function(args) {
  this.success = null;
  this.e = null;
  if (args instanceof ttypes.InvalidSize) {
    this.e = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [null]);
    }
    if (args.e !== undefined && args.e !== null) {
      this.e = args.e;
    }
  }
};
CalculadoraCompleja_restarVectores_result.prototype = {};
CalculadoraCompleja_restarVectores_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        this.success = [];
        var _rtmp326 = input.readListBegin();
        var _size25 = _rtmp326.size || 0;
        for (var _i27 = 0; _i27 < _size25; ++_i27) {
          var elem28 = null;
          elem28 = input.readDouble();
          this.success.push(elem28);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.e = new ttypes.InvalidSize();
        this.e.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_restarVectores_result.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_restarVectores_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.DOUBLE, this.success.length);
    for (var iter29 in this.success) {
      if (this.success.hasOwnProperty(iter29)) {
        iter29 = this.success[iter29];
        output.writeDouble(iter29);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.e !== null && this.e !== undefined) {
    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
    this.e.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_productoEscalar_args = function(args) {
  this.vec1 = null;
  this.vec2 = null;
  if (args) {
    if (args.vec1 !== undefined && args.vec1 !== null) {
      this.vec1 = Thrift.copyList(args.vec1, [null]);
    }
    if (args.vec2 !== undefined && args.vec2 !== null) {
      this.vec2 = Thrift.copyList(args.vec2, [null]);
    }
  }
};
CalculadoraCompleja_productoEscalar_args.prototype = {};
CalculadoraCompleja_productoEscalar_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        this.vec1 = [];
        var _rtmp331 = input.readListBegin();
        var _size30 = _rtmp331.size || 0;
        for (var _i32 = 0; _i32 < _size30; ++_i32) {
          var elem33 = null;
          elem33 = input.readDouble();
          this.vec1.push(elem33);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        this.vec2 = [];
        var _rtmp335 = input.readListBegin();
        var _size34 = _rtmp335.size || 0;
        for (var _i36 = 0; _i36 < _size34; ++_i36) {
          var elem37 = null;
          elem37 = input.readDouble();
          this.vec2.push(elem37);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_productoEscalar_args.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_productoEscalar_args');
  if (this.vec1 !== null && this.vec1 !== undefined) {
    output.writeFieldBegin('vec1', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec1.length);
    for (var iter38 in this.vec1) {
      if (this.vec1.hasOwnProperty(iter38)) {
        iter38 = this.vec1[iter38];
        output.writeDouble(iter38);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.vec2 !== null && this.vec2 !== undefined) {
    output.writeFieldBegin('vec2', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec2.length);
    for (var iter39 in this.vec2) {
      if (this.vec2.hasOwnProperty(iter39)) {
        iter39 = this.vec2[iter39];
        output.writeDouble(iter39);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_productoEscalar_result = function(args) {
  this.success = null;
  this.e = null;
  if (args instanceof ttypes.InvalidSize) {
    this.e = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
    if (args.e !== undefined && args.e !== null) {
      this.e = args.e;
    }
  }
};
CalculadoraCompleja_productoEscalar_result.prototype = {};
CalculadoraCompleja_productoEscalar_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 0:
      if (ftype == Thrift.Type.DOUBLE) {
        this.success = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.e = new ttypes.InvalidSize();
        this.e.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_productoEscalar_result.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_productoEscalar_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.DOUBLE, 0);
    output.writeDouble(this.success);
    output.writeFieldEnd();
  }
  if (this.e !== null && this.e !== undefined) {
    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
    this.e.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_productoVectorial_args = function(args) {
  this.vec1 = null;
  this.vec2 = null;
  if (args) {
    if (args.vec1 !== undefined && args.vec1 !== null) {
      this.vec1 = Thrift.copyList(args.vec1, [null]);
    }
    if (args.vec2 !== undefined && args.vec2 !== null) {
      this.vec2 = Thrift.copyList(args.vec2, [null]);
    }
  }
};
CalculadoraCompleja_productoVectorial_args.prototype = {};
CalculadoraCompleja_productoVectorial_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        this.vec1 = [];
        var _rtmp341 = input.readListBegin();
        var _size40 = _rtmp341.size || 0;
        for (var _i42 = 0; _i42 < _size40; ++_i42) {
          var elem43 = null;
          elem43 = input.readDouble();
          this.vec1.push(elem43);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        this.vec2 = [];
        var _rtmp345 = input.readListBegin();
        var _size44 = _rtmp345.size || 0;
        for (var _i46 = 0; _i46 < _size44; ++_i46) {
          var elem47 = null;
          elem47 = input.readDouble();
          this.vec2.push(elem47);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_productoVectorial_args.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_productoVectorial_args');
  if (this.vec1 !== null && this.vec1 !== undefined) {
    output.writeFieldBegin('vec1', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec1.length);
    for (var iter48 in this.vec1) {
      if (this.vec1.hasOwnProperty(iter48)) {
        iter48 = this.vec1[iter48];
        output.writeDouble(iter48);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.vec2 !== null && this.vec2 !== undefined) {
    output.writeFieldBegin('vec2', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.DOUBLE, this.vec2.length);
    for (var iter49 in this.vec2) {
      if (this.vec2.hasOwnProperty(iter49)) {
        iter49 = this.vec2[iter49];
        output.writeDouble(iter49);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraCompleja_productoVectorial_result = function(args) {
  this.success = null;
  this.e = null;
  if (args instanceof ttypes.InvalidSize) {
    this.e = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [null]);
    }
    if (args.e !== undefined && args.e !== null) {
      this.e = args.e;
    }
  }
};
CalculadoraCompleja_productoVectorial_result.prototype = {};
CalculadoraCompleja_productoVectorial_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        this.success = [];
        var _rtmp351 = input.readListBegin();
        var _size50 = _rtmp351.size || 0;
        for (var _i52 = 0; _i52 < _size50; ++_i52) {
          var elem53 = null;
          elem53 = input.readDouble();
          this.success.push(elem53);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.e = new ttypes.InvalidSize();
        this.e.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

CalculadoraCompleja_productoVectorial_result.prototype.write = function(output) {
  output.writeStructBegin('CalculadoraCompleja_productoVectorial_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.DOUBLE, this.success.length);
    for (var iter54 in this.success) {
      if (this.success.hasOwnProperty(iter54)) {
        iter54 = this.success[iter54];
        output.writeDouble(iter54);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.e !== null && this.e !== undefined) {
    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
    this.e.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var CalculadoraComplejaClient = exports.Client = function(output, pClass) {
  this.output = output;
  this.pClass = pClass;
  this._seqid = 0;
  this._reqs = {};
};
CalculadoraComplejaClient.prototype = {};
CalculadoraComplejaClient.prototype.seqid = function() { return this._seqid; };
CalculadoraComplejaClient.prototype.new_seqid = function() { return this._seqid += 1; };

CalculadoraComplejaClient.prototype.ping = function(callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_ping();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_ping();
  }
};

CalculadoraComplejaClient.prototype.send_ping = function() {
  var output = new this.pClass(this.output);
  var args = new CalculadoraCompleja_ping_args();
  try {
    output.writeMessageBegin('ping', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

CalculadoraComplejaClient.prototype.recv_ping = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new CalculadoraCompleja_ping_result();
  result.read(input);
  input.readMessageEnd();

  callback(null);
};

CalculadoraComplejaClient.prototype.sumarVectores = function(vec1, vec2, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_sumarVectores(vec1, vec2);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_sumarVectores(vec1, vec2);
  }
};

CalculadoraComplejaClient.prototype.send_sumarVectores = function(vec1, vec2) {
  var output = new this.pClass(this.output);
  var params = {
    vec1: vec1,
    vec2: vec2
  };
  var args = new CalculadoraCompleja_sumarVectores_args(params);
  try {
    output.writeMessageBegin('sumarVectores', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

CalculadoraComplejaClient.prototype.recv_sumarVectores = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new CalculadoraCompleja_sumarVectores_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.e) {
    return callback(result.e);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('sumarVectores failed: unknown result');
};

CalculadoraComplejaClient.prototype.restarVectores = function(vec1, vec2, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_restarVectores(vec1, vec2);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_restarVectores(vec1, vec2);
  }
};

CalculadoraComplejaClient.prototype.send_restarVectores = function(vec1, vec2) {
  var output = new this.pClass(this.output);
  var params = {
    vec1: vec1,
    vec2: vec2
  };
  var args = new CalculadoraCompleja_restarVectores_args(params);
  try {
    output.writeMessageBegin('restarVectores', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

CalculadoraComplejaClient.prototype.recv_restarVectores = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new CalculadoraCompleja_restarVectores_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.e) {
    return callback(result.e);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('restarVectores failed: unknown result');
};

CalculadoraComplejaClient.prototype.productoEscalar = function(vec1, vec2, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_productoEscalar(vec1, vec2);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_productoEscalar(vec1, vec2);
  }
};

CalculadoraComplejaClient.prototype.send_productoEscalar = function(vec1, vec2) {
  var output = new this.pClass(this.output);
  var params = {
    vec1: vec1,
    vec2: vec2
  };
  var args = new CalculadoraCompleja_productoEscalar_args(params);
  try {
    output.writeMessageBegin('productoEscalar', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

CalculadoraComplejaClient.prototype.recv_productoEscalar = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new CalculadoraCompleja_productoEscalar_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.e) {
    return callback(result.e);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('productoEscalar failed: unknown result');
};

CalculadoraComplejaClient.prototype.productoVectorial = function(vec1, vec2, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_productoVectorial(vec1, vec2);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_productoVectorial(vec1, vec2);
  }
};

CalculadoraComplejaClient.prototype.send_productoVectorial = function(vec1, vec2) {
  var output = new this.pClass(this.output);
  var params = {
    vec1: vec1,
    vec2: vec2
  };
  var args = new CalculadoraCompleja_productoVectorial_args(params);
  try {
    output.writeMessageBegin('productoVectorial', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

CalculadoraComplejaClient.prototype.recv_productoVectorial = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new CalculadoraCompleja_productoVectorial_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.e) {
    return callback(result.e);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('productoVectorial failed: unknown result');
};
var CalculadoraComplejaProcessor = exports.Processor = function(handler) {
  this._handler = handler;
};
CalculadoraComplejaProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
};
CalculadoraComplejaProcessor.prototype.process_ping = function(seqid, input, output) {
  var args = new CalculadoraCompleja_ping_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.ping.length === 0) {
    Q.fcall(this._handler.ping.bind(this._handler)
    ).then(function(result) {
      var result_obj = new CalculadoraCompleja_ping_result({success: result});
      output.writeMessageBegin("ping", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
      output.writeMessageBegin("ping", Thrift.MessageType.EXCEPTION, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.ping(function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new CalculadoraCompleja_ping_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("ping", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("ping", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
CalculadoraComplejaProcessor.prototype.process_sumarVectores = function(seqid, input, output) {
  var args = new CalculadoraCompleja_sumarVectores_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.sumarVectores.length === 2) {
    Q.fcall(this._handler.sumarVectores.bind(this._handler),
      args.vec1,
      args.vec2
    ).then(function(result) {
      var result_obj = new CalculadoraCompleja_sumarVectores_result({success: result});
      output.writeMessageBegin("sumarVectores", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      if (err instanceof ttypes.InvalidSize) {
        result = new CalculadoraCompleja_sumarVectores_result(err);
        output.writeMessageBegin("sumarVectores", Thrift.MessageType.REPLY, seqid);
      } else {
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("sumarVectores", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.sumarVectores(args.vec1, args.vec2, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined') || err instanceof ttypes.InvalidSize) {
        result_obj = new CalculadoraCompleja_sumarVectores_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("sumarVectores", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("sumarVectores", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
CalculadoraComplejaProcessor.prototype.process_restarVectores = function(seqid, input, output) {
  var args = new CalculadoraCompleja_restarVectores_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.restarVectores.length === 2) {
    Q.fcall(this._handler.restarVectores.bind(this._handler),
      args.vec1,
      args.vec2
    ).then(function(result) {
      var result_obj = new CalculadoraCompleja_restarVectores_result({success: result});
      output.writeMessageBegin("restarVectores", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      if (err instanceof ttypes.InvalidSize) {
        result = new CalculadoraCompleja_restarVectores_result(err);
        output.writeMessageBegin("restarVectores", Thrift.MessageType.REPLY, seqid);
      } else {
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("restarVectores", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.restarVectores(args.vec1, args.vec2, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined') || err instanceof ttypes.InvalidSize) {
        result_obj = new CalculadoraCompleja_restarVectores_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("restarVectores", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("restarVectores", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
CalculadoraComplejaProcessor.prototype.process_productoEscalar = function(seqid, input, output) {
  var args = new CalculadoraCompleja_productoEscalar_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.productoEscalar.length === 2) {
    Q.fcall(this._handler.productoEscalar.bind(this._handler),
      args.vec1,
      args.vec2
    ).then(function(result) {
      var result_obj = new CalculadoraCompleja_productoEscalar_result({success: result});
      output.writeMessageBegin("productoEscalar", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      if (err instanceof ttypes.InvalidSize) {
        result = new CalculadoraCompleja_productoEscalar_result(err);
        output.writeMessageBegin("productoEscalar", Thrift.MessageType.REPLY, seqid);
      } else {
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("productoEscalar", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.productoEscalar(args.vec1, args.vec2, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined') || err instanceof ttypes.InvalidSize) {
        result_obj = new CalculadoraCompleja_productoEscalar_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("productoEscalar", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("productoEscalar", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
CalculadoraComplejaProcessor.prototype.process_productoVectorial = function(seqid, input, output) {
  var args = new CalculadoraCompleja_productoVectorial_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.productoVectorial.length === 2) {
    Q.fcall(this._handler.productoVectorial.bind(this._handler),
      args.vec1,
      args.vec2
    ).then(function(result) {
      var result_obj = new CalculadoraCompleja_productoVectorial_result({success: result});
      output.writeMessageBegin("productoVectorial", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      if (err instanceof ttypes.InvalidSize) {
        result = new CalculadoraCompleja_productoVectorial_result(err);
        output.writeMessageBegin("productoVectorial", Thrift.MessageType.REPLY, seqid);
      } else {
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("productoVectorial", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.productoVectorial(args.vec1, args.vec2, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined') || err instanceof ttypes.InvalidSize) {
        result_obj = new CalculadoraCompleja_productoVectorial_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("productoVectorial", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("productoVectorial", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
