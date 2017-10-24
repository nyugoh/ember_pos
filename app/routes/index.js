import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model() {
    return Ember.RSVP.hash({
      products: this.get('store').findAll('product'),
      categories: this.get('store').findAll('category')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('products', model.products);
    controller.set('categories', model.categories);
  },

});
