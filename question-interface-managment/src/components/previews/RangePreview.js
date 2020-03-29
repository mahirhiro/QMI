import React, {useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
    },
    margin: {
        height: theme.spacing(3),
    },
}));


const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);



const  RangePreview = ({ question }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography gutterBottom>Pretto</Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider"
                          defaultValue={30}
                          aria-labelledby="discrete-slider"
                          step={question.step}
                          marks
                          min={question.min}
                          max={question.max}
                          title = {question.title}
                          // tooltip = {question.tooltip}
                          labels = {question.labels}
                          section_end = {question.section_end}
            />
        </div>
    );
}

export default RangePreview