import React, { useEffect, useState } from "react";

export default function ItemBox(props){

    const [count, setCount] = useState(1);

    useEffect(() => {
        console.log(props);
    }, []);

    return (

        <div className={props.name + '_box'}>
            <div className={props.name + '_' + count}>
                <div className={props.name + '_time'}>{props.time}</div>
                <div className={props.name + '_desc'}>
                    <div className={props.name + '_desc-title'}>{props.title}</div>
                    <div className={props.name + '_desc-content'}>{props.content}</div>
                </div>
            </div>
        </div>

    );

}