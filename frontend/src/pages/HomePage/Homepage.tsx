import { useState, useRef, useReducer, useCallback } from "react";
import { Datepicker } from "../../components/DatePicker";
import { Input } from "../../ui/Input";
import { Modal } from 'tlouvet-react-modal';
import { Select } from "../../components/Select/Select"
import { departments, states } from '../../constants';
import { addEmployee } from "../../services/addEmployee";
import { Button } from "../../ui/Button";
import { EmployeeActionKind, employeeReducer } from "../../reducer";
import { initialState, init } from "../../reducer";
import { Fieldset } from "../../ui/Fieldset";

export const HomePage = () => {

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);
  const [user, dispatch] = useReducer(employeeReducer, initialState, init);

  const handleOpenModal = (newVal: boolean = false) => {
    setOpenModal(newVal);
    if (saveBtnRef.current) {
      saveBtnRef.current.focus();
    }
  }

  const handleDispatch = useCallback(function (action: EmployeeActionKind, payload: string) {
    dispatch({ type: action, payload });
  }, []);

  const handleNewEmployeeSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await addEmployee(user);
      setModalMessage(message);
    } catch (e) {
      console.error(e);
      setModalMessage('An Error has occured');
    }
    handleOpenModal(true)
  };

  return (
    <>
      <h1>Create Employee</h1>
      <form onSubmit={handleNewEmployeeSave}>
        <Input type="text" label="First Name" value={user.firstname} onChange={handleDispatch} action={EmployeeActionKind.FIRSTNAME} />
        <Input type="text" label="Last Name" value={user.lastname} onChange={handleDispatch} action={EmployeeActionKind.LASTNAME} />
        <Datepicker label="Date of Birth" onChange={handleDispatch} action={EmployeeActionKind.BIRTH} />
        <Datepicker label="Start Date" onChange={handleDispatch} action={EmployeeActionKind.START} />
        <Fieldset>
          <legend>Address</legend>
          <Input type='text' label="Street" value={user.street} onChange={handleDispatch} action={EmployeeActionKind.STREET} />
          <Input type='text' label="City" value={user.city} onChange={handleDispatch} action={EmployeeActionKind.CITY} />
          <Select
            label='State'
            values={states.map(st => st.abbreviation)}
            options={states.map(st => st.name)}
            onChange={handleDispatch}
            action={EmployeeActionKind.STATE}
          />
          <Input type='number' label="Zip Code" value={user.zipCode} onChange={handleDispatch} action={EmployeeActionKind.ZIPCODE} />
        </Fieldset>

        <Select
          label='Department'
          values={departments.map(dp => dp.abbreviation)}
          options={departments.map(dp => dp.name)}
          action={EmployeeActionKind.DEPARTMENT}
          onChange={handleDispatch}
        />
        <Button type="button" content="Save" align="end" onClick={handleNewEmployeeSave} />
      </form>

      <Modal open={openModal} onClose={handleOpenModal} wrapperStyle={{ backgroundColor: 'black', color: 'white' }}>
        <p>{modalMessage}</p>
      </Modal>
    </>
  )
}