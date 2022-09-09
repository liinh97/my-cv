import React, { useContext, useEffect, useState } from "react";
import TextContext from "../Context/TextContext";
import "./item-box.css";

export default function ItemBox(props){

    const {text, setText} = useContext(TextContext);

    return (

        <div className="container_box">
            <h3>{props.data.name}</h3>
            <div className={props.data.name + '_box'}>
            {
                props.data.item_child.map( (e, i) => {
                    const query = 'item_box.' + props.data.name + '.item_child.' + e.sort;
                    return (
                        <div key={i} className={ 'item_' + e.sort + ' item_box'}>
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

    );

}