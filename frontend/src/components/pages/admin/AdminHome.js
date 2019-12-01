import React from 'react';
import {
    Admin, Resource, List, Datagrid,
    TextField, EmailField, SelectInput, TextInput, RadioButtonGroupInput,
    Edit, Create, SimpleForm, ArrayInput, SimpleFormIterator
} from 'react-admin';

import {dataProvider} from "../../../utils/APIDataProvider";

const TestTitle = ({ record }) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

export const TestList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="lang" />
        </Datagrid>
    </List>
);

export const TestEdit = props => (
    <Edit {...props} title={<TestTitle/>}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <SelectInput source="lang" choices={[
                { id: 'PL', name: 'Polish' },
                { id: 'EN', name: 'English' },
            ]} />
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title" />
                    <TextInput source="description" multiline label="Description" />
                    <TextInput source="code" multiline label="Code" />
                    <RadioButtonGroupInput source="type" label="Type" choices={[
                        { id: 'O', name: 'Open' },
                        { id: 'Z', name: 'Closed' },
                        { id: 'L', name: 'Numeric' }
                    ]} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const TestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <SelectInput source="lang" choices={[
                { id: 'PL', name: 'Polish' },
                { id: 'EN', name: 'English' },
            ]} />
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title" />
                    <TextInput source="description" multiline label="Description" />
                    <TextInput source="code" multiline label="Code" />
                    <RadioButtonGroupInput source="type" label="Type" choices={[
                        { id: 'O', name: 'Open' },
                        { id: 'Z', name: 'Closed' },
                        { id: 'L', name: 'Numeric' }
                    ]} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

const CandidateTitle = ({ record }) => {
    return <span>{record ? `${record.name} ${record.surname}` : ''}</span>;
};

export const CandidateList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="surname" />
            <TextField source="login" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);

export const CandidateEdit = props => (
    <Edit {...props} title={<CandidateTitle/>}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source="login" />
            <TextInput disabled source="email" />
            <TextInput source="name" />
            <TextInput source="surname" />
        </SimpleForm>
    </Edit>
);

export default function AdminHome(props) {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="tests" list={TestList} edit={TestEdit} create={TestCreate}/>
            <Resource name="candidates" list={CandidateList} edit={CandidateEdit} />
        </Admin>
    )
}