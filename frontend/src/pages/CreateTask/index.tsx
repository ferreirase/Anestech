import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FiClipboard, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import ActionsButtons from './actionsButtons';
import { Header, AnimationContainer } from './styles';
import api from '../../services/apiClient';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import Button from '../../components/Button';

interface SignInFormData {
  description: string;
  responsible: string;
}

const CreateTask: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const token = localStorage.getItem('@GoBarber:token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição obrigatória'),
        responsible: Yup.string().required('Responsável obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false, // retorna todos os erros de uma vez só
      });

      await api.post(
        '/tasks',
        {
          description: data.description,
          responsible: data.responsible,
        },
        config,
      );

      history.push('/dashboard');

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Tarefa cadastrada com sucesso!',
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login. Cheque as credenciais.',
      });
    }
  }, []);

  return (
    <>
      <Header>
        <h2>My Tasks</h2>
        <ActionsButtons />
      </Header>
      <AnimationContainer>
        <Form ref={formRef} autoComplete="off" onSubmit={handleSubmit}>
          <h1>Criar nova tarefa</h1>

          <Input
            icon={FiClipboard}
            name="description"
            placeholder="Descrição"
          />

          <Input icon={FiUser} name="responsible" placeholder="Responsável" />

          <Button style={{ position: 'relative', top: '20px' }} type="submit">
            Criar
          </Button>
        </Form>
      </AnimationContainer>
    </>
  );
};

export default CreateTask;
