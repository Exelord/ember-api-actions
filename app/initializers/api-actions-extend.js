import Model from 'ember-data/model';
import { queryAction } from 'ember-api-actions';

export function initialize() {
  Model.reopen({
    query: queryAction({ type: 'GET' })
  });
}

export default {
  name: 'api-actions-extend',
  initialize
};
