import React from "react";
import { TextField, Typography, Grid, Paper } from "@material-ui/core";
import { useForm, Controller, FormContext } from "react-hook-form";
import * as R from "ramda";

export default function App() {
  const Tags = [{ key: "Peter", value: "Dad" }, { key: "Brian", value: "Dog" }];

  const methods = useForm({
    defaultValues: { Tags },
    mode: "onChange"
  });

  const { register, control, errors } = methods;

  return (
    <FormContext {...methods}>
      <Paper style={{ padding: 16, marginTop: 20 }}>
        <Typography display="inline">Required Tags</Typography>
        <Grid container flex-direction="row" alignItems="flex-start" spacing={2}>
          {Tags.map((item, index) => {
            register({ name: `Tags[${index}].key`, value: item.key });
            const fieldName = `Tags[${index}].value`;
            let currentError = R.find(R.pathEq(["value", "ref", "name"], `${fieldName}`))(errors?.Tags ? errors.Tags : []);
            let errorMessage = !!currentError ? currentError.value.message : null;
            return (
              <React.Fragment>
                <Grid item xs={6}>
                  <Controller
                    defaultValue={item.value}
                    as={TextField}
                    control={control}
                    label={item.key}
                    name={`${fieldName}`}
                    rules={{
                      required: { value: true, message: "Required Fool!" }
                    }}
                    error={!!currentError}
                    helperText={errorMessage}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <pre>Errors: {JSON.stringify(errors, 0, 2)}</pre>
        </Grid>
      </Paper>
    </FormContext>
  );
}
