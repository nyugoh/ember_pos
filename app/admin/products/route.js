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
    controller.set('title', 'Products'),
    controller.set('products', model.products);
    controller.set('categories', model.categories);
    controller.set('isEditing', false);
  },

  actions: {
    editProduct(product) {
      console.log(product.changedAttributes());
      if (product.hasDirtyAttributes()) {
        console.log('changed stuff');
        product.save();
      }

    },

    cancelEdit(product) {
      if (product.get('hasDirtyAttributes')) {
        if (confirm('You will loose the changes...')) {
          product.rollbackAttributes();
        }
      }
    },

    deleteProduct(product) {
      product.destroyRecord();
    },

    setEditingproduct(product_id) {
      this.controller.set('isEditing', true);
      this.controller.set('product', this.get('store').findRecord('product', product_id));
    }
  }
});
