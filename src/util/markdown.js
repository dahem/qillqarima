export const readFiles = async files => Promise.all(files.map(f => require(`../docs/${f}`)));

function splitSection(section, i) {
  const divWord = '```endpoint';
  const parts = section.split(divWord);

  let example = '';
  let info = '';

  if (parts.length > 1) {
    // eslint-disable-next-line prefer-destructuring
    info = parts[0];
    example = divWord + parts.slice(1).join('');
  } else {
    info = section;
  }

  return { key: i, info, example };
}

export const splitDoc = (doc) => {
  const divSection = '\n### ';
  const sections = doc.split(divSection).map((x, i) => {
    if (i > 0) return `\n### ${x}`;
    return x;
  });

  return sections.map((s, i) => splitSection(s, i));
};

export const getTitle = (doc) => {
  const startIndex = doc.indexOf('## ');
  const endIndex = doc.indexOf('\n');
  return doc.substring(startIndex + 3, endIndex);
};
