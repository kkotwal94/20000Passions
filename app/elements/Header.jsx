import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

class Header extends React.Component {
  render() {
    return (
      <Helmet
        title="20,000 pitches"
        meta={config.meta}
        link={config.link}
      />
    );
  }
}

ReactDOMServer.renderToString(<Header />);
let header = Helmet.rewind();

export default header;
