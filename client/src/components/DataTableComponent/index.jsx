import React from "react";
import { CountryItemComponent } from '../CountryItemComponent';

export class CustomDatatable extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="col-md-12 table-responsive">
            <div className="text-left">Total { this.props.total } found.</div>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th scope="col" style={ this.props.colStyle }>Name</th>
                    <th scope="col" style={ this.props.colStyle }>Population</th>

                    <th
                        scope="col"
                        style={ this.props.colStyle }
                        className = { this.props.hideCur }
                    >Currencies
                    </th>
                    <th
                        className = { this.props.showRate }
                        scope="col"
                        style={ this.props.colStyle } > { this.props.showRate ? 'Currency Rate' :'Currency Symbol'}
                    </th>
                </tr>
                </thead>
                <tbody>
                 {
                     this.props.countries.map(
                         (country, index) => <CountryItemComponent country={country} key={index} />)
                 }
                </tbody>
            </table>
        </div>

    }
}

