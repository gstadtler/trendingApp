import { Formik, Form, Field, FieldArray } from "formik";

const CustomFieldArray = ({ initialValues }) => {
  console.log("init values", initialValues);
  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        // validateOnChange={false}
        // validateOnBlur={false}
        // validateOnMount
      >
        {(formik) => {
          console.log("Formik props", formik);
          return (
            <Form>
              <div className="form-control">
                <label htmlFor="title">título</label>
                <Field type="text" id="title" name="title" />
              </div>

              <div className="form-control">
                <label htmlFor="questions">perguntas</label>
                <FieldArray name="questions">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { questions } = values;
                    // console.log('fieldArrayProps', fieldArrayProps)
                    // console.log('Form errors', form.errors)
                    return (
                      <div>
                        {questions.map((question, index) => (
                          <div key={index}>
                            <Field name={`questions[${index}].${question}`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => push("")}>
                          +
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <div className="form-control">
                <label htmlFor="references">referências</label>
                <FieldArray name="references">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { references } = values;
                    // console.log('fieldArrayProps', fieldArrayProps)
                    // console.log('Form errors', form.errors)
                    return (
                      <div>
                        {references.map((reference, index) => (
                          <div key={index}>
                            <Field name={`references[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => push("")}>
                          +
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CustomFieldArray;
