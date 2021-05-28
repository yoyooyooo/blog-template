import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { graphql, Link } from 'gatsby';
import { MDXRenderer as Mdx } from 'gatsby-plugin-mdx';
import React, { Component } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import AutolinkHeaders from '../components/AutolinkHeaders/index';
import ButtonLink from '../components/ButtonLink';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import { Content } from '../styles/styled';
import SyntaxHighlight from '../styles/syntaxHighlight';

// 3d 离场，换 useTransition
const Transition = ({ children }) => {
  const style = useSpring({
    from: { opacity: 0.8 },
    to: { opacity: 1 },
  });
  return <animated.div style={style}>{children}</animated.div>;
};

const SwitchBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0.5em auto 0;
  width: calc(100vw - 550px);
  @media only screen and (max-width: 1200px) {
    & {
      width: calc(100vw - 300px);
      margin: 1em auto 0 10px;
    }
  }
  @media only screen and (max-width: 992px) {
    & {
      width: calc(100% - 20px);
    }
  }
`;
const SwitchButton = styled(Typography)`
  && {
    display: flex;
  }
`;

class Post extends Component {
  // componentDidMount() {
  //   const observer = lozad(document.querySelectorAll('img'));
  //   observer.observe();
  // }

  render() {
    const { classes, data, location, pageContext } = this.props;
    const { node /* , previous, next  */ } = data.current.edges[0];
    const headings = node.headings;
    const previous =
      pageContext.index && data.previous && data.previous.edges[0] && data.previous.edges[0].node;
    const next = data.next && data.next.edges[0] && data.next.edges[0].node;

    const relatedPosts = data.relatedPosts && data.relatedPosts.edges;

    const mdxContent = (
      <Transition key={location.pathname} location={location} pathname={location.pathname}>
        <Mdx>{node.body}</Mdx>
      </Transition>
    );

    if (node.frontmatter.pure === true) {
      return mdxContent;
    }

    let child = (
      <>
        <SyntaxHighlight />
        <SEO title={node.frontmatter.title} description={node.excerpt} />
        <Content isPost>
          <div>
            <Typography variant="h5">{node.frontmatter.title}</Typography>
            <Typography
              variant="caption"
              component="div"
              gutterBottom
              classes={{ root: classes.subTitle }}
            >
              {`${node.frontmatter.date}   `}
              {node.frontmatter.tags &&
                node.frontmatter.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i === 0 ? '' : ', '}
                    <Link to={`/tags/${tag}`}>{tag}</Link>
                  </React.Fragment>
                ))}
            </Typography>
            <Typography variant="body1" component="div">
              {mdxContent}
            </Typography>
            {/* <Typography
              variant="body1"
              component="div" // p标签内不能有p标签
              dangerouslySetInnerHTML={{
                __html: node.body.replace(/<img.*\bsrc\b\s*=\s*['"]?([^'"]*)['"]?/g, (matched) => {
                  return matched.replace('src', 'data-src');
                }),
              }}
            /> */}
          </div>
          {node.frontmatter.toc !== false && (
            <AutolinkHeaders headings={headings} location={location} relatedPosts={relatedPosts} />
          )}
        </Content>
        <SwitchBox>
          {previous ? (
            <SwitchButton variant="body2" component={ButtonLink} to={previous.fields.slug}>
              <ChevronLeft />
              {previous.frontmatter.title}
            </SwitchButton>
          ) : (
            <SwitchButton variant="body2" component={Button} disabled>
              <ChevronLeft />
              到顶了
            </SwitchButton>
          )}
          {next ? (
            <SwitchButton variant="body2" component={ButtonLink} to={next.fields.slug}>
              {next.frontmatter.title}
              <ChevronRight />
            </SwitchButton>
          ) : (
            <SwitchButton variant="body2" component={Button} disabled>
              到底了
              <ChevronRight />
            </SwitchButton>
          )}
        </SwitchBox>
      </>
    );

    if (node.frontmatter.layout === false) {
      // return child;
    } else {
      child = <Layout>{child}</Layout>;
    }

    return child;
  }
}

export default withStyles({
  subTitle: {
    marginBottom: '2em',
    whiteSpace: 'pre',
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      height: 1,
      position: 'absolute',
      bottom: -10,
      width: '100%',
      backgroundImage: 'linear-gradient(90deg,#fff 0%,#fff 50%,#888 51%,#888 100%)',
      backgroundSize: 10,
    },
  },
  button: {
    color: '#5050de',
    fontSize: 'inherit',
  },
})(Post);

export const pageQuery = graphql`
  fragment postLink on Mdx {
    frontmatter {
      title
      pathname
    }
    fields {
      slug
    }
  }

  fragment post on Mdx {
    ...postLink
    body
    excerpt(pruneLength: 160)
    frontmatter {
      tags
      date(formatString: "YYYY.MM.DD")
      folder
      layout
      pure
      toc
    }
    headings {
      value
      depth
    }
  }

  query BlogPostQuery($index: Int, $previous: Int, $next: Int, $folder: String) {
    current: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
      skip: $index
      filter: { frontmatter: { hidden: { ne: true } } }
    ) {
      edges {
        node {
          ...post
        }
        previous {
          ...postLink
        }
        next {
          ...postLink
        }
      }
    }
    previous: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
      skip: $previous
      filter: { frontmatter: { hidden: { ne: true }, isPost: { ne: false } } }
    ) {
      edges {
        node {
          ...postLink
        }
      }
    }
    next: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
      skip: $next
      filter: { frontmatter: { hidden: { ne: true }, isPost: { ne: false } } }
    ) {
      edges {
        node {
          ...postLink
        }
      }
    }
    relatedPosts: allMdx(
      limit: 20
      sort: { fields: [frontmatter___date], order: ASC }
      filter: {
        frontmatter: {
          folder: { eq: $folder, ne: "" }
          hidden: { ne: true }
          isPost: { ne: false }
        }
      }
    ) {
      edges {
        node {
          ...post
          fields {
            slug
          }
        }
      }
    }
  }
`;
