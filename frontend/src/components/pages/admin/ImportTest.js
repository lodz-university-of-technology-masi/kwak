import React from "react";
import { SimpleForm, FileInput, FileField, Create, TextInput} from "react-admin";

export const ImportTest = ({staticContext, ...rest}) => (
    <Create basePath="/tests" resource="tests" {...rest}>
        <SimpleForm>
            <TextInput source="title" label="Test title"/>
            <FileInput source="file" label="Test CSV file" accept="text/csv">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);