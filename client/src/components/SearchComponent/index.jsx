import React from "react";
import { SearchInput } from './elements';
import { ContainerDiv } from '../CommonComponents/elments'

export class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event)  {
        event.preventDefault();
        this.props.handleSearch(this.state.value);
    };

    handleChange(event) {
        this.setState({ value: event.target.value });
    };

    render() {
        return (
            <ContainerDiv className="container">
                <div className="row mb-2">
                    <div className="col-lg-8 mx-auto">
                        <div className="bg-white pt-4">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-4 border rounded-pill p-1">
                                    <SearchInput type="search" placeholder="Search country ..."
                                           aria-describedby="button-addon3"
                                           className="form-control bg-none border-0"
                                           value={this.state.value}
                                           onChange={this.handleChange}
                                    />
                                    <div className="input-group-append border-0">
                                        <button id="button-addon3"
                                                type="button"
                                                className="btn btn-link text-success">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ContainerDiv>
        );
    }

}

