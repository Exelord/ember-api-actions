import customAction from './custom-action';

export default function(options) {
  return function(path, payload) {
    options.path = path;
    return customAction(this, options, payload, true);
  };
}
