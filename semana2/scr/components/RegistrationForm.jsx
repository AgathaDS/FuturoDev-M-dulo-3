import React from 'react';
import { useForm } from 'react-hook-form';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [confirmationMessage, setConfirmationMessage] = React.useState('');

  const onSubmit = (data) => {
    setConfirmationMessage('Registro realizado com sucesso!');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome:</label>
        <input {...register('name', { required: true })} />
        {errors.name && <span>Nome é obrigatório</span>}
      </div>
      <div>
        <label>E-mail:</label>
        <input {...register('email', { required: true })} />
        {errors.email && <span>E-mail é obrigatório</span>}
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" {...register('password', { required: true })} />
        {errors.password && <span>Senha é obrigatória</span>}
      </div>
      <button type="submit">Registrar</button>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
