const _require = require('esm')(module)
const tools = _require('./tools');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const {createPage} = actions
    const pageTemplate = path.resolve(`src/templates/ToolPage.js`)
    tools.default.map((tool) => {
        createPage({
            // Path for this page — required
            path: tool.name.toLocaleLowerCase(),
            component: pageTemplate,
            context: {
                tool
                // Add optional context data to be inserted
                // as props into the page component..
                //
                // The context data can also be used as
                // arguments to the page GraphQL query.
                //
                // The page "path" is always available as a GraphQL
                // argument.
            },
        });
    })
}

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
    const config = getConfig();
    config.resolve.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
    };
    actions.replaceWebpackConfig(config);
};