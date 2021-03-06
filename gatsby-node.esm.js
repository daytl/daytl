import path from 'path';
import tools from './tools';

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions
    const pageTemplate = path.resolve(`src/templates/ToolPage.js`)
    tools.map((tool) => {
        createPage({
            // Path for this page — required
            path: tool.name,
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
        })
    })
}