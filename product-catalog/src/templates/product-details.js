import { graphql } from 'gatsby'
import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from '../components/layout';
import { H1 } from '../components/Heading'
import { Flex, Box, Heading } from 'rebass'

const ProductDetails = ({ data }) => {
    const { name, description, image } = data.contentfulProductCatalog;

    return (
        <Layout>
            <Heading mb={4}>{name}</Heading>

            <Flex>
                <Box width={1 / 2}>
                    <GatsbyImage
                        image={image.gatsbyImageData}
                    />
                </Box>
                <Box width={1 / 2} pl={5}>
                    <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }}></div>
                </Box>
            </Flex>
        </Layout>
    )
}

export default ProductDetails;

export const pageQuery = graphql`
 query productDetailsQuery($slug: String!) {
        contentfulProductCatalog(slug: {eq: $slug}) {
            name
            slug
            description {
                childMarkdownRemark {
                    html
                }
            }
    image {
                gatsbyImageData(
                    layout: CONSTRAINED,
                    placeholder: BLURRED,
                    width: 500
                )
            }
        }
    }
`