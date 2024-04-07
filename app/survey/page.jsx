'use client'
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
const SurveyForm = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');

    const handleQuestionChange = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleAddQuestion = () => {
        if (newQuestion.trim() !== '') {
            setQuestions([...questions, newQuestion.trim()]);
            setNewQuestion('');
        }
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        // Aquí puedes enviar las preguntas a tu backend para procesarlas
        console.log('Preguntas:', questions);
    };

    return (
        <div>
            <Navbar/>
            <h1>Formulario para Crear Cuestionario</h1>
            <div>
                <input
                    type="text"
                    placeholder="Escribe tu pregunta"
                    value={newQuestion}
                    onChange={handleQuestionChange}
                />
                <button onClick={handleAddQuestion}>Agregar Pregunta</button>
            </div>
            <div>
                {questions.map((question, index) => (
                    <div key={index}>
                        <p>{question}</p>
                        <button onClick={() => handleRemoveQuestion(index)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Guardar Preguntas</button>
        </div>
    );
};

export default SurveyForm;
