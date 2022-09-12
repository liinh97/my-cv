import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import TextContext from "../Context/TextContext";
import { db } from "../Firebase/firebase-config";
import { update } from "../Firebase/firebase-repo";
import "./item-box.css";

export default function ItemBox(props){

    const {text, setText} = useContext(TextContext);
    const [oldIndex, setOldIndex] = useState(null);
    const [data, setData] = useState({});
    const [id, setId] = useState(null);

    const handleStart = (index, parentIndex) => {
        setOldIndex(index);
    }

    useEffect(() => {
        setData(props.data);
        setId(props.id);
    }, [props]);
    
    const handleDrop = (parentIndex, childIndex) => {
        const data = props.data[parentIndex].item_child;
        const newData = {
            ["item_box."+parentIndex+".item_child"]: handleSwapData(data, oldIndex, childIndex)
        };
        update('cv', id, newData);
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
                Object.keys(data).map( (item, parentIndex) => {

                    return (
                        <div key={data[item].name} className="container_box">
                            <h3>{data[item].name}</h3>
                            <div className={data[item].name + '_box'}>
                            {
                                data[item].item_child.map( (e, childIndex) => {

                                    const query = 'item_box.' + data[item].name + '.item_child.' + e.sort;
                                    return (
                                        <div
                                            key={childIndex}
                                            className={ 'item_' + e.sort + ' item_box'}
                                            draggable
                                            onDragStart={() => handleStart(childIndex, parentIndex)}
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