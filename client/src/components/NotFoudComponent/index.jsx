import React from "react";

export class ItemNotFound extends React.Component{
    render() {
        return <div className="container">
            <div className="row details">
                <div className="col-md-12 table-responsive-xl ">
                    <div className="text-left">{ this.props.message }
                    </div>
                </div>
            </div>
        </div>
    }
}

