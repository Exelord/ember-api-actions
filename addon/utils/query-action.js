import Ember from 'ember';
import DS from 'ember-data';
import customAction from './custom-action';

function promiseQuery(promise, promiseType, hasLoadedData, queryMeta) {
  return promiseType.create({
    promise,
    queryMeta,
    hasLoadedData,

    reload(data = null) {
      let payload = data || this.queryMeta.payload;
      let promise = customAction(this.queryMeta.parent, this.queryMeta.options, payload, true);
      return this.set('promise', promise);
    }
  });
}

export default function(options) {
  return function(propertyName, payload) {
    let relationship = this.relationshipFor(propertyName);
    let isHasMany = relationship && relationship.kind === 'hasMany';
    let reference = isHasMany ? this.hasMany(propertyName) : this.belongsTo(propertyName);
    let promiseType = isHasMany ? DS.PromiseManyArray : DS.PromiseObject;
    let hasLoadedData = false;
    let promise;

    options.path = reference.link().split('/').pop();
    options.pushToStore = true;

    if (reference.value() !== null) {
      let realRelationship = this._internalModel._relationships.get(propertyName);
      hasLoadedData = true;
      promise = realRelationship.findRecords();
    } else {
      promise = customAction(this, options, payload, true);
    }

    return promiseQuery(promise, promiseType, hasLoadedData, { options, payload, parent: this });
  };
}
