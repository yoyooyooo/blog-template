import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import styled from 'styled-components';
import RelatedPosts from '../RelatedPosts';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
  max-width: 250px;
  position: absolute;
  top: 130px;
  right: 10px;
  left: calc(100% - 260px);
  /* margin-left: 1000px; */
  padding: 5px 5px 5px 0px;
  overflow: auto;
  max-height: 90vh;

  @media only screen and (max-width: 992px) {
    & {
      display: none;
    }
  }
`;

const StyledButton = styled(({ active, ...rest }) => <Button {...rest} />)`
  && {
    justify-content: flex-start;
    min-height: max-content;
    line-height: initial;
    color: #5b5bdf;
    width: 100%;
    padding-left: ${(props) => `calc(1em + ${(props.depth - 1) * 10}px)`};
    ${(props) =>
      props.active
        ? `&::before {
            content: '';
            left: 0px;
            width: 2px;
            height: 100%;
            position: absolute;
            background-color: red;
          }`
        : null}
  }
`;

class AutolinkHeaders extends Component {
  state = { currrentLink: null };

  top = 200;

  fixedTop = 70;

  componentDidMount() {
    const box = this.wrapper;
    if (!box) return;
    document.addEventListener('scroll', this.scrollListener);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (prevState.currrentLink !== this.state.currrentLink) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener = (e) => {
    window.requestAnimationFrame(() => {
      const top = this.top;
      const fixedTop = this.fixedTop;
      const box = this.wrapper;
      if (!box) return;
      const that = this;
      if (
        e.target.scrollingElement.scrollTop + 80 > top - fixedTop &&
        box.style.position !== 'fixed'
      ) {
        box.style.position = 'fixed';
        box.style.top = `${fixedTop}px`;
      } else if (
        e.target.scrollingElement.scrollTop + 80 < top - fixedTop &&
        box.style.position !== 'absolute'
      ) {
        box.style.position = 'absolute';
        box.style.top = `${top - fixedTop}px`;
      }

      const elms = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5'));
      for (let i = 0; i < elms.length; i++) {
        if (elms[i].getBoundingClientRect().y > 55) {
          that.setState({
            scroll: true,
            currrentLink: elms[i - 1] && elms[i - 1].id,
          });
          break;
        }
      }
    });
  };

  parseUrl = (url) => url.replace(/\/|\./g, '').replace(/[()]/g, '').replace(/\s/g, '-');

  render() {
    const { classes, relatedPosts, headings } = this.props;

    return (
      <Wrapper
        ref={(ref) => {
          this.wrapper = ref;
        }}
      >
        {!_isEmpty(headings) && (
          <div style={{ marginBottom: 50 }}>
            <Typography variant="subtitle2" gutterBottom className={classes.title}>
              目录
            </Typography>
            {headings.map((a, i) => (
              <a key={i + a.value} href={`#${this.parseUrl(a.value)}`}>
                <StyledButton
                  size="small"
                  variant="text"
                  classes={{ label: classes.label }}
                  depth={a.depth}
                  active={this.state.currrentLink === this.parseUrl(a.value)}
                >
                  {a.value}
                </StyledButton>
              </a>
            ))}
          </div>
        )}

        {!_isEmpty(relatedPosts) && <RelatedPosts data={relatedPosts} />}
        {/* <Typography variant="subtitle2" gutterBottom className={classes.title}>
          相关文章
        </Typography>
        {relatedPosts.map(({ node }, i) => (
          <Typography
            key={node.fields.slug}
            variant="body2"
            component={ButtonLink}
            to={node.fields.slug}
          >
            {node.frontmatter.title}
          </Typography>
        ))} */}
      </Wrapper>
    );
  }
}

export default withStyles({
  label: {
    textAlign: 'left',
    width: '100%',
  },
  title: {
    paddingLeft: '2em',
  },
})(AutolinkHeaders);
