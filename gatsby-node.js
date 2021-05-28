// exports.onCreateWebpackConfig = ({ actions, stage }) => {
//   if (stage === 'build-javascript') {
//     actions.setWebpackConfig({
//       devtool: false
//     });
//   }
// };
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);
const dayjs = require(`dayjs`);
const config = require('./config/index.js');

const _ = require(`lodash`);
// const sourceNodes = require('./gatsby/sourceNodes');

const { maxPostsInPage } = config;

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            frontmatter: { title: { ne: "" }, hidden: { ne: true }, isPost: { ne: false } }
          }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                date
                tags
                pathname
                hidden
                folder
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.error) {
        return reject();
      }

      //   post
      const posts = result.data.allMdx.edges.filter(({ node }) => !node.frontmatter.hidden);
      posts.forEach(({ node }, i) => {
        const folder = node.frontmatter.folder || '';
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            index: i,
            previous: Math.max(0, i - 1),
            next: i + 1,
            folder,
          },
        });
      });

      // page
      const pages = Math.ceil(posts.length / maxPostsInPage);
      for (let i = 0; i < pages; i++) {
        createPage({
          path: `page/${i + 1}`,
          component: path.resolve('./src/templates/page.js'),
          context: {
            limit: maxPostsInPage,
            skip: i * maxPostsInPage,
            total: pages,
          },
        });
      }
      createPage({
        path: `/`,
        component: path.resolve('./src/templates/page.js'),
        context: {
          limit: maxPostsInPage,
          skip: 0,
          total: pages,
        },
      });

      // tags
      let tags = [];
      posts.forEach((post) => {
        if (_.get(post, `node.frontmatter.tags`)) {
          tags = tags.concat(post.node.frontmatter.tags);
        }
      });
      tags = _.uniq(tags);
      tags.forEach((tag) => {
        const tagPath = `/tags/${_.kebabCase(tag)}`;
        createPage({
          path: tagPath,
          component: path.resolve(`./src/templates/tags-detail.js`),
          context: {
            tag,
          },
        });
      });
      const tagsList = tags
        .reduce((result, tag) => {
          return [
            ...result,
            {
              tag,
              list: posts
                .filter((post) => (post.node.frontmatter.tags || []).includes(tag))
                .map((a) => a.node),
            },
          ];
        }, [])
        .sort((a, b) => b.list.length - a.list.length);
      createPage({
        path: '/tags',
        component: path.resolve(`./src/templates/tags-list.js`),
        context: { tags, tagsList },
      });

      // archive
      const archiveList = _.groupBy(posts, (post) =>
        dayjs(post.node.frontmatter.date).format('YYYY')
      );
      createPage({
        path: '/archive',
        component: path.resolve(`./src/templates/archive.js`),
        context: { list: archiveList },
      });

      resolve();
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx` || node.internal.type === `MarkdownRemark`) {
    // const fileNode = getNode(node.parent);
    // const slug = createFilePath({ node, getNode, basePath: 'pages' });
    const slug = node.frontmatter.pathname
      ? `/blog/${node.frontmatter.pathname
          .replace(/(^\/)|(\/$)/g, '')
          .split('/')
          .map((a) => _.kebabCase(a))
          .join('/')}`
      : `/blog/${node.frontmatter.title.replace(/（/g, '(').replace(/）/g, ')')}`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    // if (node.frontmatter.tags) {
    //   const tagSlugs = node.frontmatter.tags.map(tag => `/tags/${tag}`);
    //   createNodeField({ node, name: `tagSlugs`, value: tagSlugs });
    // }
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.client\..*/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  // actions.setWebpackConfig({
  //   resolve: {
  //     modules: [
  //       path.resolve(__dirname, `src`),
  //       path.resolve(__dirname, `content/posts`),
  //       `node_modules`,
  //     ],
  //     alias: {
  //       '@': path.resolve(__dirname, 'src'),
  //       '@@': path.resolve(__dirname, 'content/posts'),
  //     },
  //   },
  // });
};
