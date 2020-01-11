import React from 'react';
import {
    Admin,
    Resource,
    List,
    Datagrid,
    FunctionField,
    TextField,
    EmailField,
    SelectInput,
    TextInput,
    RadioButtonGroupInput,
    ReferenceField,
    ReferenceInput,
    Edit,
    Create,
    SimpleForm,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    EditButton,
    NullableBooleanInput,
    Toolbar,
    SaveButton,
    email,
    BooleanInput
} from 'react-admin';

import {dataProvider} from "../../../utils/APIDataProvider";
import {authProvider} from "../../../utils/AuthProvider";

const TestTitle = ({record}) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

export const TestList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField sortable={false} source="title"/>
            <TextField sortable={false} source="lang"/>
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

const validateEmail = email();
export const CandidateCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="email" validate={validateEmail}/>
            <TextInput source="name"/>
            <TextInput source="surname" />
        </SimpleForm>
    </Create>
);

export const CandidateList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField sortable={false} source="name"/>
            <TextField sortable={false} source="surname"/>
            <EmailField sortable={false} source="email"/>
        </Datagrid>
    </List>
);
export const CandidateTestList = props => (
    <List {...props}>
        <Datagrid>
            <ReferenceField sortable={false} source="candidateId" reference="candidates">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="title"/>
            <FunctionField label="Need rating"
                           render={record => `${record.solved === true && record.questions.filter(e => e.correct === null).length !== 0 ? "Yes": "No"}`}/>
            <EditButton label="Rate"/>
        </Datagrid>
    </List>
);

const TestRatingToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);

export const CandidateTestEdit = props => (
    <Edit {...props}>
        <SimpleForm toolbar={<TestRatingToolbar/>}>
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput disabled source="title" label="Title"/>
                    <FormDataConsumer>
                        {({scopedFormData}) => scopedFormData.description ?
                            (<TextInput disabled source="description" label="Description"/>) : null}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData}) => scopedFormData.code ?
                            (<TextInput disabled source="code" label="Code"/>) : null}
                    </FormDataConsumer>
                    <ArrayInput source="answers" label="Answers">
                        <SimpleFormIterator>
                            <TextInput disabled source="content" label="Answer"/>
                            <FormDataConsumer>
                                {({scopedFormData}) => scopedFormData.code ?
                                    (<TextInput disabled source="code" label="Code"/>) : null}
                            </FormDataConsumer>
                            <FormDataConsumer>
                                {({scopedFormData}) => scopedFormData.selected ?
                                    (<TextInput disabled label="Selected" source="selected"/>) : null}
                            </FormDataConsumer>
                        </SimpleFormIterator>
                    </ArrayInput>
                    <NullableBooleanInput label="Correct" source="correct"/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const CandidateTestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="candidateId" reference="candidates">
                <SelectInput optionText="name"/>
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
            <Resource name="candidates" list={CandidateList} create={CandidateCreate}/>
            <Resource name="candidatetests" options={{label: 'Candidate Tests'}} list={CandidateTestList}
                      edit={CandidateTestEdit} create={CandidateTestCreate}/>
        </Admin>
    )
}
