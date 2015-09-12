import React, { Component, PropTypes } from 'react';
import { query } from '../actions/query';

class Query extends Component {
    render() {
        const { query, input, output } = this.props;

        var outputElement;

        if (output && output.hits.hits.length > 0) {
            outputElement = (
                <table className="table" width="100%" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {output.hits.hits.map(hit => {
                        return (
                            <tr key={hit._id}>
                                <td>{hit._id}</td>
                                <td>{hit._source.category.title}</td>
                                <td>{hit._source.title}</td>
                                <td>{hit._source.description}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            );
        } else {
            outputElement = (
                <p>No results</p>
            );
        }

        var queryValue = '';
        
        if (input.body && input.body.query_string) {
            queryValue = input.body.query_string.query;
        }

        return (
            <div className="container">
                <h1 className="page-header">Query</h1>

                <div className="row">
                    <div className="col-xs-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h2 className="panel-title">Input</h2>
                            </div>

                            <table className="table">
                            <tr><th>Index</th><td>{input.index || 'None'}</td></tr>
                            <tr><th>Type</th><td>{input.type || 'None'}</td></tr>
                            <tr><th>Body</th><td>{JSON.stringify(input.body || null, null, 4)}</td></tr>
                            <tr><th>Query</th><td>
                                <input
                                    className="form-control input-sm"
                                    type="search"
                                    defaultValue={queryValue}
                                    onChange={e => query(e.target.value)} />
                            </td></tr>
                            </table>
                        </div>
                    </div>

                    <div className="col-xs-9">
                        {outputElement}
                    </div>
                </div>
            </div>
        );
    }
}

Query.propTypes = {
    query: PropTypes.func.isRequired,
    input: PropTypes.object.isRequired,
    output: PropTypes.object
};

export default Query;
