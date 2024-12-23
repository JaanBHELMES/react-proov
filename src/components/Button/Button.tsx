import './Button.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
interface ButtonProps {
  title: string;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  icon?: IconDefinition;
}
function Button(props: ButtonProps): React.JSX.Element {

  return (
    <button type={props.type ? props.type : 'button'} onClick={props.onClick}>
      {!!props.icon &&
        <FontAwesomeIcon icon={props.icon} />
      }
      {props.title}
    </button>
  );
}
export default Button;
