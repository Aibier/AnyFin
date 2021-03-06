import React  from 'react';


export class CountryItemComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { country } = this.props;
        return <tr>
            <td>
                <a >{country.name}</a>
            </td>
            <td>{ country.population }</td>
            <td >
                <dl>
                    { country.currencies.map((cur, idx) => <dt key={idx} > { cur.name }</dt> )}
                </dl>
            </td>
            <td>
                <dl>
                    { country.currencies.map((cur, idx) =>
                        <dt key={idx} > {cur.symbol } { cur.rate? cur.rate.toFixed(4): '' }</dt>
                    ) }
                </dl>
            </td>
        </tr>
    }
}

