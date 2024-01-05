import BloggingModel from './blogging.model.js';
import BlogRepository from './blogging.repository.js';

export default class BlogController {
  constructor(){
    this.blogRepository = new BlogRepository();
  }

  async getAllBlogs(req, res) {
    try{
      const blogs = await this.blogRepository.getAll();
    res.status(200).send(blogs);
    } catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
   }    
  }

  async addBlog(req, res) {
    try{
    const { title, content, author } = req.body;
    const newBlog = new BloggingModel(title,content,author
    );
    const createdBlog = await this.blogRepository.add(newBlog);
    res.status(201).send(createdBlog);
  }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
} 

  async getOneBlog(req, res) {
    try{
      const id = req.params.id;
      const blog = await this.blogRepository.get(id);
      if (!blog) {
        res.status(404).send('Blog not found');
      } else {
        return res.status(200).send(blog);
      }
    } catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}

  async delete(req, res) {
  const id = req.params.id;
  const isDeleted = await this.blogRepository.delete(
      id
  );
  if (!isDeleted) {
    return res.status(404).send("Blog not found");
  }
  return res
    .status(200)
    .send('Blog is removed');
}

// async updateBlog(req, res) {
//   try{
//   const { title, content, author } = req.body;
//   const newBlog = new BloggingModel(title,content,author
//   );
//   const createdBlog = await this.blogRepository.update(newBlog);
//   res.status(201).send(createdBlog);
// }catch(err){
//   console.log(err);
//   return res.status(200).send("Something went wrong");
// }
// } 

updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, newcontent } = req.body;
    await this.blogRepository.updateBlog(id, content, newcontent);
    res.status(200).send("Blog updated successfully.");
  } catch (error) {
    res.status(500).send("Error updating blog.");
  }
};

}
