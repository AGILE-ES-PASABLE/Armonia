'use client';
import React, { useState, useEffect } from 'react';
import { url } from '@/utils/backend-route';
const OrganizationalStructureForm = () => {
    
    useEffect(() => {
        fetchData();
    }, []);

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
            } else {
                alert('Error saving data');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const [structure, setStructure] = useState([]);

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

    return (
        <div>
        <h2>Organizational Structure</h2>
        <button onClick={handleAddDivision}>Add Division</button>
        <ul>
            {structure.map((division, index) => (
            <li key={index}>
                {division.name}
                <button onClick={() => handleAddSubdivision(index)}>Add Subdivision</button>
                <br /> <br /> <br />
                {division.subdivisions.length > 0 && (
                <ul>
                    {division.subdivisions.map((subdivision, subIndex) => (
                    <li key={subIndex} style={{marginLeft: '50px'}}>
                        {subdivision.name}
                        <button onClick={() => handleAddNestedSubdivision(index, subIndex)}>Add Subdivision</button>
                        <br /> <br /> <br />
                        {subdivision.subdivisions.length > 0 && (
                        <ul>
                            {subdivision.subdivisions.map((nestedSubdivision, nestedIndex) => (
                                <li key={nestedIndex} style={{marginLeft: '100px'}}>{nestedSubdivision.name}</li>
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
        <button onClick={handleSave}>Save</button>
        </div>
    );
    };

export default OrganizationalStructureForm;
