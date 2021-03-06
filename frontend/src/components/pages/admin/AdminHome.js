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
    Show,
    SelectArrayInput,
    SimpleShowLayout,
    SimpleForm,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    BooleanInput,
    Toolbar,
    SaveButton,
    NullableBooleanInput,
    BulkDeleteWithConfirmButton,
    email,
    required
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {apiDataProvider } from "../../../utils/APIDataProvider";
import {authProvider} from "../../../utils/AuthProvider";
import {customRoutes} from "../../../utils/CustomRoutes";
import {TestActions} from "./TestActions";

const TestTitle = ({record}) => {
    return <span>{record ? `${record.title}` : ''}</span>;
};

const BulkDelete = props => (
    <>
        <BulkDeleteWithConfirmButton {...props}/>
    </>
);

export const TestList = props => (
    <List {...props} bulkActionButtons={<BulkDelete/>} actions={<TestActions/>}>
        <Datagrid rowClick="edit">
            <TextField sortable={false} source="title"/>
            <TextField sortable={false} source="lang"/>
        </Datagrid>
    </List>
);

export const TestEdit = props => (
    <Edit {...props} undoable={false} title={<TestTitle/>}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <TextInput source="title" validate={[required()]}/>
            <SelectInput source="lang" validate={[required()]} choices={[
                {id: 'pl', name: 'Polish'},
                {id: 'en', name: 'English'},
                {id: 'de', name: 'German'},
                {id: 'fr', name: 'French'},
                {id: 'ru', name: 'Russian'},
                {id: 'jp', name: 'Japanese'},
                {id: 'cn', name: 'Chinese'},
            ]}/>
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title" validate={[required()]}/>
                    <TextInput source="description" multiline label="Description"/>
                    <TextInput source="code" multiline label="Code"/>
                    <RadioButtonGroupInput source="type" label="Type" validate={[required()]} disabled choices={[
                        {id: 'O', name: 'Open'},
                        {id: 'W', name: 'Closed'},
                        {id: 'L', name: 'Numeric'}
                    ]}/>

                    <FormDataConsumer>
                        {({formData, scopedFormData, getSource, ...rest}) => scopedFormData && scopedFormData.type === 'W' ? (
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
            <SelectArrayInput label="Also create translated versions" source="targetLanguages" choices={[
                {id: 'pl', name: 'Polish'},
                {id: 'en', name: 'English'},
                {id: 'de', name: 'German'},
                {id: 'fr', name: 'French'},
                {id: 'ru', name: 'Russian'},
                {id: 'jp', name: 'Japanese'},
                {id: 'cn', name: 'Chinese'},
            ]} />
        </SimpleForm>
    </Edit>
);

export const TestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" validate={[required()]}/>
            <SelectInput source="lang" validate={[required()]} choices={[
                {id: 'pl', name: 'Polish'},
                {id: 'en', name: 'English'},
                {id: 'de', name: 'German'},
                {id: 'fr', name: 'French'},
                {id: 'ru', name: 'Russian'},
                {id: 'jp', name: 'Japanese'},
                {id: 'cn', name: 'Chinese'},
            ]}/>
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title" validate={[required()]}/>
                    <TextInput source="description" multiline label="Description"/>
                    <TextInput source="code" multiline label="Code"/>
                    <RadioButtonGroupInput source="type" label="Type" validate={[required()]} choices={[
                        {id: 'O', name: 'Open'},
                        {id: 'W', name: 'Closed'},
                        {id: 'L', name: 'Numeric'}
                    ]}/>

                    <FormDataConsumer>
                        {({formData, scopedFormData, getSource, ...rest}) => scopedFormData && scopedFormData.type === 'W' ? (
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
            <SelectArrayInput label="Also create translated versions" source="targetLanguages" choices={[
                {id: 'pl', name: 'Polish'},
                {id: 'en', name: 'English'},
                {id: 'de', name: 'German'},
                {id: 'fr', name: 'French'},
                {id: 'ru', name: 'Russian'},
                {id: 'jp', name: 'Japanese'},
                {id: 'cn', name: 'Chinese'},
            ]} />
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
            <TextInput source="email" validate={[validateEmail, required()]}/>
            <TextInput source="name" validate={[required()]}/>
            <TextInput source="surname" validate={[required()]}/>
        </SimpleForm>
    </Create>
);

export const CandidateShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="email"/>
            <TextField source="name"/>
            <TextField source="surname"/>
        </SimpleShowLayout>
    </Show>
);

export const CandidateList = props => (
    <List {...props} bulkActionButtons={<BulkDelete/>} exporter={false}>
        <Datagrid rowClick="show">
            <TextField sortable={false} source="name"/>
            <TextField sortable={false} source="surname"/>
            <EmailField sortable={false} source="email"/>
        </Datagrid>
    </List>
);
export const CandidateTestList = props => {
    const postRowClick = (id, basePath, record) => record.solved ? 'edit' : null;
    return (
        <List {...props} bulkActionButtons={<BulkDelete/>} exporter={false}>
            <Datagrid rowClick={postRowClick}>
                <ReferenceField sortable={false} source="candidateId" reference="candidates" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="title" sortable={false}/>
                <FunctionField label="Rating"
                               render={record => {
                                   if (!record.questions) return "Unknown result";
                                   const correctAnswers = record.questions.filter(e => e.correct);
                                   if (!record.solved) return "Not solved";
                                   if (record.questions.filter(e => e.correct === undefined).length !== 0) return "Waiting for rating";
                                   return `${correctAnswers.length}/${record.questions.length}`
                               }}/>
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
    selected: {
        backgroundColor: '#fff8d2'
    },
});
export const CandidateTestEdit = props => {
    const classes = useStyles();
    return (
        <Edit {...props} undoable={false} className={classes.input}>
            <SimpleForm toolbar={<TestRatingToolbar/>} >
                <ArrayInput source="questions" >
                    <SimpleFormIterator disableAdd disableRemove>
                        <TextInput disabled source="title" label="Title" />
                        <FormDataConsumer>
                            {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.description ?
                                (<TextInput disabled source={getSource("description")} label="Description"/>) : null}
                        </FormDataConsumer>
                        <FormDataConsumer>
                            {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.code ?
                                (<TextInput disabled source={getSource("code")} label="Code"/>) : null}
                        </FormDataConsumer>
                        <ArrayInput source="answers" label="Answers">
                            <SimpleFormIterator disableAdd disableRemove>
                                <FormDataConsumer>
                                    {({formData, scopedFormData, getSource, ...rest}) =>
                                        (<TextInput
                                            disabled
                                            source={getSource("content")}
                                            label={scopedFormData.selected ? "Selected" : (scopedFormData.selected ? "Not selected" : "Answer")}
                                            className={scopedFormData.selected ? classes.selected : null}

                                        />)}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({formData, scopedFormData, getSource, ...rest}) => scopedFormData.code ?
                                        (<TextInput disabled source={getSource("code")} label="Code"/>) : null}
                                </FormDataConsumer>
                            </SimpleFormIterator>
                        </ArrayInput>
                        <SelectInput label="Correct" source="correct" validate={[required()]} choices={[
                            { id: false, name: 'No' },
                            { id: true, name: 'Yes' },
                        ]} />
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
        <Admin dataProvider={apiDataProvider} authProvider={authProvider} customRoutes={customRoutes}>
            <Resource name="candidates" list={CandidateList} create={CandidateCreate} show={CandidateShow}/>
            <Resource name="tests" list={TestList} edit={TestEdit} create={TestCreate}/>
            <Resource name="candidatetests" options={{label: 'Candidate Tests'}} list={CandidateTestList}
                      edit={CandidateTestEdit} create={CandidateTestCreate}/>
        </Admin>
    )
}
