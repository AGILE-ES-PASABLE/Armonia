'use client';
import React, { useState, useEffect } from 'react';
import { url } from '@/utils/backend-route';
import Navbar from '@/components/Navbar';
const OrganizationalStructureForm = () => {
    
    const [structure, setStructure] = useState([]);
    const [isDataSaved, setIsDataSaved] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [workerFormData, setWorkerFormData] = useState({
        code: '',
        firstName: '',
        lastName: '',
        division: ''
    });
    useEffect(() => {
        fetchData();
        fetchWorkers();
    }, []);
    const fetchWorkers = async () => {
        try {
            const response = await fetch(`${url}/api/trabajadores`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setWorkers(data);
            } else {
                console.error('Error fetching workers data');
            }
        } catch (error) {
            console.error('Error fetching workers data:', error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/api/divisiones`, {
                method: 'GET',
            });
            console.log('Response:', response);
            if (response.ok) {
                const data = await response.json();
                console.log('Data fetched:', [data[0]]);
                setStructure([data[0]]);
                setIsDataSaved(true);
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
        };
    const handleSave = async () => {
        try {
            console.log('Guardando datos:', structure);
            const response = await fetch(`${url}/api/divisiones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(structure),
            });
            if (response.ok) {
                alert('Data saved successfully');
                setIsDataSaved(true);
            } else {
                alert('Error saving data');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
    const deleteStructure = async () => {
        try {
            console.log(structure[0]._id);
            const id = structure[0]._id;
            const response = await fetch(`${url}/api/divisiones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                console.log("eliminado", id);
                setIsDataSaved(false);
                setStructure([]);
            } else {
                console.error('Error al eliminar el campo:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
    const handleAddDivision = () => {
        const divisionName = prompt('Enter division name:');
        if (!divisionName) return;
        const newDivision = {
            name: divisionName,
            subdivisions: []
        };
        setStructure([...structure, newDivision]);
    };
    const handleAddSubdivision = (index) => {
        const subdivisionName = prompt('Enter subdivision name:');
        if (!subdivisionName) return;
        const updatedStructure = [...structure];
        const newSubdivision = { name: subdivisionName, subdivisions: [] };
        updatedStructure[index].subdivisions.push(newSubdivision);
        setStructure(updatedStructure);
    };
    const handleAddNestedSubdivision = (divisionIndex, subIndex) => {
        const subdivisionName = prompt('Enter subdivision name:');
        if (!subdivisionName) return;
        const updatedStructure = [...structure];
        const newSubdivision = { name: subdivisionName, subdivisions: [] };
        updatedStructure[divisionIndex].subdivisions[subIndex].subdivisions.push(newSubdivision);
        setStructure(updatedStructure);
    };
    // const handleAddWorker = () => {
    //     // Agregar validación de campos y lógica para agregar trabajador
    //     const newWorker = {
    //         firstName: workerFormData.firstName,
    //         lastName: workerFormData.lastName,
    //         division: workerFormData.division
    //     };
    //     setWorkers([...workers, newWorker]);
    //     setWorkerFormData({ firstName: '', lastName: '', division: '' });
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkerFormData({ ...workerFormData, [name]: value });
    };
    const renderDivisionOptions = (divisions) => {
        return divisions.map((division) => (
            <React.Fragment key={division._id}>
                <option value={division._id}>{division.name}</option>
                {division.subdivisions.length > 0 && renderDivisionOptions(division.subdivisions)}
            </React.Fragment>
        ));
    };
    const saveWorker = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${url}/api/trabajadores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(workerFormData),
            });
            if (response.ok) {
                alert('Data saved successfully');
                setWorkerFormData({ code: '', firstName: '', lastName: '', division: '' });
            } else {
                alert('Error saving data');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
    return (
        <div>
        <Navbar/>
        <h2>Organizational Structure</h2>
        {!isDataSaved && <button onClick={handleAddDivision}>Add Division</button>}
        <ul>
            {structure.map((division, index) => (
            <li key={index}>
                {division.name}
                {!isDataSaved && <button onClick={() => handleAddSubdivision(index)}>Add Subdivision</button>}
                <br /> <br /> 
                {division.subdivisions.length > 0 && (
                <ul>
                    {division.subdivisions.map((subdivision, subIndex) => (
                    <li key={subIndex} style={{marginLeft: '50px'}}>
                        {subdivision.name}
                        {!isDataSaved && <button onClick={() => handleAddNestedSubdivision(index, subIndex)}>Add Subdivision</button>}
                        <br /> <br /> 
                        {subdivision.subdivisions.length > 0 && (
                        <ul>
                            {subdivision.subdivisions.map((nestedSubdivision, nestedIndex) => (
                                <li key={nestedIndex} style={{marginLeft: '60px'}}>{nestedSubdivision.name}</li>
                            ))}
                            <br />
                        </ul>
                        )}
                    </li>
                    ))}
                </ul>
                )}
            </li>
            ))}
        </ul>
        {!isDataSaved && <button onClick={handleSave}>Save</button>}
        {isDataSaved && <button onClick={deleteStructure}>Delete</button>}
        {isDataSaved && (
                <>
                    <form onSubmit={handleAddWorker}>
                        <input
                            type="text"
                            name="code"
                            value={workerFormData.code}
                            placeholder="Code"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="firstName"
                            value={workerFormData.firstName}
                            placeholder="First Name"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={workerFormData.lastName}
                            placeholder="Last Name"
                            onChange={handleInputChange}
                        />
                        <select
                            name="division"
                            value={workerFormData.division}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Division</option>
                            {structure.map((division) => (
                                <React.Fragment key={division._id}>
                                    <option value={division._id}>{division.name}</option>
                                    {division.subdivisions.length > 0 && renderDivisionOptions(division.subdivisions)}
                                </React.Fragment>
                            ))}
                        </select>
                        <button type="submit" onClick={saveWorker}>Add Worker</button>
                    </form>
                </>
            )}
            <div>
            <h2>Workers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Division</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map((worker, index) => (
                        <tr key={index}>
                            <td>{worker.code}</td>
                            <td>{worker.firstName} {worker.lastName}</td>
                            <td>{worker.division}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
    };

export default OrganizationalStructureForm;
