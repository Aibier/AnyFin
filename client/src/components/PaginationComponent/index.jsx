import React from "react";

export class Pagination extends React.Component{
    render() {
        return <div className="container" >
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <button
                        className="bth"
                        disabled={ this.props.currentPage === 1 }
                        onClick={() => this.movePrevious() }>
                        Previous
                    </button>
                </div>
                <div className="p-2 text-center">
                    { this.props.currentPage } of { this.props.totalPage }
                </div>
                <div className="p-2">
                    <button
                        disabled={ this.props.currentPage === this.props.totalPage }
                        className="bth" onClick={ () => this.moveNext()}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    }
}