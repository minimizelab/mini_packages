'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var mini_utils = require('@minimizelab/mini_utils');

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
  const lazyLoad = typeof url !== 'undefined';
  const [loaded, setLoaded] = React.useState(!lazyLoad);
  const [preloaded, setPreloaded] = React.useState(!lazyLoad);
  const onLoaded = React.useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  React.useEffect(() => {
    if (typeof url === 'undefined') return;
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

const useIEObjectFitPolyfill = ({
  objectFit,
  objectPosition
}) => {
  const imgRef = React.useRef(null);
  React.useEffect(() => {
    const testImg = document.createElement('img');

    if (typeof testImg.style.objectFit === 'undefined' || typeof testImg.style.objectPosition === 'undefined') {
      Promise.resolve().then(() => require('object-fit-images')).then(({
        default: ObjectFitImages
      }) => {
        ObjectFitImages(imgRef.current);
      });
    }
  }, [imgRef]);
  return {
    imgRef,
    polyfillStyle: {
      objectFit,
      objectPosition,
      fontFamily: `object-fit: ${objectFit}; object-position: ${objectPosition}`
    }
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

const useContentfulImage = ({
  baseUrl,
  size,
  formats = defaults.formats
}) => {
  const src = React.useMemo(() => mini_utils.urlBuilder.getContentfulUrl({
    baseUrl,
    format: 'original'
  }), [baseUrl, size]);
  const lowResSrc = React.useMemo(() => mini_utils.urlBuilder.getContentfulUrl({
    baseUrl,
    size: {
      width: 30
    },
    format: 'jpg',
    quality: 50
  }), [baseUrl]);
  const srcSets = React.useMemo(() => formats.map(({
    type,
    name
  }) => ({
    srcSet: `${mini_utils.urlBuilder.getContentfulUrl({
      size,
      baseUrl,
      format: name
    })}, 
    ${mini_utils.urlBuilder.getContentfulUrl({
      size,
      baseUrl,
      format: name,
      resolution: 1.5
    })} 1.5x, 
    ${mini_utils.urlBuilder.getContentfulUrl({
      size,
      baseUrl,
      format: name,
      resolution: 2
    })} 2x`,
    type
  })), [formats, baseUrl]);
  return {
    src,
    srcSets,
    lowResSrc,
    size
  };
};

const useSanityImage = ({
  baseUrl,
  size,
  blurUp,
  quality,
  formats = defaults.formats
}) => {
  const urlConfig = React.useMemo(() => ({
    baseUrl,
    size,
    quality
  }), [size, baseUrl, quality]);
  const src = React.useMemo(() => mini_utils.urlBuilder.getSanityUrl({
    baseUrl,
    format: 'original',
    size
  }), [baseUrl, size]);
  const lowResSrc = React.useMemo(() => blurUp ? mini_utils.urlBuilder.getSanityUrl({
    baseUrl,
    size: {
      width: 30
    },
    format: 'original',
    quality: 50
  }) : undefined, [baseUrl]);
  const srcSets = React.useMemo(() => formats.map(({
    type,
    name
  }) => ({
    srcSet: `${mini_utils.urlBuilder.getSanityUrl(_objectSpread2({}, urlConfig, {
      format: name
    }))}, 
    ${mini_utils.urlBuilder.getSanityUrl(_objectSpread2({}, urlConfig, {
      format: name,
      resolution: 1.5
    }))} 1.5x, 
    ${mini_utils.urlBuilder.getSanityUrl(_objectSpread2({}, urlConfig, {
      format: name,
      resolution: 2
    }))} 2x`,
    type
  })), [formats, baseUrl]);
  return {
    src,
    srcSets,
    lowResSrc,
    size
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
  const {
    imgRef,
    polyfillStyle
  } = useIEObjectFitPolyfill({
    objectFit: imgStyle && imgStyle.objectFit ? imgStyle.objectFit : 'cover',
    objectPosition: imgStyle && imgStyle.objectPosition ? imgStyle.objectPosition : 'center'
  });
  return React__default.createElement("div", {
    style: _objectSpread2({
      width: size.height ? size.height * aspectRatio : undefined,
      height: size.height,
      maxHeight: '100%',
      maxWidth: '100%',
      lineHeight: 0,
      filter: loaded ? 'blur(0px)' : 'blur(10px)',
      transition: 'filter 200ms ease',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: typeof lowResSrc !== 'undefined' ? `url(${lowResSrc})` : undefined
    }, style),
    className: className
  }, preloaded && React__default.createElement("picture", {
    style: {
      lineHeight: 0
    }
  }, srcSets && srcSets.map(srcSet => React__default.createElement("source", Object.assign({
    key: srcSet.type
  }, srcSet))), React__default.createElement("img", Object.assign({
    ref: imgRef,
    className: imgClassName,
    style: _objectSpread2({
      width: '100%',
      height: '100%',
      opacity: loaded ? 1 : 0,
      transition: 'opacity 200ms ease',
      objectFit: 'cover',
      objectPosition: 'center',
      boxSizing: 'border-box'
    }, imgStyle, {}, polyfillStyle),
    loading: "lazy",
    onLoad: onLoaded
  }, props))));
};

exports.Image = Image$1;
exports.useContentfulImage = useContentfulImage;
exports.useIEObjectFitPolyfill = useIEObjectFitPolyfill;
exports.useImgLazyLoad = useImgLazyLoad;
exports.useSanityImage = useSanityImage;
//# sourceMappingURL=index.js.map
