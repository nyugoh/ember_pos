import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({

  model() {
    return this.get('store').findAll('category');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('title', 'Categories');
    controller.set('newCategory', this.get('store').createRecord('category'));
  },

  actions: {
    addCategory(category) {
      category.save().then((category)=>{
        this.controller.set('newCategory', this.get('store').createRecord('category'));
      });
    },

    editCategory(category) {
      category.set('isEditing', true);
    },

    cancelEdit(category) {
      if (category.hasDirtyAttributes)
        category.rollbackAttributes();
      category.set('isEditing', false);
    },

    updateCategory(category) {
      if (category.hasDirtyAttributes) {
        category.save().then(()=>{
          category.set('isEditing', false);
        });
      }
    },

    deleteCategory(category) {
      if (!Ember.isEmpty(this.get('category.products'))) {
        let confirmation = confirm('There are products in this category. Are you sure you want to remove them?');
        if (confirmation) {
          category.destroyRecord();
        } else {
          category.rollbackAttributes();
        }
      } else {
        category.destroyRecord();
      }
      category.set('isEditing', false);
    }
  }

});
