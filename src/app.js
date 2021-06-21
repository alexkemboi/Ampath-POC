import './app.css'
import * as React from 'react';
import Login from './login.js';
import { Button, Pagination, Search, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from 'carbon-components-react';
import { useHistory } from 'react-router-dom';
import CreatePatient from './createPatient';
import { Route } from 'react-router';
import { useState } from 'react';
import response from './login.js';
import axios from 'axios';
const clientname = sessionStorage.getItem("clientname");
console.log(clientname);
function AppMain() {
    const [input, searchInput] = useState();
    const userName = sessionStorage.getItem("userDetails");
    const [rows, setRows] = useState([]);
    

    const displayPatient = () => {
        const headers = ['uuid', 'Name', 'Gender', 'Age', 'Birthdate', 'Dead', 'DeathDate', 'Causeofdeath'];
        const history=useHistory;
            const handleClick=(e)=>{
                const id=e;
                console.log(id)
            }
        return (
            <div>
                <Table >
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader key={header}>{header}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow onClick={()=>handleClick(row.id)} key={row.id}>
                                {Object.keys(row)
                                    .filter((key) => key !== 'id')
                                    .map((key) => {
                                        return <TableCell key={key}>{row[key]}</TableCell>;
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
        axios.get(`http://10.50.80.115:8090/amrs/ws/rest/v1/patient?q=${input}&v=default&limit=10`,
            { header: { Authorization: `Basic ${userName}` } }).then(result => {
                const patientResults = result.data.results;
                const results=patientResults.map(value =>{

                    return {
                       
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


    return (
        <div className="divDashboard">
            <label className="user_details">Welcome {clientname}</label>
            <form onSubmit={handleSubmit}>
                <div className="divcommands">
                    <Search
                        id="search-1"
                        placeHolderText="Search"
                        labelText="SEARCH PATIENT"
                        type="text"
                        onChange={handleSearch}
                    />

                    <span className="divDashboardspan">

                        <Button type="Submit" onCLick={handleSubmit} className="buttonlableadd">Add Patient</Button>
                        <a className="logout" onClick={Logout} href="#">Logout</a>
                    </span>

                </div>
            </form>
            {displayPatient()}
            
        </div>
    );
}
export default AppMain;