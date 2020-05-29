import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const grid = 8;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
});  
const getListStyle = isDraggingOver => ({
    //sets list background colour
    background: isDraggingOver ? "lightblue" : "lightgrey",

    padding: grid,
    width: 250
});

let firstRender = true;
let itemsCopy = [];

//props available: data, questionResponse
function RankOrder(props) {
    //For dragNSort
    let [ items, setItems ] = useState([]);

    useEffect(() => {    
        //If{} catch here prevents overwrite of recorded answers when moving back and forth between questionCards
        console.log(`First render: ${firstRender}`);
        if(firstRender === true){
            const questionData = props.data;
            const responseKeys = Object.keys(questionData.responseText);
            const responseValues = Object.values(questionData.responseText);
            const dragNDropData = Array(responseKeys.length).fill().map(
                function(item, i) {
                    return {
                        id: responseKeys[i],
                        content: responseValues[i]
                    }
            })

            //Generates initial ranking 
            //Allows for the rare exception where the preset ranking = respondent's answer
            let initialRanking = {};
            for(let i=0; i<responseKeys.length; i++){
                initialRanking[`rank_${i}`] = responseKeys[i]
            };
            //Sets answersForSubmit to contain the initial ranking
            props.handleResponse(questionData.questionId, initialRanking, "rankOrder");

            //Sets firstRender to false after this if{} is run
            firstRender = !firstRender;

            setItems([ ...dragNDropData ]);
            itemsCopy = [ ...dragNDropData ];
        } else {
            setItems([ ...itemsCopy ]);
        }
        
    }, []);

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        
        const newItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        //Generates object of new ranking
        //Rank = Element number in newItems array
        let newRanking = {};
        for(let i=0; i<newItems.length; i++){
            newRanking[`rank_${i}`] = newItems[i].id
        };
        //Sets answersForSubmit to new ranking
        props.handleResponse(props.data.questionId, newRanking, "rankOrder");
            
        setItems([ ...newItems ]);
        itemsCopy = [ ...newItems ]; //Copy to re-render same ranking if moved to next questionCard
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                            >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={() => {console.log(items)}}>Chk items array</button>
            <button onClick={() => {console.log(itemsCopy)}}>Chk reordered responses</button>
        </React.Fragment>
    );
}

export default RankOrder;
