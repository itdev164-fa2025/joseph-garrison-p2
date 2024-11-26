/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
const path = require('path');
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulProductCatalog {
          edges {
            node {
              slug
            }
          }
        }
      }
      `).then(result => {
      if (result.errors) {
        reject(result.errors);
      }
  
      result.data.allContentfulProductCatalog.edges.forEach((edge) => {
        createPage({
          path: edge.node.slug,
          component: require.resolve('./src/templates/product-details.js'),
          context: {
            slug: edge.node.slug
          },
        })
      });
 
      resolve()
    })
  })
}
