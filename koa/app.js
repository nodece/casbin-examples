const Koa = require('koa');
const Router = require('koa-router');
const {newSyncedEnforcer} = require('casbin');
const TypeORMAdapter = require('typeorm-adapter').default;
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.get('/books', ctx => {
  ctx.body = [
    {
      id: 1,
      name: 'Hundred thousand whys',
    },
  ];
});

router.get('/users', ctx => {
  ctx.body = [
    {
      id: 2,
      name: 'admin',
    },
  ];
});

// Add policy to casbin
router.post('/policy', async ctx => {
  const {sub, obj, act} = ctx.request.body;
  const ok = await ctx.enforcer.addPolicy(sub, obj, act);
  ctx.status = ok ? 200 : 500;
});

// Get policy list
router.get('/policy', async ctx => {
  ctx.body = casbinEnforcer.getPolicy();
});

// Delete policy
router.delete('/policy', async ctx => {
  const {sub, obj, act} = ctx.request.body;
  const ok = await ctx.enforcer.removePolicy(sub, obj, act);
  ctx.status = ok ? 200 : 500;
});

app.use(bodyParser());

app.use(async (ctx, next) => {
  const {method, path, header} = ctx.request;

  if (path === '/policy') {
    await next();
    return;
  }

  // mock user, you can get user from jwt or session.
  const user = {role: 'admin-role'};
  if (!await ctx.enforcer.enforce(user.role, path, method)) {
    ctx.status = 403;
    return;
  }

  await next();
});

app.use(router.routes()).use(router.allowedMethods());

async function bootstrap() {
  const adapter = await TypeORMAdapter.newAdapter({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'casbin',
  });

  app.context.enforcer = await newSyncedEnforcer(
      'keymatch2_model.conf',
      adapter,
  );

  app.listen(3000);
}

bootstrap().then(() => {
  console.log('Now you can open http://localhost:3000');
});
