import React, {useCallback} from 'react'
import {Draggable, Droppable} from "react-beautiful-dnd";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import {useDispatch} from 'react-redux'

function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    return {
        ...style,
        // cannot be 0, but make it super tiny
        transitionDuration: `0.00001s`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        flexShrink: 0
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}));

export const Sidebar = ({items}) => {
    const classes = useStyles();

    return (
        <Droppable
            renderClone={getRenderItem(items, "")}
            droppableId="SHOP"
            isDropDisabled={true}
        >
            {(provided, snapshot) => (
                <Drawer
                    className={classes.drawer}
                    ref={provided.innerRef}
                    variant="permanent"
                    anchor="right"
                >
                    <div className={classes.toolbar}/>
                    <List>
                        {items.map((item, index) => {
                            const shouldRenderClone =
                                item.id === snapshot.draggingFromThisWith;
                            return (
                                <React.Fragment key={item.id}>
                                    {shouldRenderClone ? (
                                        <ListItem button id={item.label} key={item.label}>
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText
                                                primary={item.label}
                                                style={{textAlign: "left"}}
                                            />
                                        </ListItem>
                                    ) : (
                                        <Draggable draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <ListItem
                                                    id={item.label}
                                                    key={item.label}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    button
                                                    className={snapshot.isDragging ? "dragging" : ""}
                                                >
                                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                                    <ListItemText primary={item.label}/>
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        <div className={classes.toolbar}/>
                        <Divider/>
                        <ListItem
                            button
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload(true)
                            }}
                        >
                            <ListItemText primary="delete data"/>
                        </ListItem>

                    </List>
                </Drawer>
            )}
        </Droppable>
    );
};
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
    const item = items[rubric.source.index];
    const style = {
        ...provided.draggableProps.style
    };
    return (
        <Paper
            className={snapshot.isDragging ? "dragging1" : "not-dragging1"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getStyle(provided.draggableProps.style, snapshot)}
        >
            <ListItem>
                <ListItemIcon style={{color: "white"}}>{item.icon}</ListItemIcon>
                <ListItemText>
                    <Typography variant="body1" style={{color: "white"}}>
                        {item.label}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Paper>
    );
};