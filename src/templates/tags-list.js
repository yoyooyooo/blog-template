import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { graphql, Link } from 'gatsby';
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

const Tag = styled(Link)`
  height: 26px;
  line-height: 26px;
  margin-right: 1.5em;
  padding: 0 0.5em;
  background-color: ${red[300]};
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  border-radius: 0 4px 4px 0;
  margin-bottom: 1em;

  &:hover {
    background-color: ${red[200]};
    &::before {
      border-right-color: ${red[200]};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -12px;
    width: 0;
    height: 0;
    border-color: transparent ${red[300]} transparent transparent;
    border-style: solid;
    border-width: 12px 12px 14px 0;
  }
  &::after {
    content: '';
    position: absolute;
    top: 11px;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: #fff;
    box-shadow: -1px -1px 2px;
  }
`;

const TagListBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 6px 12px;
`;

class TagList extends React.Component {
  state = {
    isChrome: false,
  };

  componentDidMount() {
    const ua = window.navigator.userAgent;
    console.log(ua);
    const isChrome = !!/Chrome|Firefox/i.test(ua);
    if (isChrome) {
      this.setState({ isChrome: true });
    }
  }

  render() {
    const { pageContext } = this.props;

    return (
      <Layout>
        {this.state.isChrome && (
          <svg
            style={{ position: 'absolute', visibility: 'hidden', width: '0', height: '0' }}
            width="0"
            height="0"
          >
            <defs>
              <filter id="round">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0  0
                        0 1 0 0  0
                        0 0 1 0  0
                        0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        )}
        <Content>
          <TagListBox>
            {pageContext.tagsList.map((a, i) => (
              <Tag
                key={i + a.tag}
                to={`/tags/${a.tag}`}
                {...(this.state.isChrome ? { style: { filter: `url(#round)` } } : {})}
              >{`${a.tag} ${a.list.length}`}</Tag>
            ))}
          </TagListBox>
          {pageContext.tagsList.map(({ tag, list }, i) => {
            return (
              <div style={{ marginBottom: 30 }} key={i}>
                <Typography variant="h5" gutterBottom>
                  {tag}
                </Typography>
                <Wrapper>
                  {list.map((a) => (
                    <Typography
                      key={a.id}
                      variant="body2"
                      component={ButtonLink}
                      to={a.fields.slug}
                    >
                      {a.frontmatter.title}
                    </Typography>
                  ))}
                </Wrapper>
              </div>
            );
          })}
        </Content>
      </Layout>
    );
  }
}

export default withStyles({
  button: {
    color: '#254fef',
    fontSize: 'inherit',
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 15,
  },
})(TagList);
// filter: { frontmatter: { tags: { in: [$test] } } }
export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            pathname
          }
        }
      }
    }
  }
`;
// export const pageQuery = graphql`
//   query($tags: String) {
//     allMdx(
//       limit: 1000
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { frontmatter: { tags: { in: [$tags] } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `;
