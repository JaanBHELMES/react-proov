import './TextInput.css';

interface TextInputProps {
  name?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}
function TextInput(props: TextInputProps): React.JSX.Element {
  return (
    <input type="text" name={props.name} placeholder={props.placeholder}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)} />
  );
}
export default TextInput;
