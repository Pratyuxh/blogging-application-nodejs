export default class BloggingModel {
  constructor(
    title,
    content,
    author,
    id
  ) {
    this._id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  static add(blog) {
    blog.id = blogs.length + 1;
    blogs.push(blog);
    return blog;
  }

  static get(id) {
    const blog = blogs.find(
      (i) => i.id == id
    );
    return blog;
  }

  static getAll() {
    return blogs;
  }

  static delete(id) {
    const Index = blogs.findIndex(
      (i) =>
        i.id == id 
    );
    if (Index == -1) {
      return 'Blog not found';
    } else {
      blogs.splice(Index, 1);
    }
  }
}

var blogs = [
  new BloggingModel(
    1,
    'Blog 1',
    'Content for Blog 1',
    'Prats'
  ),
  new BloggingModel(
    2,
    'Blog 2',
    'Content for Blog 2',
    'Prats'
  ),
  new BloggingModel(
    3,
    'Blog 3',
    'Content for Blog 3',
    'Prats'
  ),
];
