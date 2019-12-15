import React from 'react';
import {
    Admin, Resource, List, Datagrid,
    TextField, EmailField, SelectInput, TextInput, RadioButtonGroupInput, ReferenceField, ReferenceInput,
    Edit, Create, SimpleForm, ArrayInput, SimpleFormIterator, FormDataConsumer
} from 'react-admin';

import {dataProvider} from "../../../utils/APIDataProvider";
import {authProvider} from "../../../utils/AuthProvider";

const TestTitle = ({record}) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

export const TestList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="title"/>
            <TextField source="lang"/>
        </Datagrid>
    </List>
);

export const TestEdit = props => (
    <Edit {...props} title={<TestTitle/>}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="title"/>
            <SelectInput source="lang" choices={[
                {id: 'PL', name: 'Polish'},
                {id: 'EN', name: 'English'},
            ]}/>
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title"/>
                    <TextInput source="description" multiline label="Description"/>
                    <TextInput source="code" multiline label="Code"/>
                    <RadioButtonGroupInput source="type" label="Type" disabled choices={[
                        {id: 'O', name: 'Open'},
                        {id: 'Z', name: 'Closed'},
                        {id: 'L', name: 'Numeric'}
                    ]}/>

                    <FormDataConsumer>
                        {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.type === 'Z' ? (
                            <ArrayInput source={getSource('answers')} label="Answers">
                                <SimpleFormIterator>
                                    <TextInput source="content" multiline label="Content"/>
                                    <TextInput source="code" multiline label="Code"/>
                                </SimpleFormIterator>
                            </ArrayInput>
                        ) : null
                        }
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const TestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <SelectInput source="lang" choices={[
                {id: 'PL', name: 'Polish'},
                {id: 'EN', name: 'English'},
            ]}/>
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title"/>
                    <TextInput source="description" multiline label="Description"/>
                    <TextInput source="code" multiline label="Code"/>
                    <RadioButtonGroupInput source="type" label="Type" choices={[
                        {id: 'O', name: 'Open'},
                        {id: 'Z', name: 'Closed'},
                        {id: 'L', name: 'Numeric'}
                    ]}/>

                    <FormDataConsumer>
                        {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.type === 'Z' ? (
                            <ArrayInput source={getSource('answers')} label="Answers">
                                <SimpleFormIterator>
                                    <TextInput source="content" multiline label="Content"/>
                                    <TextInput source="code" multiline label="Code"/>
                                </SimpleFormIterator>
                            </ArrayInput>
                        ) : null
                        }
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

const CandidateTitle = ({record}) => {
    return <span>{record ? `${record.name} ${record.surname}` : ''}</span>;
};

export const CandidateList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name"/>
            <TextField source="surname"/>
            <TextField source="login"/>
            <EmailField source="email"/>
        </Datagrid>
    </List>
);

export const CandidateEdit = props => (
    <Edit {...props} title={<CandidateTitle/>}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput disabled source="login"/>
            <TextInput disabled source="email"/>
            <TextInput source="name"/>
            <TextInput source="surname"/>
        </SimpleForm>
    </Edit>
);

export const CandidateTestList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="candidateId" reference="candidates">
                <TextField source="login"/>
            </ReferenceField>
            <ReferenceField source="testId" reference="tests">
                <TextField source="title"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

export const CandidateTestEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="candidateId" reference="candidates">
                <SelectInput optionText="login"/>
            </ReferenceInput>
            <ReferenceInput source="testId" reference="tests">
                <SelectInput optionText="title"/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const CandidateTestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="candidateId" reference="candidates">
                <SelectInput optionText="login"/>
            </ReferenceInput>
            <ReferenceInput source="testId" reference="tests">
                <SelectInput optionText="title"/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default function AdminHome(props) {
    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="tests" list={TestList} edit={TestEdit} create={TestCreate}/>
            <Resource name="candidates" list={CandidateList} edit={CandidateEdit}/>
            <Resource name="candidatetests" options={{label: 'Candidate Tests'}} list={CandidateTestList}
                      edit={CandidateTestEdit} create={CandidateTestCreate}/>
        </Admin>
    )
}