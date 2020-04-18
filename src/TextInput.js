import { TextField } from "@material-ui/core";

const TextInput = ({ label, field, form: { getFieldProps, touched, errors }, ...props }) => {
  const errorMessage = errors[field.name];
  const touch = touched[field.name];
  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      label={label}
      {...getFieldProps(field.name)}
      error={errorMessage && touch}
      helperText={errorMessage && touch && errorMessage}
      margin="normal"
    />
  );
};

export default TextInput;
