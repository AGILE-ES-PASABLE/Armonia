'use client'
import React, { useState, useEffect } from 'react';
import { url } from '@/utils/backend-route';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
const copyToClipboard = (text) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
};      
const SurveyForm = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [selectedDimension, setSelectedDimension] = useState('');
    const [isDataSaved, setIsDataSaved] = useState(false);
    const [survey, setSurvey] = useState([]);
    const dimensions = [
        'Ambiente de trabajo',
        'Relaciones interpersonales',
        'Comunicación interna',
        'Reconocimiento laboral',
        'Desarrollo profesional',
    ];
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/api/preguntas`, {
                method: 'GET',
            });
            console.log('Response:', response);
            if (response.ok) {
                const data = await response.json();
                console.log('Data fetched:', [data[0].survey]);
                setIsDataSaved(true);
                setSurvey(data[0].survey);
                localStorage.setItem('survey', JSON.stringify(data[0].survey));
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
        };
    const handleQuestionChange = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleDimensionChange = (e) => {
        setSelectedDimension(e.target.value);
    };

    const handleAddQuestion = () => {
        if (newQuestion.trim() !== '' && selectedDimension !== '') {
            const question = `${selectedDimension}: ${newQuestion.trim()}`;
            setQuestions([...questions, question]);
            setNewQuestion('');
            setSelectedDimension('');
        }
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        try {
            const formattedQuestions = questions.map((question) => {
                const [dimension, pregunta] = question.split(':').map((item) => item.trim());
                return { dimension, question: pregunta };
            });
            
            console.log('formattedQuestions', formattedQuestions)
            const response = await fetch(`${url}/api/preguntas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ survey: formattedQuestions }), // Enviamos las preguntas al servidor
            });
            
            if (response.ok) {
                console.log('Preguntas guardadas exitosamente');
                setQuestions([]); // Limpiamos las preguntas después de guardarlas
            } else {
                console.error('Error al guardar las preguntas:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
    

    const groupedQuestions = dimensions.map((dimension) => {
        const dimensionQuestions = questions.filter((question) =>
            question.startsWith(`${dimension}:`)
        );
        return { dimension, questions: dimensionQuestions };
    });

    const handleButtonClick = () => {
        const link = `${url}/answer_survey`; // Aquí debes colocar la ruta correcta
        copyToClipboard(link);
        alert('The link was copied');
    };

    return (
        <div>
            <Navbar/>
            {!isDataSaved && <h1>Survey Form</h1> }
            {!isDataSaved && <div>
                <select value={selectedDimension} onChange={handleDimensionChange}>
                    <option value="">Selecciona una dimensión</option>
                    {dimensions.map((dimension, index) => (
                        <option key={index} value={dimension}>
                            {dimension}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Escribe tu pregunta"
                    value={newQuestion}
                    onChange={handleQuestionChange}
                />
                <button onClick={handleAddQuestion}>Agregar Pregunta</button>
            </div> }
            {!isDataSaved && <div>
                {groupedQuestions.map((group, index) => (
                    <div key={index}>
                        <h2>{group.dimension}</h2>
                        {group.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <p>{question}</p>
                                <button onClick={() => handleRemoveQuestion(index)}>Eliminar</button>
                            </div>
                        ))}
                        <br /><br />
                    </div>
                ))}
                
            </div>}
            {!isDataSaved && <button onClick={handleSubmit}>Guardar Preguntas</button>}
            {isDataSaved && <h1>Working Environment Survey</h1>}
            {isDataSaved && (
                <table>
                    <thead>
                        <tr>
                            <th>Dimension</th>
                            <th>Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(survey) && survey.map((question, index) => (
                            <tr key={index}>
                                <td>{question.dimension}</td>
                                <td>{question.question}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={handleButtonClick}>Copy Link</button>
        </div>
    );
};

export default SurveyForm;
