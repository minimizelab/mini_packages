'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var mini_utils = require('@minimizelab/mini_utils');

const Test = () => React__default.createElement("div", null, "Hello!");

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
  const [loaded, setLoaded] = React.useState(false);
  const [preloaded, setPreloaded] = React.useState(false);
  const onLoaded = React.useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  React.useEffect(() => {
    const lowImg = new Image();
    lowImg.src = url;

    lowImg.onload = () => {
      setPreloaded(true);
    };
  }, [url, setPreloaded]);
  return {
    loaded,
    preloaded,
    onLoaded
  };
};

const formats = [{
  type: 'image/webp',
  name: 'webp'
}, {
  type: 'image/png',
  name: 'png'
}, {
  type: 'image/jpeg',
  name: 'jpg'
}];
const defaults = {
  formats
};

const Source = (_ref) => {
  let {
    format
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["format"]);

  return React__default.createElement("source", {
    srcSet: `${mini_utils.urlBuilder.getContentfulUrl(_objectSpread2({
      format: format.name
    }, rest))}, 
    ${mini_utils.urlBuilder.getContentfulUrl(_objectSpread2({
      format: format.name,
      resolution: 1.5
    }, rest))} 1.5x, 
    ${mini_utils.urlBuilder.getContentfulUrl(_objectSpread2({
      format: format.name,
      resolution: 2
    }, rest))} 2x`,
    type: format.type
  });
};

const getAspectRatio = (details, size) => {
  const original = details.image.width / details.image.height;
  const calcSize = {
    width: size && size.width !== undefined ? size.width : details.image.width,
    height: size && size.height !== undefined ? size.height : details.image.height
  };

  if (size && size.height !== undefined && size.width !== undefined) {
    return {
      aspectRatio: size.width / size.height,
      calcSize
    };
  }

  return {
    aspectRatio: original,
    calcSize
  };
};

const Image$1 = (_ref) => {
  let {
    baseUrl,
    details,
    size,
    quality,
    fit,
    style,
    imgStyle,
    className,
    imgClassName,
    alt
  } = _ref,
      props = _objectWithoutProperties(_ref, ["baseUrl", "details", "size", "quality", "fit", "style", "imgStyle", "className", "imgClassName", "alt"]);

  const {
    aspectRatio,
    calcSize
  } = React.useMemo(() => getAspectRatio(details, size), [details, size]);
  const lowResUrl = React.useMemo(() => mini_utils.urlBuilder.getContentfulUrl({
    baseUrl,
    size: {
      width: 30
    },
    format: 'jpg',
    quality: 50
  }), [baseUrl]);
  const {
    loaded,
    preloaded,
    onLoaded
  } = useImgLazyLoad(lowResUrl);
  return React__default.createElement("div", {
    style: _objectSpread2({
      width: calcSize.width,
      height: calcSize.width / aspectRatio,
      maxHeight: '100%',
      maxWidth: '100%',
      lineHeight: 0,
      filter: loaded ? 'blur(0px)' : 'blur(10px)',
      transition: 'filter 200ms ease',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: !loaded ? `url(${lowResUrl})` : undefined
    }, style),
    className: className
  }, preloaded && React__default.createElement("picture", {
    style: {
      lineHeight: 0
    }
  }, defaults.formats.map(format => React__default.createElement(Source, {
    key: format.type,
    baseUrl: baseUrl,
    size: size,
    fit: fit,
    quality: quality,
    format: format
  })), React__default.createElement("img", Object.assign({
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
    src: mini_utils.urlBuilder.getContentfulUrl({
      baseUrl,
      size,
      fit,
      format: 'original',
      quality
    }),
    loading: "lazy",
    onLoad: onLoaded,
    alt: alt
  }, props))));
};

exports.Image = Image$1;
exports.Test = Test;
//# sourceMappingURL=index.js.map
