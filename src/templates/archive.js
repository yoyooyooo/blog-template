import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';
import ButtonLink from '../components/ButtonLink';
import Layout from '../components/Layout';
import { Content } from '../styles/styled';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export default withStyles((theme) => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '80%',
    margin: '0 auto',
  },
}))(({ pageContext }) => {
  return (
    <Layout>
      <Content>
        {Object.keys(pageContext.list)
          .sort((a, b) => b - a)
          .map((key, i) => (
            <Section key={key}>
              <Typography variant="h6">{`${key}`}</Typography>
              {pageContext.list[key].map((a, i) => (
                <Typography
                  key={`${key}-${i}`}
                  variant="body2"
                  component={ButtonLink}
                  to={a.node.fields.slug}
                >
                  {a.node.frontmatter.title}
                </Typography>
              ))}
            </Section>
          ))}
      </Content>
    </Layout>
  );
});
