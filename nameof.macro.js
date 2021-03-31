// ast-pretty-print is really handy :)
const printAST = require('ast-pretty-print')
const {createMacro} = require('babel-macros')

module.exports = createMacro(nameofMacro)

function nameofMacro({ references, babel }) {
  const nameofRefs = references.nameof;

  if (!nameofRefs || !nameofRefs.length) {
    return;
  }

  nameofRefs.forEach(reference => {
    const {parentPath} = reference;


    if (parentPath.type === 'CallExpression') {
      const arg = parentPath.get('arguments')[0];

      const evaluated = arg.evaluate();

      const value = evaluated.value;
      const deopt = evaluated.deopt;

      if ((typeof value === 'object') && value) {
        parentPath.replaceWith(babel.types.stringLiteral(Object.keys(value)[0]));
      } else if (deopt && deopt.container && deopt.container.key.name) {
        parentPath.replaceWith(babel.types.stringLiteral(deopt.container.key.name));
      }

    }
  });
}
