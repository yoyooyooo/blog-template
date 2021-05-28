import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { graphql, Link, navigate, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import rssIcon from '../assets/images/rss.svg';

const RssIcon = styled.img.attrs({ src: rssIcon })`
  margin: 0;
  width: 20px;
  height: 20px;
`;

const ContentWrapper = styled.div`
  /* width: calc(100vw - 550px); */
  margin: 0 auto;
`;

const Logo = styled(Link)`
  color: #000000;
`;

const Footer = styled.div`
  width: 100%;
  margin: 50px auto 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    margin: 0 0.5em;
  }
`;

function FooterItem({ data }) {
  const { type, props = {}, children } = data;
  const { style, ...restProps } = props;
  if (!type) {
    return children;
  } else {
    const attrs = type === 'a' ? { rel: 'external nofollow noopener', target: '_blank' } : {};
    const StyledItem = styled[type].attrs(attrs)`
      && {
        ${(props && props.style) || ''}
      }
    `;
    return <StyledItem {...restProps}>{children}</StyledItem>;
  }
}

export default withStyles((theme) => {
  return {
    paper: { width: 400 },
    appBar: {
      backgroundColor: '#fff',
      boxShadow: '0 0 10px #c4c4c4',
      position: 'sticky',
      top: 0,
    },
    toolbar: {
      width: 'calc(1280px - 20px)',
      padding: 0,
      margin: '0 auto',
      [theme.breakpoints.only('md')]: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
    grow: {
      flexGrow: 1,
      fontFamily: '"Dancing Script", "cursive"',
      fontSize: 26,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };
  // @ts-ignore
})(({ classes, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => {
        return (
          <React.Fragment>
            <Helmet>
              <meta charSet="utf-8" />
              <title>{data.site.siteMetadata.title}</title>
            </Helmet>
            <AppBar position="static" color="default" classes={{ root: classes.appBar }}>
              <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
                {/* <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={() => navigate('/')}
                >
                  <MenuIcon />
                </IconButton> */}
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.grow}
                  onClick={() => navigate('/')}
                >
                  <Logo to="/">
                    {/* {data.contentfulBlogInfo.header.logoText || data.site.siteMetadata.title} */}
                    {'Blog'}
                  </Logo>
                </Typography>
                <Button to="/tags" color="inherit" component={Link}>
                  Tag
                </Button>
                <Button to="/archive" color="inherit" component={Link}>
                  Archive
                </Button>
              </Toolbar>
            </AppBar>
            <ContentWrapper>{children}</ContentWrapper>
            <Footer>
              © 2017-2021 Powered by
              <a
                href="https://www.gatsbyjs.org"
                rel="noopener noreferrer"
                target="_blank"
                style={{ margin: '0 0.5em' }}
              >
                Gatsbyjs
              </a>
              <a href="/rss.xml" target="_blank" style={{ fontSize: 0, marginLeft: 4 }}>
                <RssIcon />
              </a>
            </Footer>
          </React.Fragment>
        );
      }}
    />
  );
});
