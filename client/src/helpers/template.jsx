import React from "react";
import { Link } from "react-router-dom";


export function getTemplate(countries, details, fn) {

    const columnNumber = details ? 4: 3;
    const columnWith = `${1/columnNumber * 100}%`;
    console.log(columnWith);
    const colStyle = { width: columnWith, fontSize: '14px' };
 return (
     <div className="container">
         <div className="row">
             {countries.items &&
             <div className="col-md-12 table-responsive">
                 <div className="text-left">Total { countries.items.count } found.</div>
                 < table className="table ">
                     <thead className="thead-light">
                     <tr>
                         <th scope="col" style={ colStyle }>Name</th>
                         <th scope="col" style={ colStyle }>Population</th>
                         {!details &&
                            <th scope="col" style={ colStyle }>Currencies</th>
                         }
                         {details && <th scope="col" style={ colStyle }>Currency Rate</th>}
                     </tr>
                     </thead>
                     <tbody>
                     {countries.items.countries.map((country, index) =>

                         <tr key={index}>
                             <td>
                                 <a onClick={fn }>{country.name}</a>
                             </td>
                             <td>{ country.population }</td>
                             { !details &&
                                 <td>
                                     <dl>
                                         { country.currencies.map((cur, idx) => <dt key={idx} > { cur.name }</dt> )}
                                     </dl>
                                 </td>
                             }
                             { details &&
                             <td>
                                 <dl>
                                     { country.currencies.map((cur, idx) =>
                                         <dt key={idx} > {cur.symbol } { cur.rate? cur.rate.toFixed(4): '' }</dt>
                                     ) }
                                 </dl>
                             </td>
                             }
                         </tr>
                     )}
                     </tbody>
                 </table>
             </div>
             }
         </div>
     </div>
 )
}

export function getNotFound(message, value, fn) {
    return (
        <div className="container">
            <div className="row details">
                <div className="col-md-12 table-responsive-xl ">
                    <div className="text-left">{ message }
                    </div>
                </div>
            </div>
        </div>
    )
}