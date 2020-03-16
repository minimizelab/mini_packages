'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
require('@minimizelab/mini_utils');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const useImgLazyLoad = url => {
  const lazyLoad = url !== undefined;
  const [loaded, setLoaded] = React.useState(!lazyLoad);
  const [preloaded, setPreloaded] = React.useState(!lazyLoad);
  const onLoaded = React.useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  React.useEffect(() => {
    if (!lazyLoad) return;
    const lowImg = new Image();
    lowImg.src = url;

    lowImg.onload = () => {
      setPreloaded(true);
    };
  }, [url, setPreloaded, lazyLoad]);
  return {
    loaded,
    preloaded,
    onLoaded
  };
};

const Image$1 = (_ref) => {
  let {
    size,
    srcSets,
    style,
    imgStyle,
    aspectRatio,
    className,
    imgClassName,
    lowResSrc
  } = _ref,
      props = _objectWithoutProperties(_ref, ["size", "srcSets", "style", "imgStyle", "aspectRatio", "className", "imgClassName", "lowResSrc"]);

  const {
    loaded,
    preloaded,
    onLoaded
  } = useImgLazyLoad(lowResSrc);
  return React__default.createElement("div", {
    style: _objectSpread2({
      width: size.width,
      height: size.width / aspectRatio,
      maxHeight: '100%',
      maxWidth: '100%',
      lineHeight: 0,
      filter: loaded ? 'blur(0px)' : 'blur(10px)',
      transition: 'filter 200ms ease',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: lowResSrc ? `url(${lowResSrc})` : undefined
    }, style),
    className: className
  }, preloaded && React__default.createElement("picture", {
    style: {
      lineHeight: 0
    }
  }, srcSets && srcSets.map(srcSet => React__default.createElement("source", Object.assign({
    key: srcSet.type
  }, srcSet))), React__default.createElement("img", Object.assign({
    className: imgClassName,
    style: _objectSpread2({
      width: '100%',
      height: '100%',
      opacity: loaded ? 1 : 0,
      transition: 'opacity 200ms ease',
      objectFit: 'cover',
      objectPosition: 'center',
      boxSizing: 'border-box'
    }, imgStyle),
    loading: "lazy",
    onLoad: onLoaded
  }, props))));
};

exports.Image = Image$1;
exports.useImgLazyLoad = useImgLazyLoad;
//# sourceMappingURL=index.js.map
