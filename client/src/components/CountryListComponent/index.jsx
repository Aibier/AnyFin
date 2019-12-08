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
        this.state = {
            'start': 0,
            'limit': 10,
            'current': [],
            'origin': []
        }
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

    moveNext(curret) {
        this.state.limit += 10; 
        this.state.start += 10;
        this.state.current = this.state.origin.slice(this.state.start, this.state.limit) 
    }
    movePrevious(origin) {
        console.log('Im moving previous.')
    }

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
            this.state.orgin = countries.items.countries
            this.state.current = countries.items.countries.slice(0, 10);
            console.log('current data', this.state.current);
            data = getTemplate(this.state.current, countries.items.count,  false, () => {});
        }
        if(hide && country.items) {
            // this.setState.current = country.items.countries.slice(start, limit);
            data = getTemplate(ountry.items.countries, countries.items.count,  true, () => {});
        }

        return (
            <div>
                <SearchComponent  handleSearch={this.handleSearch} />
                <div className="loading_bar">
                    { button }
                </div>
                { data }
                { !isLoading && 
                    <div className="container" >
                    <div className="d-flex">
                        <div className="mr-auto p-2">
                            <button className="bth" onClick={() => this.movePrevious(this.state.start) }>
                             Previous 
                            </button></div>
                        <div className="p-2">
                            <button className="bth" onClick={ () => this.moveNext(this.state.current)}>
                             Next
                            </button>
                        </div>
                    </div>
                </div>
                }
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