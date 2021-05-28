import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';
import MyButtonLink from '../ButtonLink';

const ButtonLink = styled(MyButtonLink)`
  && {
    padding: 4px 6px;
    line-height: initial;
    justify-content: flex-start;
    padding-left: 3em;
  }
`;

const Wrapper = styled.div``;

export default withStyles({
  title: {
    paddingLeft: '2em',
  },
})(({ classes, data }) => {
  if (!data || data.length <= 1) return null;
  return (
    <Wrapper>
      <Typography variant="subtitle2" gutterBottom className={classes.title}>
        相关文章
      </Typography>
      {data.map(({ node }, i) => (
        <Typography
          key={node.fields.slug}
          size="small"
          variant="inherit"
          component={ButtonLink}
          to={node.fields.slug}
        >
          {node.frontmatter.title}
        </Typography>
      ))}
    </Wrapper>
  );
});
