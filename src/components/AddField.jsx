import { useState } from 'react'
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({
  onAdd,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const onClickAdd = () => {
    onAdd(inputValue, isChecked)
    setInputValue('')
    setIsChecked(false)
  }

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        checked={ isChecked }
        icon={<RadioButtonUncheckedIcon />}
        onChange={ (e) => setIsChecked(e.target.checked) }
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        placeholder="Введите текст задачи..."
        variant="standard"
        onChange={ (e) => setInputValue(e.target.value) }
        value={ inputValue }
        fullWidth
      />
      <Button onClick={ onClickAdd }>
        <AddIcon />
      </Button>
    </div>
  );
};
