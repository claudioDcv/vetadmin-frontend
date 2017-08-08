module.exports = {
    'extends': 'airbnb',
    'plugins': [
        'react',
        'jsx-a11y',
        'import'
    ],
    'globals': {
        'window': true,
        'document': true
    },
    'env': {
        'browser': true,
        'node': true
    },
    'rules': {
        'indent': ['error', 2],
        'no-nested-ternary': 0,
        'react/forbid-prop-types': 0,
        'react/require-default-props': 0,
        'react/prefer-stateless-function': 0,
        'no-trailing-spaces': [
            'error', {
                'skipBlankLines': true
            }
        ]
    }
}
