import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../context/CyclesContext';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useContext } from 'react';

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor='task'>vou trabalhar em </label>
      <TaskInput
        id='task'
        list='task-sugestion'
        placeholder='Dê um nome para o seu projeto'
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id='task-sugestion'>
        <option value='Projeto 1' />
        <option value='Projeto 2' />
        <option value='Projeto 3' />
        <option value='Projeto 4' />
        <option value='Projeto 5' />
      </datalist>

      <label htmlFor='minutesAmount'>durante</label>
      <MinutesAmountInput
        type='number'
        id='minutesAmount'
        placeholder='00'
        step={5}
        disabled={!!activeCycle}
        // min={5}
        // max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
