import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import { Box, Card, Heading} from 'rebass'
import Layout from "../components/layout"
import Seo from "../components/seo"

const Grid = styled(Box)`
  display: grid;
  margin: 0;
  --w: 280px;
  --n: 2;
  gap: var(--size-gap);
  grid-template-columns: repeat(
    auto-fit,
    minmax(max(var(--w), 100%/ (var(--n) + 1) + 0.1%), 1fr)
  );
  margin-bottom: var(--size-gap);
  margin-top: var(--size-gap);
`

const DangerLabel = styled.p`
  margin: 0;
  font-weight: bold;
  color: #FF0000;
`

const SuccessLabel = styled.p`
  margin: 0;
  font-weight: bold;
  color: #008000;
`

const IndexPage = ({data}) => {  
  return(
  <Layout>
    <Grid>
    {
      data.allContentfulProductCatalog.edges.map(edge => (
        <Card key={edge.node.id}>
          <Link to={edge.node.slug}>
            <GatsbyImage
              image={edge.node.image.gatsbyImageData}
            />
          </Link>
          <Heading>
            {edge.node.name}
          </Heading>
          <div>
            <p style={{
              margin: 0
            }}>${edge.node.price}</p>
            {edge.node.inStock ? (
              <SuccessLabel>In stock</SuccessLabel>
            ) : (
              <DangerLabel>Out of Stock</DangerLabel>
            )} 
            {/* <p>{edge.node.createDate}</p> */}
          </div>
        </Card>
      ))
    }  
    </Grid>
  </Layout>
)
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
{
  allContentfulProductCatalog {
    edges {
      node {
        id
        name
        slug
        categories
        createDate
        price
        inStock
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 250
          )
        }
      }
    }
  }
}
`