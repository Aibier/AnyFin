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
            'origin': [],
            'total': 0,
            'currentPage': 1,
            'totalPage': 1
        }
    }
    componentDidMount() {
         this.props.getCountries()
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.props.isLoading && this.props.countries.items && this.state.origin.length ===0) {
            this.setState({ origin: this.props.countries.items.countries});
            this.setState({ current: this.props.countries.items.countries.slice(this.state.start, this.state.limit)});
            this.setState({ total: this.props.countries.items.countries.length });
            this.setState({ totalPage: Math.ceil(this.props.countries.items.countries.length/10)});
            this.setState({ currentPage: 1 });
        }
    }
    handleSearch (searchValue)  {
        if (searchValue) {
            value = searchValue;
            hide = true;
            this.props.getCountryByName(searchValue);
            this.setState({ totalPage: 1});
        } else {
            hide = false;
            this.props.getCountries();
        }
    };

    moveNext(n) {
        this.state.limit += 10; 
        this.state.start += 10;
        if(this.state.start < this.state.total && this.state.totalPage > 1) {
            const current = this.state.origin.slice(this.state.start, this.state.limit) ;
            this.setState({current: current });
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }
    movePrevious(p) {
        if(this.state.start > 0 && this.state.limit > 0) {
            this.state.limit -=10; 
            this.state.start -= 10;
            const current = this.state.origin.slice(this.state.start, this.state.limit) ;
            this.setState({current: current });
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
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
            data = getTemplate(this.state.current, countries.items.count,  false, () => {});
        }
        if(hide && country.items) {
            data = getTemplate(country.items.countries, countries.items.count,  true, () => {});
        }

        return (
            <div>
                <SearchComponent  handleSearch={this.handleSearch} />
                <div className="loading_bar">
                    { button }
                </div>
                { data }
                { !isLoading && this.state.totalPage > 1 &&  
                    <div className="container" >
                        <div className="d-flex">
                            <div className="mr-auto p-2">
                                <button 
                                className="bth"
                                disabled={ this.state.currentPage === 1 }
                                 onClick={() => this.movePrevious(this.state.start) }>
                                Previous 
                                </button>
                            </div>
                            <div className="p-2 text-center">
                             { this.state.currentPage } of { this.state.totalPage }
                            </div>
                            <div className="p-2">
                                <button 
                                disabled={ this.state.currentPage === this.state.totalPage }
                                className="bth" onClick={ () => this.moveNext(this.state.start)}>
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