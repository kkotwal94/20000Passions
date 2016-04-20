import React from 'react';
import Navigation from 'components/Navigation';
import {
  LeftNav,
  Mixins,
  Styles,
} from 'material-ui';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import {PropTypes} from 'react-router';

const {Colors, Spacing, Typography} = Styles;
const {StylePropable} = Mixins;
const SelectableList = SelectableContainerEnhance(List);


export default class leftNav extends React.Component {

constructor(props) {
  super(props);
  this.state.leftNavOpen = true;
  }

static contextTypes = {
        router: React.PropTypes.func
    }

/*static propTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object
  }


toggle(){
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  }

  _getSelectedIndex = () => {
    return this.props.location.pathname.split('/')[1];
  }

  handleChangeRequestLeftNav = (open) => {
    this.setState({
      leftNavOpen: open
    });
  }

  handleRequestChangeList = (event, value) => {
    this.props.history.push(value);
    this.setState({
      leftNavOpen: false
    });
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value;
    this.setState({
      leftNavOpen: false
    });
  }

  handleTouchTapHeader = () => {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false
    });
  }

getStyles() {
    return {
      cursor: 'pointer',
      fontSize: 24,
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      marginBottom: 8,
    };
  }

    render() {
    return (
      <LeftNav ref="leftNavChildren" docked={false}>
  <MenuItem index={0}>Menu Item</MenuItem>
  <MenuItem index={1}><a href="/link">Link</a></MenuItem>
	</LeftNav>
    );
  }
}

leftNav.contextTypes = { history: PropTypes.history };