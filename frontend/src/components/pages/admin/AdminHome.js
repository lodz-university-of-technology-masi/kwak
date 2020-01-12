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
    BooleanInput,
    Toolbar,
    SaveButton,
    email,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {dataProviderCSV} from "../../../utils/APIDataProvider";
import {authProvider} from "../../../utils/AuthProvider";
import {customRoutes} from "../../../utils/CustomRoutes";
import {TestActions} from "./TestActions";

const TestTitle = ({record}) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

export const TestList = props => (
    <List {...props} actions={<TestActions/>}>
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
                        {id: 'W', name: 'Closed'},
                        {id: 'L', name: 'Numeric'}
                    ]}/>

                    <FormDataConsumer>
                        {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.type === 'W' ? (
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
                        {id: 'W', name: 'Closed'},
                        {id: 'L', name: 'Numeric'}
                    ]}/>

                    <FormDataConsumer>
                        {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.type === 'W' ? (
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
            <TextInput source="surname"/>
        </SimpleForm>
    </Create>
);

export const CandidateList = props => (
    <List {...props} exporter={false}>
        <Datagrid rowClick="edit">
            <TextField sortable={false} source="name"/>
            <TextField sortable={false} source="surname"/>
            <EmailField sortable={false} source="email"/>
        </Datagrid>
    </List>
);
export const CandidateTestList = props => {
    const postRowClick = (id, basePath, record) => record.solved ? 'edit' : null;
    return (
        <List {...props} exporter={false}>
            <Datagrid rowClick={postRowClick}>
                <ReferenceField sortable={false} source="candidateId" reference="candidates">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="title" sortable={false}/>
                <FunctionField label="Need rating"
                               render={record => `${record.solved === true && record.questions.filter(e => e.correct === null).length !== 0 ? "Yes" : "No"}`}/>
                <FunctionField label="Rated"
                               render={record => `${record.solved === true && record.questions.filter(e => e.correct === null).length === 0 ? "Yes" : "No"}`}/>
            </Datagrid>
        </List>)
};

const TestRatingToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);
const useStyles = makeStyles({
    input: {
        '& .MuiInputBase-input': { color: 'black' }
    },
});
export const CandidateTestEdit = props => {
    const classes = useStyles();
    return (
        <Edit {...props} className={classes.input}>
            <SimpleForm toolbar={<TestRatingToolbar/>} >
                <ArrayInput source="questions" >
                    <SimpleFormIterator disableAdd disableRemove>
                        <TextInput disabled source="title" label="Title" />
                        <FormDataConsumer>
                            {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.description !== null ?
                                (<TextInput disabled source={getSource("description")} label="Description"/>) : null}
                        </FormDataConsumer>
                        <FormDataConsumer>
                            {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.code !== null ?
                                (<TextInput disabled source={getSource("code")} label="Code"/>) : null}
                        </FormDataConsumer>
                        <ArrayInput source="answers" label="Answers">
                            <SimpleFormIterator disableAdd disableRemove>
                                <TextInput disabled source="content" label="Answer"/>
                                <FormDataConsumer>
                                    {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.code !== null ?
                                        (<TextInput disabled source={getSource("code")} label="Code"/>) : null}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.selected !== null ?
                                        (<TextInput disabled label={"Selected"}
                                                    source={getSource("selected")}/>) : null}
                                </FormDataConsumer>
                            </SimpleFormIterator>
                        </ArrayInput>
                        <FormDataConsumer>
                            {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.correct === null ?
                                scopedFormData.correct = false : null}
                        </FormDataConsumer>
                        <BooleanInput label="Correct" source="correct" defaultValue={false}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>);
};

const CandidateTestCreateToolbar = props => (
    <Toolbar {...props} >
        <SaveButton redirect="list"/>
    </Toolbar>
);

export const CandidateTestCreate = props => (
    <Create {...props}>
        <SimpleForm toolbar={<CandidateTestCreateToolbar/>}>
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
        <Admin dataProvider={dataProviderCSV} authProvider={authProvider} customRoutes={customRoutes}>
            <Resource name="tests" list={TestList} edit={TestEdit} create={TestCreate}/>
            <Resource name="candidates" list={CandidateList} create={CandidateCreate}/>
            <Resource name="candidatetests" options={{label: 'Candidate Tests'}} list={CandidateTestList}
                      edit={CandidateTestEdit} create={CandidateTestCreate}/>
        </Admin>
    )
}
