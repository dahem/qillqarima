import React from 'react';
import { object, arrayOf } from 'prop-types';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import Scrollspy from 'react-scrollspy';

import importedFiles from '../docNames';
import { readFiles, splitDoc, getTitle } from '../util/markdown';
import CodeBlock from '../components/CodeBlock';
import LeftMenu from '../components/LeftMenu';

class Main extends React.Component {
  static async getInitialProps() {
    try {
      const headFiles = ['introduction.md', 'install.md'];

      let files = importedFiles.filter(d => !headFiles.includes(d));
      if (importedFiles.length > files.length) {
        files = headFiles.concat(files);
      }

      const mdDocs = await readFiles(files);
      const ans = {
        mdDocs: mdDocs.map((m, i) => ({ key: i, sections: splitDoc(m.default) })),
        menuItems: mdDocs.map((m, i) => ({ href: `section-${i}`, name: getTitle(m.default) })),
      };
      return ans;
    } catch (e) {
      console.log(e);
      return { mdDocs: [], menuItems: [] };
    }
  }

  render() {
    const { mdDocs, menuItems } = this.props;
    return (
      <div>
        <Head>
          <title>QILLWARIMA [by dahem]</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
          <link href="static/style.css" rel="stylesheet" />
          <link href="static/leftMenu.css" rel="stylesheet" />
        </Head>
        <div>
          <Scrollspy
            items={menuItems.map(x => x.name)}
            className="left-menu"
          >
            <LeftMenu items={menuItems} />
          </Scrollspy>
          <div className="main">
            {mdDocs.map(doc => (
              <section key={doc.key} id={`section-${doc.key}`}>
                {doc.sections.map(section => (
                  <div key={section.key} className="section">
                    <div className="info">
                      <ReactMarkdown source={section.info} renderers={{ code: CodeBlock }} />
                    </div>
                    <div className="example">
                      <ReactMarkdown source={section.example} renderers={{ code: CodeBlock }} />
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  mdDocs: arrayOf(object).isRequired,
  menuItems: arrayOf(object).isRequired,
};

export default Main;
