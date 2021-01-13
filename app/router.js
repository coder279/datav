'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/project/detail', controller.project.projectDetailHandler)
  router.get('/pay/data',controller.pay.payDataHandler)
};
