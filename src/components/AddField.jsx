import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({
  onClickAdd,
  inputValue,
  isChecked,
  setInputValue,
  setIsChecked,
}) => {

  const onClickCheckbox = () => {
    setIsChecked(isChecked => ! isChecked)
  }

  const onChangeInput = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        checked={ isChecked }
        icon={<RadioButtonUncheckedIcon />}
        onClick={ () => onClickCheckbox }
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        placeholder="Введите текст задачи..."
        variant="standard"
        onChange={ onChangeInput }
        value={ inputValue }
        fullWidth
      />
      <Button onClick={ onClickAdd }>
        <AddIcon />
      </Button>
    </div>
  );
};
