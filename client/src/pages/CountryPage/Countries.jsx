import React from 'react';
import { HeaderComponent } from '../../components/HeaderComponent';
import { CountryListComponent } from '../../components/CountryListComponent';

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