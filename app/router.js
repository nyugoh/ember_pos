import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('admin', function() {
    this.route('categories', function() {
      this.route('category', { path: '/:category_id' });
    });
    this.route('products', function() {});
  });

  this.route('products', function() {});
});

export default Router;
