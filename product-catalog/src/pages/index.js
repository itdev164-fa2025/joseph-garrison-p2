import * as React from "react"
import { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import { Box, Card, Flex, Heading } from 'rebass'
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
  margin-top: var(--size-gutter);
`

const StyledCard = styled(Card)`
  border-radius: 5px;
  border: 1px solid #efefef;
  text-align: center;
  padding: 10px 0;
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

const TagButton = styled.button`
  background-color: ${({ selected }) => (selected ? `var(--color-primary)` : `var(--color-bg-secondary)`)};
  color: ${({ selected }) => (selected ? `var(--color-text-light)` : `var(--color-text)`)};
  border: none;
  margin: 0 5px 10px;
  padding: 5px 20px;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const IndexPage = ({ data }) => {
  const availableCategories = data.allContentfulProductCatalog.edges
    .flatMap(edge => edge.node.categories)
    .filter(category => category !== null)
  const distinctCategories = Array.from(new Set(availableCategories));

  const [selectedCategory, setSelectedCategory] = useState(null);

  let filteredProducts = selectedCategory ? data.allContentfulProductCatalog.edges
    .filter(edge =>
      edge.node.categories && edge.node.categories.includes(selectedCategory)
    )
    : data.allContentfulProductCatalog.edges;

  const [showInStock, setShowInStock] = useState(false)
  
  filteredProducts = showInStock
    ? filteredProducts.filter(product => {
      console.log(product);
      
      return product.node.inStock
    })
    : filteredProducts


  return (
    <Layout>
      {distinctCategories.length > 0 && (
        <div style={{
          display: `flex`,
          justifyContent: `space-between`
        }}>
          <TagButton
            selected={!selectedCategory}
            onClick={() => setSelectedCategory(null)}
          > All </TagButton>

          {distinctCategories.map(category => (
            <TagButton
              key={category}
              selected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </TagButton>
          ))}
        </div>
      )
      }

      <Flex style={{
        marginBlockStart: `var(--space-3)`,
        justifyContent: `flex-end`,
        fontWeight: `bold`
        }}>
        <input
          type="checkbox"
          id="stock-filter"
          checked={showInStock}
          onChange={() => setShowInStock(!showInStock)}
        />
        <label style={{marginInlineStart: `var(--space-2)`}} htmlFor="stock-filter">Exclude Out of stock</label>
      </Flex>

      <Grid>
        {
          filteredProducts.map(edge => (
            <StyledCard key={edge.node.id}>
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
            </StyledCard>
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