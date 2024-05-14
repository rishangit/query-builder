import type { Field, RuleType } from 'react-querybuilder';
import { defaultOperators, toFullOption } from 'react-querybuilder';

export const validator = (r: RuleType) => !!r.value;

export const fields1: Field[] = (
  [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter first name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter last name',
      defaultOperator: 'beginsWith',
    },
    { name: 'age', label: 'Age', inputType: 'number' },
    {
      name: 'gender',
      label: 'Gender',
      operators: defaultOperators.filter((op) => op.name === '='),
      valueEditorType: 'select',
      values: [
        { name: 'M', label: 'Male' },
        { name: 'F', label: 'Female' },
        { name: 'O', label: 'Other' },
      ],
    },
    { name: 'height', label: 'Height' },
    { name: 'job', label: 'Job' },
    { name: 'description', label: 'Description', valueEditorType: 'textarea' },
    { name: 'birthdate', label: 'Birth Date', inputType: 'date' },
    { name: 'datetime', label: 'Show Time', inputType: 'datetime-local' },
    { name: 'alarm', label: 'Daily Alarm', inputType: 'time' },
    {
      name: 'FILECOUNT',
      label: 'FILECOUNT',
      inputType: 'number',
      subValues: [
        { name: 'COFC', label: 'COFC_label' },
        { name: 'FORMONE', label: 'FORM ONE' },
        { name: 'FORMtwo', label: 'FORM two' },
      ],
    },
    {
      name: 'DoCCount',
      label: 'DoCCount',
      inputType: 'number',
      subValues: [
        { name: 'officeDoc', label: 'office doc' },
        { name: 'personalDoc', label: 'personal doc' },
      ],
    },
    {
      name: 'DoCCount1',
      label: 'DoCCount1',
      inputType: 'number',
      subValues: [
        { name: 'officeDoc1', label: 'office doc1' },
        { name: 'personalDoc2', label: 'personal doc1' },
      ],
    },
  ] satisfies Field[]
).map(toFullOption);