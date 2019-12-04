import React from 'react';
import { connect } from 'react-redux';
import { SearchComponent } from '../../components/SearchComponent';
import { getCountries, getCountryByName } from '../../actions';
import { getTemplate, getNotFound } from '../../helpers/template';
let hide = false;
let value = '';

class Countries extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.props.getCountries();
    }
    handleSearch (searchValue)  {
        if (searchValue) {
            value = searchValue;
            hide = true;
            this.props.getCountryByName(searchValue);
        } else {
            hide = false;
            this.props.getCountries();
        }
    };

    render() {
        const { countries, country } = this.props;
        const isLoading =  countries.loading || country.loading;
        let button, data;

        if (isLoading) {
            button = <div className="loader text-center"></div>
        }
        if (country.error) {
            hide = true;
            data = getNotFound('Search item not found.', value, this.handleSearch);
        }

        if (!hide && countries.error) {
            data = getNotFound(' Data not found, Please try again.', 'value', () => {})
        }

        if(!hide && countries.items) {
            data = getTemplate(countries, false, () => {});
        }
        if(hide && country.items) {
            data = getTemplate(country, true, () => {});
        }
        return (
            <div>
                <SearchComponent  handleSearch={this.handleSearch} />
                <div className="loading_bar">
                    { button }
                </div>
                { data }
            </div>
        );
    }
}

function mapState(state) {
    const { authentication, countries, country, value } = state;
    const { user } = authentication;
    return { user, countries, country, value };
}

const actionCreators = { getCountries, getCountryByName };

const connectedCountries = connect(mapState, actionCreators)(Countries);
export { connectedCountries as CountryListComponent };