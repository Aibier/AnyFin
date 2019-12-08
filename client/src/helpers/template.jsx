import React from "react";
import { Link } from "react-router-dom";


export function getTemplate(countries, total,  details, fn) {

    const columnNumber = details ? 4: 3;
    const columnWith = `${1/columnNumber * 100}%`;
    const colStyle = { width: columnWith, fontSize: '14px' };
    const hideCur = details ? 'mobile_hide' : '';
    const showRate = details ? '' : 'mobile_hide';
 return (
     <div className="container">
         <div className="row">
             { countries.length > 0 && 
             <div className="col-md-12 table-responsive">
                 <div className="text-left">Total { total } found.</div>
                 < table className="table ">
                     <thead className="thead-light">
                     <tr>
                         <th scope="col" style={ colStyle }>Name</th>
                         <th scope="col" style={ colStyle }>Population</th>
                         
                            <th 
                                scope="col" 
                                style={ colStyle }
                                className = { hideCur }
                                >Currencies
                            </th>
                         
                         <th 
                            className = { showRate }
                            scope="col" 
                            style={ colStyle }>{ details ? 'Currency Rate' :'Currency Symbol'}
                        </th>
                     </tr>
                     </thead>
                     <tbody>
                     {countries.map((country, index) =>
                         <tr key={index}>
                             <td>
                                 <a onClick={fn }>{country.name}</a>
                             </td>
                             <td>{ country.population }</td>
                             
                             <td className = { hideCur }>
                                 <dl>
                                     { country.currencies.map((cur, idx) => <dt key={idx} > { cur.name }</dt> )}
                                 </dl>
                             </td>
                             
                             <td  className = { showRate }>
                                 <dl>
                                     { country.currencies.map((cur, idx) =>
                                         <dt key={idx} > {cur.symbol } { cur.rate? cur.rate.toFixed(4): '' }</dt>
                                     ) }
                                 </dl>
                             </td>
                             
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