class BlogController {
  static async index (req, res, next) {
    const user = req.session.username;
    if (user == null) {
      res.redirect('/users/login');
    } else {
      res.render('blog/index', {
        title: 'Blog',
        username: user,
        infoMessageTitle: req.session.infoMessageTitle,
        infoMessage: req.session.infoMessage,
        infoMessageLink: req.session.infoMessageLink,
        infoMessageLinkText: req.session.infoMessageLinkText,
        layout: 'layout'
      });
    }
  }
}
export default BlogController;
