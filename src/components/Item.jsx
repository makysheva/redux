import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Item = ({ checked, id, text, onRemove, onEdit, onToggle }) => {
  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          checked={ checked }
          checkedIcon={<CheckCircleIcon />}
          icon={<RadioButtonUncheckedIcon />}
          onChange={ onToggle }
        />
        <Typography className="item-text">{text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton onClick={ () => onEdit(id) }>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={ () => onRemove(id) }>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
