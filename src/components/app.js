import '../styles/app.css'
import * as React from 'react';
//import Login from './login.js';
import { Button, Pagination, Search, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from 'carbon-components-react';
import { NavLink, useHistory } from 'react-router-dom';
import CreatePatient from './createPatient';
import { Route } from 'react-router';
import { useState } from 'react';
import urlApi from '../components/resource.js'
//import response from './login.js';
import axios from 'axios';
import { Modal } from 'carbon-components';
const clientname = sessionStorage.getItem("clientname");
console.log(clientname);
function AppMain() {
    const [input, searchInput] = useState();
    const userName = sessionStorage.getItem("userDetails");
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(true);


    const displayEncounters = (e) => {
        const uuid = e.target.attributes.getNamedItem('data-uuid').value;
        axios.get(`${urlApi}encounter?patient=${uuid}&v=default&limit=10`,
            { header: { Authorization: `Basic ${userName}` } }).then(result => {
                const encounterResults = result.data.results;
                const results = encounterResults.map(value => {
                    console.log(value);
                    return {
                        id: value.uuid,
                        uuid: value.uuid,
                        Name: value.display,
                        EncounterDatetime: value.encounterDatetime,
                        // encounterProviders:value.encounterProviders,

                    }

                }
                )
                setRows(results)
            });

    }






    const displayPatient = () => {
        const headers = ['uuid', 'Name', 'Gender', 'Date of birth'];

        return (
            <div>
                <Search
                    id="search-1"
                    placeHolderText="Search"
                    labelText="SEARCH PATIENT"
                    type="text"
                    onChange={handleSearch}
                />
               
                    <Table className="rowtable" >
                        <TableHead className="roww">
                            <TableRow className="roww">
                                {headers.map((header) => (
                                    <TableHeader key={header}>{header}</TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (

                                <TableRow className="roww" onClick={displayEncounters} key={row.id
                                }>
                                    {Object.keys(row)
                                        .filter((key) => key !== 'id')
                                        .map((key) => {
                                            return <TableCell data-uuid={row['uuid']} key={key}>{row[key]}</TableCell>;


                                        })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 
                <Pagination
                    backwardText="Previous page"
                    forwardText="Next page"
                    itemsPerPageText="Items per page:"
                    page={1}
                    pageNumberText="Page Number"
                    pageSize={5}
                    pageSizes={[
                        5,
                        10,
                        25,
                        50,
                        100
                    ]}
                    totalItems={rows.length}
                />
              
                
              
               

            </div>
        );

    }

    const handleSearch = (e) => {

        searchInput(e.target.value);
        axios.get(`${urlApi}/patient?q=${input}&v=default&limit=10`,
            { header: { Authorization: `Basic ${userName}` } }).then(result => {
                const patientResults = result.data.results;
                const results = patientResults.map(value => {

                    return {
                        id: value.person.uuid,
                        uuid: value.person.uuid,
                        Name: value.person.display,
                        Gender: value.person.gender,
                        Age: value.person.Age,
                        Birthdate: value.person.birthdate,
                        BirthdateEstimated: value.person.birthdateEstimated,
                        Dead: value.person.dead,
                        DeathDate: value.person.deadDate,
                        Causeofdeath: value.person.causeOfDeath,
                    }

                }
                )
                setRows(results)

            });

    }


    const path = useHistory();
    const handleSubmit = e => {
        e.preventDefault();
        <Route path="/createPatient" component={CreatePatient} />
        path.push("/CreatePatient");
    }

    const Logout = () => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("session-id");
        path.push("/")
    }
    const res = clientname.toUpperCase();

    return (
        <div className="divDashboard">
            
            <label className="user_details">WELCOME {res + " "}</label>
            <span className="divDashboardspan">
                <Button type="Submit" onClick={handleSubmit} className="buttonlableadd">Add Patient</Button>
                <Button onClick={Logout} className="buttonlableadd">Logout</Button>
            </span>


            {displayPatient()}


        </div>


    );

}
export default AppMain;