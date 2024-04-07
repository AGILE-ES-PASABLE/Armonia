'use client'
import React, { useState, useEffect } from 'react';
import { url } from '@/utils/backend-route';
const Questions = () => {
    const [answers, setAnswers] = useState([]);
    const [survey, setSurvey] = useState([]);
    const [code, setCode] = useState('');
    const [workers, setWorkers] = useState([]);
    const [codeAnswered, setCodeAnswered] = useState(null);
    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    useEffect(() => {
        fetchData();
        fetchWorkers();
        fetchAnswers();
    }, []);

    const fetchData = async () => {
        setSurvey(JSON.parse(localStorage.getItem('survey')));
    }
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
    const fetchAnswers = async () => {
        try {
            const response = await fetch(`${url}/api/respuestas`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Respuestas:', data);
                const newCodeAnswered = data.map(item => item.code);
                setCodeAnswered(newCodeAnswered);
            } else {
                console.error('Error fetching answers data');
            }
        } catch (error) {
            console.error('Error fetching answers data:', error);
        }
    };


    const handleSubmit = async () => {
        // Verificar que todas las respuestas estén seleccionadas
        for (let i = 0; i < answers.length; i++) {
            if (!answers[i]) {
                alert('Por favor, completa todas las respuestas.');
                return;
            }
        }

        // Verificar si el campo del código está lleno
        if (code.trim() === '') {
            alert('Por favor, completa el campo del código.');
            return;
        }

        // Verificar si el código ya ha respondido la encuesta
        if (codeAnswered.includes(code.trim())) {
            alert('El trabajador con este código ya ha respondido la encuesta.');
            return;
        }

        let codeExists = false;
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].code === code) {
                codeExists = true;
                break;
            }
        }
        if (!codeExists) {
            alert('No existe ningún trabajador con ese código.');
            return;
        }

        try {
            const response = await fetch(`${url}/api/respuestas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, answers }),
            });
            if (response.ok) {
                console.log('Respuestas guardadas exitosamente');
                setCode('');
                setAnswers([]);
                // Lógica adicional después de guardar las respuestas
            } else {
                console.error('Error al guardar las respuestas:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    return (
        <div>
            <h1>Cuestionario Clima Laboral</h1>
            <p>Code</p>
            <input
                type="text"
                placeholder="Escribe tu código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(survey) && survey.map((question, index) => (
                        <tr key={index}>
                            <td>{question.question}</td>
                            <td>
                                <select value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)}>
                                    <option value="">Selecciona una respuesta</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit}>Enviar Respuestas</button>
        </div>
    );
};

export default Questions;
