import React, { Component } from 'react';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Pagination2 extends Component {
  static propTypes = {
    total: PropTypes.number,
    current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    component: PropTypes.func,
    componentProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  static defaultProps = {
    current: 1,
    componentProps: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      current: props.current,
    };
  }

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
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== -1 || (arr[i] === -1 && arr[i + 1] !== -1)) {
        result.push(arr[i]);
      }
    }
    return result;
  };

  handleClick = (to) => (e) => {
    this.setState({ current: to });
  };

  getComponent = (page, index) => {
    const { component, componentProps } = this.props;
    const { current } = this.state;
    const Component = component;
    let result = {};
    if (component) {
      result.component = (props) => {
        return (
          <Component
            {...props}
            {...(typeof componentProps === 'function'
              ? componentProps({ page, current, index })
              : componentProps)}
          />
        );
      };
      return result;
    } else {
      return {};
    }
  };

  render() {
    const { current } = this.state;
    const { classes, component, componentProps, ...rest } = this.props;
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
              onClick={this.handleClick(page)}
              {...this.getComponent(page, i)}
              variant={page === +current ? 'contained' : null}
              color={page === +current ? 'primary' : null}
              {...rest}
            >
              {page === -1 ? '' : page}
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
})(Pagination2);
