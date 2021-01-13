const await = require('await-stream-ready/lib/await');

const Controller = require('egg').Controller;

class ContributionController extends Controller {
  async monitorOrder() {
    const { ctx, app } = this;
    const message = ctx.args[0];

  }
}
