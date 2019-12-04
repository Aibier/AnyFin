import React from "react";
import { Link } from "react-router-dom";


export function getTemplate(countries, details, fn) {
 return (
     <div className="container">
         <div className="row list">
             {countries.items &&
             <div className="col-md-12 ">
                 <div className="text-left">Total { countries.items.count } found.</div>
                 < table className="table align-center">

                     <thead className="thead-light">
                     <tr>
                         <th scope="col">Name</th>
                         <th scope="col">Population</th>
                         <th scope="col">Currencies</th>
                         {details && <th scope="col">Currency Rate</th>}
                     </tr>
                     </thead>
                     <tbody>
                     {countries.items.countries.map((country, index) =>

                         <tr key={index}>
                             <td>
                                 <a onClick={fn }>{country.name}</a>
                             </td>
                             <td>{ country.population }</td>
                             <td>
                                 <dl>
                                     { country.currencies.map((cur, idx) => <dt key={idx} > { cur.name }</dt> )}
                                 </dl>
                             </td>
                             { details &&
                             <td>
                                 <dl>
                                     { country.currencies.map((cur, idx) =>
                                         <dt key={idx} > {cur.symbol } { cur.rate }</dt>
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