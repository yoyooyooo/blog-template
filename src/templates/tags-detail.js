import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ButtonLink from '../components/ButtonLink';
import { Content } from '../styles/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

class TagDetail extends React.Component {
  render() {
    const posts = this.props.data.allMdx.edges;
    return (
      <Layout location={this.props.location}>
        <Content>
          <Typography variant="h5" gutterBottom>
            {this.props.pageContext.tag} ({this.props.data.allMdx.totalCount})
          </Typography>
          <Wrapper>
            {posts.map((post) => (
              <Typography
                key={post.node.fields.slug}
                variant="body2"
                component={ButtonLink}
                to={post.node.fields.slug}
              >
                {post.node.frontmatter.title}
              </Typography>
            ))}
          </Wrapper>
        </Content>
      </Layout>
    );
  }
}

export default withStyles({ button: { color: '#254fef' } })(TagDetail);

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            pathname
          }
        }
      }
    }
  }
`;
