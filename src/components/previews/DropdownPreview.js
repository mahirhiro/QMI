import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
    button: {
        display: "block",
        marginTop: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

const DropdownPreview = ({ question }) => {
    const classes = useStyles();
    const [option, setOption] = React.useState("");
    const [open, setOpen] = React.useState(false);


    const handleChange = event => {
        setOption(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    let index = 1;

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">{question.label}</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={option}
                    onChange={handleChange}
                >
                    {question.options.map((option, index) =>
                        <MenuItem key={option+(index+1)} value = {index + 1}>
                            <em>{option}</em>
                        </MenuItem>
                    )}


                </Select>
            </FormControl>
        </div>

    );
};


export default DropdownPreview
