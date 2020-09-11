/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import { Header, Message } from './styles';
import Accordion from '../../components/Accordion';
import ActionsButtons from './actionsButtons';
import CreateTaskButton from './createTaskButton';
import Loader from '../../components/Loader';
import api from '../../services/apiClient';

interface TaskModel {
  id: string;
  created_at: Date | string;
  description: string;
  finished_at: Date | string;
  responsible: string;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('@GoBarber:token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getTasks = async () => {
    try {
      const response = await api.get('tasks', config);

      if (response.data.length === 0) {
        setMessage('nenhuma tarefa registrada');
      }

      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setTasks([]);
      setLoading(false);
      setMessage('Erro na conexão! Tente novamente em minutos.');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getTasks();
    }, 2000);
  }, []);
  return (
    <>
      <Header>
        <h2>My Tasks</h2>
        <ActionsButtons />
      </Header>
      <CreateTaskButton />
      {loading ? <Loader /> : message ? <Message>{message}</Message> : null}
      {tasks.map((task: TaskModel) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(task.created_at); // 2020-12-31T03:00:00.000Z
        // const finishedDate = new Date(task.finished_at); // 2020-12-31T03:00:00.000Z
        return (
          <Accordion
            responsible={task.responsible}
            key={task.id}
            created_at={`${date.toLocaleDateString('pt-br', options)}, às ${
              date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            }:${date.getMinutes()}`}
            description={task.description}
            status={task.finished_at === null ? 'Aberta' : 'Finalizada'}
          />
        );
      })}
    </>
  );
};

export default Dashboard;
