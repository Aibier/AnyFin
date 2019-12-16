import React from 'react';


export class TableHeaderComponent extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        const { attributes } = this.props;
        return <thead className="thead-light">
        <tr>
            <th scope="col" style={ attributes.colStyle }>Name</th>
            <th scope="col" style={ attributes.colStyle }>Population</th>

            <th
                scope="col"
                style={ attributes.colStyle }
                className = { attributes.hideCurrency }
            >Currencies
            </th>
            <th scope="col" style={ attributes.colStyle }>
                { attributes.showList ? 'Currency Rate' :'Currency Symbol'}
            </th>
        </tr>
        </thead>
    }
}