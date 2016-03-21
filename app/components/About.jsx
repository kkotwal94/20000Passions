import React from 'react';
import FullWidthSection from 'components/FullWidthSection';
import styles from 'scss/components/_about';
import {Styles} from 'material-ui';
const { Colors, Spacing, Typography } = Styles;

export default class About extends React.Component {
  
  _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },

      a: {
        color: '#ff4081'
      },

      p: {
      	fontSize: '25.59995985031128px',
		fontSize: '1.77530927287559vw'
      }
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="home-purpose">
        <strong><p style={styles.p}>What are we?</p></strong>
        <br/>
        <p style={styles.p}>We are about the idea of allowing students to free their minds with ideas out of creativity, which allows them to practice the art of presenting, fruition of ideas, and beginning to head towards their goal.</p>
        <br/>
        <strong><p style={styles.p}>What kind of group are we and where did we originate from?</p></strong>
        <br/>
        <p style={styles.p}>We are a group that formed at the University of Delaware with the ambition to create a web app that allows students to pitch their own idea. [Insert what kind of group we are here]</p>
        <br/>
        <strong><p style={styles.p}>What is this web app programmed in?</p></strong>
        <br/>
        <p style={styles.p}>It is programmed using javascript and reactjs, along with node for the database and file uploading. Uses altjs for flux, and iso to make it isomorphic. You can check out the code at github: <a href="https://github.com/kkotwal94/20000pitches">Here</a></p>
        <br/>
      </FullWidthSection>
    );
  }

  render() {
    return (
      <div className={styles.about} style={{backgroundColor: Colors.grey200, marginTop: "-75px"}}>
        <h1 className={styles.about__header}>About 20,000 pitches</h1>
        {this._getHomePurpose()}
      </div>
    );
  }
}
