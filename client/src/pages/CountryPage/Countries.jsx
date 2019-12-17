import React from 'react';
import { HeaderComponent } from '../../components/CommonComponents/HeaderComponent';
import { CountryListComponent } from '../../components/CountryComponent/CountryListComponent';

export class CountriesPage extends React.Component {

    render() {
        return (
            <div>
                <HeaderComponent/>
                <CountryListComponent/>
            </div>
        );
    }
}