// queryRelations: {
//   members: { model: 'model', relation: 'members', params: 'params'}
// },

import Ember from 'ember';

const { Mixin, inject, computed } = Ember;

export default Mixin.create({
  store: inject.service(),

  init() {
    this._super(...arguments);

    let relations = this.get('queryRelations');

    Object.keys(relations).forEach((relationName) => {
      let relation = relations[relationName];
      let relationship = `${relation.model}.${relation.relation}`;

      this.set(relationName, computed(relationship, function() {
        return this.get(relation.model).query(relation.relation, this.get(relation.params));
      }));

      this.addObserver(`${relation.params}Changed`, relation.params, function() {
        this.get(relationName).reload(this.get(relation.params));
      });
    });
  },

  didInsertElement() {
    Object.keys(this.get('queryRelations')).forEach((relationName) => {
      if (this.get(`${relationName}.hasLoadedData`)) {
        this.get(relationName).reload();
      }
    });
  },

  queryRelations: {}
});
