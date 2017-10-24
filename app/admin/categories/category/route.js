import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      category: this.get('store').findRecord('category', params.category_id),
      products: this.get('store').query('product', {
        filter: {
          category: params.category_id
        }
      })
    })
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('addingProduct', false);
    controller.set('products', model.products);
    controller.set('category', model.category);
    controller.set('newProduct', this.get('store').createRecord('product'));
  },

  actions: {
    showAddingForm() {
      this.get('controller').set('addingProduct', true);
    },

    addProduct(product) {
      product.set('addedDt', new Date());
      product.set('currentStock', product.get('startStock'));
      let category = this.controller.get('category');
      product.set('category', category);
      product.save().then((product)=>{
        this.controller.get('products').pushObject(product);
        this.controller.set('newProduct', this.get('store').createRecord('product'));
      });
    }
  }

});
