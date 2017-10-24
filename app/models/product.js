import Model from 'ember-pouch/model';
import DS from 'ember-data';

const {
  attr,
  hasMany,
  belongsTo
} = DS;

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  cost: attr('number'),
  sku: attr('string'),
  unitPrice: attr('number'),
  startStock: attr('number'),
  category: belongsTo('category'),
  taxGroup: attr('number'),
  addedDt: attr('date'),
  currentStock: attr('number'),
  form: attr('string')
});
