import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import './createTodoForm.scss'

interface CreateTodoFormProps {
    title: string,
    onSubmit: (values: string) => void
}

const nameSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
});

const CreateTodoForm: FC<CreateTodoFormProps> = ({ title, onSubmit }) => {
    return (
        <div className="create-form">
            <h1 className='create-form__title'>{title}</h1>
            <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={nameSchema}
                onSubmit={values => {
                    onSubmit(values.name);
                }}
            >
                <Form>
                    <Field className='create-form__input' id="name" name="name" placeholder="Name..." />
                    <ErrorMessage className='create-form__error' component={'div'} name='name' />
                    <button className='create-form__btn' type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateTodoForm;