import React, { Component } from 'react';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Pagination extends Component {
  static propTypes = {
    total: PropTypes.number,
    pathname: PropTypes.string,
  };

  getPagination = (current) => {
    const { total } = this.props;
    const arr = Array.from({ length: total }, (_, i) => {
      if (
        i === 0 ||
        i === total - 1 ||
        (i < 5 && current < 5) ||
        (i > +current - 4 && i < +current + 2)
      ) {
        return i + 1;
      } else {
        return -1;
      }
    });
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== -1 || (arr[i] === -1 && arr[i + 1] !== -1)) {
        result.push(arr[i]);
      }
    }
    return result;
  };

  render() {
    const { classes, pathname } = this.props;
    const current =
      pathname === '/'
        ? '1'
        : pathname
            .split('/')
            .filter((a) => a)
            .slice(-1)[0];
    return (
      <div>
        {this.getPagination(current).map((page, i) => {
          return (
            <Button
              key={`${page}-${i}`}
              className={classNames(classes.button, {
                [classes.loadMoreButton]: page === -1,
                [classes.addButton]: page === -1 && i > current - 1,
                [classes.minusButton]: page === -1 && i < current - 1,
              })}
              component={Link}
              to={`/page/${
                page === -1 ? (i < current - 1 ? +current - 5 || 1 : +current + 5) : page
              }`}
              variant={page === +current ? 'contained' : undefined}
              color={page === +current ? 'primary' : undefined}
            >
              {page === -1 ? '' : `${page}`}
            </Button>
          );
        })}
      </div>
    );
  }
}

export default withStyles({
  button: {
    minWidth: 'initial',
    width: 32,
    height: 32,
    padding: 0,
    marginRight: 4,
  },
  loadMoreButton: {
    '&:before': {
      content: '"..."',
      position: 'absolute',
      top: -3,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '&:hover': {
      '&:before': {
        fontFamily: 'consolas',
        fontSize: 12,
        top: 0,
      },
    },
  },
  addButton: {
    '&:hover': {
      '&:before': {
        content: '">>"',
      },
    },
  },
  minusButton: {
    '&:hover': {
      '&:before': {
        content: '"<<"',
      },
    },
  },
})(Pagination);
