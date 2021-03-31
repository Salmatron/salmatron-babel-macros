const {createMacro} = require('babel-macros');

// ast-pretty-print is really handy :)
// const printAST = require('ast-pretty-print')

module.exports = createMacro(nameofMacro);

function nameofMacro({ references, babel }) {
  const nameofRefs = references.nameof;

  if (!nameofRefs || !nameofRefs.length) {
    return;
  }

  nameofRefs.forEach(reference => {
    const {parentPath} = reference;

    if (parentPath.type === 'CallExpression') {
      /** @type {import("@babel/traverse").NodePath} */
      const arg = parentPath.get('arguments')[0];

      if ((arg.type === 'ObjectExpression') && arg.node) {
        /** @type {import("@babel/traverse").Node} */
        const node = arg.node;

        if (node.type === 'ObjectExpression') {
          /** @type {import("@babel/traverse").Node[]} */
          const properties = node.properties;

          if (properties?.length === 1) {
            /** @type {import("@babel/traverse").Node} */
            const property = properties[0];

            if (property.type === 'ObjectProperty') {
              /** @type {import("@babel/traverse").Node} */
              const keyNode = property.key;

              if (keyNode && (keyNode.type === 'Identifier')) {
                const keyName = keyNode.name;

                if (keyName && (typeof keyName === 'string')) {
                  parentPath.replaceWith(babel.types.stringLiteral(keyName));
                }
              }
            }
          }
        }
      }
    }
  });
}
