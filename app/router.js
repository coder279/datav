'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/project/detail', controller.project.projectDetailHandler);
  router.get('/pay/data', controller.pay.payDataHandler);

  io.of('/lingshan').route('init', io.controller.pay.init);
  io.of('/lingshan').route('record', io.controller.pay.payDataHandler);

};
