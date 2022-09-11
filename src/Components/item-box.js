import React, { useContext, useState } from "react";
import TextContext from "../Context/TextContext";
import "./item-box.css";

export default function ItemBox(props){

    const {text, setText} = useContext(TextContext);
    const [oldIndex, setOldIndex] = useState(null);

    const handleStart = index => {
        setOldIndex(index);
    }
    
    const handleDrop = (parentIndex, childIndex) => {
        const data = props.data[parentIndex].item_child;
        const newData = handleSwapData(data, oldIndex, childIndex);

    }

    const handleOver = e => {
        e.preventDefault();
    }

    const handleSwapData = (data, oldIndex, newIndex) => {
        const clone = data[oldIndex];
        data[oldIndex] = data[newIndex];
        data[oldIndex].sort = oldIndex;
        data[newIndex] = clone;
        data[newIndex].sort = newIndex;
        return data;
    }

    return (

        <div>
            {
                props.data.map( (item, parentIndex) => {

                    return (
                        <div key={item.name} className="container_box">
                            <h3>{item.name}</h3>
                            <div className={item.name + '_box'}>
                            {
                                item.item_child.map( (e, childIndex) => {

                                    const query = 'item_box.' + item.name + '.item_child.' + e.sort;
                                    return (
                                        <div
                                            key={childIndex}
                                            className={ 'item_' + e.sort + ' item_box'}
                                            draggable
                                            onDragStart={() => handleStart(childIndex)}
                                            onDrop={() => handleDrop(parentIndex, childIndex)}
                                            onDragOver={handleOver}
                                            >
                                            <div
                                                onClick={() => setText(query + '.time')}
                                                className={'item_box_time'}
                                                >{e.time}
                                            </div>
                                            <div className={'item_box_desc'}>
                                                <div
                                                    onClick={() => setText(query + '.title')}
                                                    className={'item_box_desc-title'}
                                                    >{e.title}
                                                </div>
                                                <div
                                                    onClick={() => setText(query + '.content')}
                                                    className={'item_box_desc-content'}
                                                    >{e.content}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )

                })
            }
        </div>

    );

}