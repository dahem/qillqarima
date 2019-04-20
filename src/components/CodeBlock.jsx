import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';
import Endpoint from './Endpoint';

class CodeBlock extends PureComponent {
  render() {
    const { language, value } = this.props;
    if (language === 'endpoint') {
      const data = value.split(' ');
      return (<Endpoint method={data[0]} path={data[1]} />);
    }

    return (
      <SyntaxHighlighter language={language} style={atomDark}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

CodeBlock.defaultProps = {
  language: null,
  value: '',
};

CodeBlock.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string,
};

export default CodeBlock;
