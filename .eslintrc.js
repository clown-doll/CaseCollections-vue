// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        indent: ["error", 4, { "VariableDeclarator": 2, "SwitchCase": 1 }],
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-return-assign': 0,
        'space-before-function-paren': 0,
        'space-before-blocks': 0,
        'no-multi-spaces': 0,
        'no-extend-native': 1,
        'no-mixed-spaces-and-tabs': ["error", "smart-tabs"]
    }
}
