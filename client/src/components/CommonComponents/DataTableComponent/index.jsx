import React from "react";
import { TableHeaderComponent } from './TableHeaderComponent'
import { CountryItemComponent } from '../../CountryComponent/CountryItemComponent';

export class CustomDatatable extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { total, colStyle, hideCurrency, showRate, showList } = this.props;
        const attributes = {
            hideCurrency,
            showRate,
            showList,
            colStyle
        };

        return <div className="col-md-12 table-responsive">
            <div className="text-left">Total { total } found.</div>
            <table className="table">
                <TableHeaderComponent attributes={attributes} />
                <tbody>
                 {
                     this.props.countries.map(
                         (country, index) => <CountryItemComponent
                             country={country} key={index} showList={showList} colStyle={colStyle}
                         />)
                 }
                </tbody>
            </table>
        </div>

    }
}



