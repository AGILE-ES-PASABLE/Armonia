'use client'
import React, { useState, useEffect } from 'react';
import { url } from '@/utils/backend-route';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const Reportes = () => {
    const [survey, setSurvey] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [workers, setWorkers] = useState([]);
    const dimensions = [
        'Ambiente de trabajo',
        'Relaciones interpersonales',
        'Comunicación interna',
        'Reconocimiento laboral',
        'Desarrollo profesional',
    ];
    useEffect(() => {
        fetchSurvey();
        fetchAnswers();
        fetchWorkers();
    }, []);
    
    const fetchSurvey = async () => {
        try {
            const response = await fetch(`${url}/api/preguntas`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setSurvey(data[0].survey);
            } else {
                console.error('Error al obtener las encuestas');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const fetchAnswers = async () => {
        try {
            const response = await fetch(`${url}/api/respuestas`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setAnswers(data);
            } else {
                console.error('Error al obtener las respuestas');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const fetchWorkers = async () => {
        try {
            const response = await fetch(`${url}/api/trabajadores`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setWorkers(data);
            } else {
                console.error('Error al obtener los trabajadores');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const mergeSurveyAnswers = () => {
        const mergedData = [];
        answers.forEach(answerItem => {
            const code = answerItem.code;
            const surveyAnswers = {
                code: code,
                measure: []
            };
            survey.forEach((questionItem, index) => {
                const dimension = questionItem.dimension;
                const question = questionItem.question;
                const answer = answerItem.answers[index];
                surveyAnswers.measure.push({
                    dimension: dimension,
                    question: question,
                    answer: answer
                });
            });
            mergedData.push(surveyAnswers);
        });
        console.log("mergedData", mergedData)
        return mergedData;
    };
    const combinedData = mergeSurveyAnswers();
    const calculateTopTwoBox = (data) => {
        const topTwoBoxCounts = {};
    
        // Inicializar los recuentos de Top Two Box por dimensión
        dimensions.forEach(dimension => {
            topTwoBoxCounts[dimension] = 0;
        });
    
        // Iterar sobre los datos combinados
        data.forEach(entry => {
            // Iterar sobre las respuestas en cada medida
            entry.measure.forEach(item => {
                const dimension = item.dimension;
                const answer = parseInt(item.answer);
                // Incrementar el contador de Top Two Box si la respuesta es 4 o 5
                if (answer === 4 || answer === 5) {
                    topTwoBoxCounts[dimension]++;
                }
            });
        });
    
        // Calcular el porcentaje de Top Two Box para cada dimensión
        const percentages = {};
        Object.keys(topTwoBoxCounts).forEach(dimension => {
            const totalCount = data.length;
            const topTwoBoxCount = topTwoBoxCounts[dimension];
            percentages[dimension] = ((topTwoBoxCount / totalCount) * 100).toFixed(2) + '%';
        });
        
    
        return percentages;
    };
    const topTwoBoxPercentages = calculateTopTwoBox(combinedData);

    const calculoGeneral = (data) => {
        const topTwoBoxCounts = {};
    
        // Inicializar los recuentos de Top Two Box por dimensión
        dimensions.forEach(dimension => {
            topTwoBoxCounts[dimension] = 0;
        });
    
        // Iterar sobre los datos combinados
        data.forEach(entry => {
            // Iterar sobre las respuestas en cada medida
            entry.measure.forEach(item => {
                const dimension = item.dimension;
                const answer = parseInt(item.answer);
                // Incrementar el contador de Top Two Box si la respuesta es 4 o 5
                if (answer === 4 || answer === 5) {
                    topTwoBoxCounts[dimension]++;
                }
            });
        });

        // Calcular el Top Two Box general
        let totalTopTwoBox = 0;
        Object.values(topTwoBoxCounts).forEach(count => {
            totalTopTwoBox += count;
        });
        const totalPercentage = ((totalTopTwoBox / (dimensions.length * data.length)) * 100).toFixed(2) + '%';
        return totalPercentage;
    }
    const calculateGeneral = calculoGeneral(combinedData);
    return (
        <div>
            <Navbar />
            <h1>Reports</h1>
            <br /><br />
            <h2></h2>
            <h2>{calculateGeneral}</h2>
            <small>General</small>
            <br />
            <br />
            <p>Answer rate: {((answers.length / workers.length)*100).toFixed(0)} %</p>
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Dimension</th>
                        <th>Porcentaje</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(topTwoBoxPercentages).map((dimension, index) => (
                        <tr key={index}>
                            <td>{dimension}</td>
                            <td>{topTwoBoxPercentages[dimension]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reportes;
