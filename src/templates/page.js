import Typography from '@material-ui/core/Typography';
import { graphql, Link as GLink } from 'gatsby';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { Content, Link } from '../styles/styled';
import Pagination from '../components/Pagination/index';
// import Pagination2 from '../components/Pagination/index2';

const Description = styled(Typography)`
  @media only screen and (max-width: 767px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Page = ({ data, pageContext, location }) => {
  return (
    <Layout>
      <SEO title="文章" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Content isPage>
        {data.allMdx.edges.map(({ node }) => {
          if (node.frontmatter.hidden) return null;
          return (
            <Link to={node.fields.slug} key={node.id}>
              <Typography variant="h5" gutterBottom>
                {node.frontmatter.title}
              </Typography>
              <Typography variant="caption">{`${
                node.frontmatter.tags && node.frontmatter.tags.join('/')
              }`}</Typography>
              <Description variant="body1">{node.excerpt}</Description>
            </Link>
          );
        })}
        {pageContext.total > 1 && (
          <Pagination total={pageContext.total} pathname={location.pathname} />
        )}
        {/* <Pagination2
          total={pageContext.total}
          current={current}
          component={GLink}
          componentProps={({ page, current, index }) => ({
            to: page !== -1 ? `/page/${page}` : index > current - 1 ? `/page/${+current + 5}` : `/page/${+current - 5}`
          })}
        /> */}
      </Content>
    </Layout>
  );
};

export default Page;

// filter: { fileAbsolutePath: { ne: null } }
export const pageQuery = graphql`
  query($limit: Int, $skip: Int) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { title: { ne: "" }, hidden: { ne: true }, isPost: { ne: false } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD")
            pathname
            tags
            hidden
          }
          fields {
            slug
          }
          excerpt(pruneLength: 100, truncate: false)
        }
      }
    }
  }
`;
