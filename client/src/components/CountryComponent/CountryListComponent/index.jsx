import React from 'react';
import { connect } from 'react-redux';
import { SearchComponent } from '../../SearchComponent';
import {CustomDatatable, LoadingBarComponent, ItemNotFoundComponent } from '../../CommonComponents';
import { ContainerDiv, ButtonWrapper } from '../../CommonComponents/elments';
import { getCountries, getCountryByName } from '../../../actions';


let showList = true;
let value = '';
let showPagination = false;
const initialState = {
    'start': 0,
    'limit': 10,
    'current': [],
    'origin': [],
    'total': 0,
    'currentPage': 1,
    'totalPage': 1
};

class Countries extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = initialState
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
        this.setState(initialState);
        if (searchValue) {
            value = searchValue;
            showList = false;
            this.props.getCountryByName(searchValue);
        } else {
            showList = true;
            value = '';
            this.props.getCountries();
        }
    };

    moveNext() {
        this.state.limit += 10; 
        this.state.start += 10;
        if(this.state.start < this.state.total) {
            const current = this.state.origin.slice(this.state.start, this.state.limit) ;
            this.setState({current: current });
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }
    movePrevious() {
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
        let button, data, total, notFoundData;

        const columnNumber = showList && country.items ? 4: 3;
        const columnWith = `${1/columnNumber * 100}%`;
        const colStyle = { width: columnWith, fontSize: '14px' };
        const hideCurrency = showList && country.items ? 'hide' : '';
        const showRate = showList && country.items ? '' : 'hide';

        if (isLoading) {
            button = <LoadingBarComponent />
        }

        if (country.error) {
            showList = false;
            notFoundData = <ItemNotFoundComponent message={ 'Search item not found.'} />
        }

        if (countries.error) {
            showList = false;
            notFoundData = <ItemNotFoundComponent message={'Data not found, Please try again.'}/>
        }

        if(showList && countries.items && countries.items.countries) {
            total = countries.items.countries.length;
            showPagination = true;
            data = <CustomDatatable
                total = { total }
                colStyle = { colStyle }
                hideCurrency = { hideCurrency }
                showList = { showList }
                showRate = { showRate }
                showPagination = { false }
                countries = { this.state.current } />
        }

        if(!showList && country.items) {
            showPagination = false;
            total = country.items.countries.length;
            data = <CustomDatatable
                total = { total }
                colStyle = { colStyle }
                hideCurrency = { hideCurrency }
                showList = { !showList }
                showRate = { showRate }
                showPagination = { false }
                countries = { country.items.countries } />
        }

        return (
            <ContainerDiv className="container">
                <SearchComponent  handleSearch={this.handleSearch} />
                <div className="loading_bar"> { button } </div>
                { data }
                { !isLoading && notFoundData }
                { !isLoading && showPagination &&
                    <div>
                        <div className="d-flex">
                            <div className="mr-auto p-2">
                                <ButtonWrapper
                                className="bth"
                                disabled={ this.state.currentPage === 1 }
                                 onClick={() => this.movePrevious() }>
                                Previous
                                </ButtonWrapper>
                            </div>
                            <div className="p-2 text-center">
                             { this.state.currentPage } of { this.state.totalPage }
                            </div>
                            <div className="p-2">
                                <ButtonWrapper
                                disabled={ this.state.currentPage === this.state.totalPage }
                                className="bth" onClick={ () => this.moveNext()}>
                                Next
                                </ButtonWrapper>
                            </div>
                        </div>
                    </div>
                }
            </ContainerDiv>
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