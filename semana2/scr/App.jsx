import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { FormProvider } from './components/FormContext';
import RegistrationForm from './components/RegistrationForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import FormWithContext from './components/FormWithContext';
import Counter from './Counter';

const App = () => {
  return (
    <ThemeProvider>
      <FormProvider>
        <h1>Formulário de Registro</h1>
        <RegistrationForm />
        <ThemeToggle />
        <h2>Lista de Tarefas</h2>
        <TaskList />
        <h2>Formulário com Contexto</h2>
        <FormWithContext />
        <h2>Contador</h2>
        <Counter />
      </FormProvider>
    </ThemeProvider>
  );
};

export default App;
