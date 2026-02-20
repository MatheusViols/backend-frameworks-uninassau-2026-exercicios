const sequelize = require('../src/config/database');
const { User, Post, Tag } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await User.destroy({ where: {}, truncate: true, cascade: true });
  await Post.destroy({ where: {}, truncate: true, cascade: true });
  await Tag.destroy({ where: {}, truncate: true, cascade: true });
});

describe('Relacionamento 1:N - User hasMany Posts', () => {
  test('deve criar post associado a um usuário', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    const post = await Post.create({
      title: 'Meu Post',
      content: 'Conteúdo do post',
      userId: user.id
    });

    expect(post.userId).toBe(user.id);
  });

  test('deve buscar usuário com seus posts (eager loading)', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    await Post.create({ title: 'Post 1', content: 'Conteúdo 1', userId: user.id });
    await Post.create({ title: 'Post 2', content: 'Conteúdo 2', userId: user.id });

    const userWithPosts = await User.findByPk(user.id, {
      include: Post
    });

    expect(userWithPosts.Posts).toBeDefined();
    expect(userWithPosts.Posts).toHaveLength(2);
  });

  test('deve buscar posts do usuário (lazy loading)', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    await Post.create({ title: 'Post 1', content: 'Conteúdo 1', userId: user.id });

    const posts = await user.getPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('Post 1');
  });

  test('deve buscar post com seu usuário', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    const post = await Post.create({
      title: 'Meu Post',
      content: 'Conteúdo',
      userId: user.id
    });

    const postWithUser = await Post.findByPk(post.id, {
      include: User
    });

    expect(postWithUser.User).toBeDefined();
    expect(postWithUser.User.name).toBe('João');
  });
});

describe('Relacionamento N:M - Post belongsToMany Tags', () => {
  test('deve adicionar tags a um post', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    const post = await Post.create({
      title: 'Post sobre Node.js',
      content: 'Conteúdo',
      userId: user.id
    });

    const tag1 = await Tag.create({ name: 'nodejs' });
    const tag2 = await Tag.create({ name: 'javascript' });

    await post.addTags([tag1, tag2]);

    const tags = await post.getTags();
    expect(tags).toHaveLength(2);
    expect(tags.map(t => t.name)).toContain('nodejs');
    expect(tags.map(t => t.name)).toContain('javascript');
  });

  test('deve buscar post com suas tags', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    const post = await Post.create({
      title: 'Post sobre Node.js',
      content: 'Conteúdo',
      userId: user.id
    });

    const tag = await Tag.create({ name: 'nodejs' });
    await post.addTag(tag);

    const postWithTags = await Post.findByPk(post.id, {
      include: Tag
    });

    expect(postWithTags.Tags).toBeDefined();
    expect(postWithTags.Tags).toHaveLength(1);
    expect(postWithTags.Tags[0].name).toBe('nodejs');
  });

  test('deve remover tag de um post', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    const post = await Post.create({
      title: 'Post',
      content: 'Conteúdo',
      userId: user.id
    });

    const tag = await Tag.create({ name: 'nodejs' });
    await post.addTag(tag);

    await post.removeTag(tag);

    const tags = await post.getTags();
    expect(tags).toHaveLength(0);
  });

  test('deve buscar posts por tag', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    const tag = await Tag.create({ name: 'nodejs' });

    const post1 = await Post.create({ title: 'Post 1', content: 'C1', userId: user.id });
    const post2 = await Post.create({ title: 'Post 2', content: 'C2', userId: user.id });

    await tag.addPosts([post1, post2]);

    const posts = await tag.getPosts();
    expect(posts).toHaveLength(2);
  });
});

describe('Queries Aninhadas', () => {
  test('deve buscar usuário com posts e tags', async () => {
    const user = await User.create({ name: 'João', email: 'joao@example.com' });
    const post = await Post.create({
      title: 'Post sobre Node.js',
      content: 'Conteúdo',
      userId: user.id
    });
    const tag = await Tag.create({ name: 'nodejs' });
    await post.addTag(tag);

    const userWithPostsAndTags = await User.findByPk(user.id, {
      include: {
        model: Post,
        include: Tag
      }
    });

    expect(userWithPostsAndTags.Posts).toHaveLength(1);
    expect(userWithPostsAndTags.Posts[0].Tags).toHaveLength(1);
    expect(userWithPostsAndTags.Posts[0].Tags[0].name).toBe('nodejs');
  });
});
