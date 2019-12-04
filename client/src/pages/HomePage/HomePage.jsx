import React from 'react';
import { connect } from 'react-redux';
import { HeaderComponent } from '../../components/HeaderComponent';
import { SearchComponent } from '../../components/SearchComponent';
import { getCountryByName } from '../../actions/coutry.actions';
import { getTemplate, getNotFound } from '../../helpers/template';

let value = ''

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    };

    handleSearch (searchValue)  {
        value = searchValue;
        this.props.getCountryByName(searchValue);
    };

    render() {
        const { country, error } = this.props;
        const isLoading =  country.loading;
        let button, data;

        if (isLoading) {
            button = <div className="loader text-center"></div>
        }
        if (country.error) {
            data = getNotFound('Requested item not found.', value, this.handleSearch);
        }
        if(country.items) {
            data = getTemplate(country, true, () => {})
        }
        if (error) {
            console.log(error);
        }
        return (
            <div>
                <HeaderComponent/>
                <div className="loading_bar">
                    { button }
                </div>
                <div className="col-12">
                    <SearchComponent handleSearch={this.handleSearch} />
                </div>
                { data }

            </div>
        );
    }
}

const mapState = (state) => {
    console.log('state', state.country);
    console.log('error', state.error);
    const { authentication, country, error, value } = state;
    const { user } = authentication;
    return { user, country, error };
};

const actionCreators = {
    getCountryByName,
    clicked: false
};

export const HomePage = connect(mapState, actionCreators)(LandingPage);
