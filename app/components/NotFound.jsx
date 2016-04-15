import React from 'react';
import FullWidthSection from 'components/FullWidthSection';
import {Styles} from 'material-ui';
const { Colors, Spacing, Typography } = Styles;
import styles from 'scss/components/_about'; 
export default class NotFound extends React.Component {
  

  render() {
    return (
      <div className={styles.about} style={{backgroundColor: Colors.grey200, marginTop: "-75px"}}>
        <h1 className={styles.about__header}>Page Not Found</h1>
        <p>This is most likely because the post you were viewing got deleted or the url entered was wrong, hey we couldve possibly lost it too. Try typing in the url again, or visiting the post from the gallery.</p>
        
      </div>
    );
  }
}
