import React, { useEffect, useReducer, useState } from "react";
import { update, snapshotAll, col } from "../Firebase/firebase-repo";
import TextContext from "../Context/TextContext";
import ItemBox from "../Components/item-box";
import { SortableComponent } from "../Components/sortable";
import "./index.css";

export default function Index() {

    const [id, setId] = useState(null);
    const [header, setHeader] = useState([]);
    const [info, setInfo] = useState([]);
    const [goal, setGoal] = useState(null);
    const [box, setBox] = useState([]);
    const [text, setText] = useState(null);
    const [valueInp, setValueInp] = useState("");

    useEffect(() => {

        snapshotAll('cv', (res) => {
            res.forEach(item => {
                setHeader(item.data().header);
                setInfo(item.data().information);
                setGoal(item.data().goal);
                setId(item.id);
                setBox(item.data().item_box);
            });
        });

    }, []);

    useEffect(() => {
    }, []);

    const insertOrUpdate = () => {

        if (text) {
            const newText = text.split(".");
            const column = newText[0];
            const status = valueInp == "" ? false : true;
            const data = { goal, information: info, header, item_box: box };

            breakpoint: if (newText.length > 1) {
                const nameBox = newText[1];

                if (typeof(data[column]) === 'object') {

                    const colum2 = newText[2];
                    const index = newText[3];
                    const tag = newText[4];

                    Object.keys(data[column]).map(e => {
                        if (data[column][e].name == nameBox) {

                            if(colum2 == null){
                                if (status) data[column][e].value = valueInp;
                            }else{
                                if (status) data[column][e][colum2][index][tag] = valueInp;
                            }

                            return e;
                        }
                    });

                    break breakpoint;
                }

                if (status) data[column][nameBox] = valueInp;

            } else {
                data[column] = valueInp;
            }

            if (status) update('cv', id, data);
            setValueInp("");
        }
    }

    return (

        <div id="index">
            <div hidden id="hidden_text">{text}</div>
            {/* <div className="header_box">
                <div className="top_box">
                    <h1
                        onClick={() => setText('header.title')}
                        className="header_title"
                        >{header.title}
                    </h1>
                    <h3
                        onClick={() => setText('header.desc')}
                        className="header_desc"
                        >{header.desc}
                    </h3>
                </div>
                <div className="infomartion_box">
                    <div className="info_img">
                        <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1662032206~exp=1662032806~hmac=1cf9ff4fb92ba06ac1aba70d9348dc7bb52766fb7629ee15a9add21147f7fdcc" alt="avatar" />
                    </div>
                    <div className="info_text">
                    <TextContext.Provider value={{text, setText}}>
                        <SortableComponent items={info} tag="info" />
                    </TextContext.Provider>
                    </div>
                </div>
            </div>
            <div className="goal_box">
                <h3>Goal</h3>
                <div onClick={() => setText('goal')} className="goal_text">{goal}</div>
            </div> */}
            <TextContext.Provider value={{text, setText}}>
                <ItemBox data={box} id={id} />
            </TextContext.Provider>
            <input
                type="text"
                onBlur={insertOrUpdate}
                onChange={(e) => { setValueInp(e.target.value) }}
                value={valueInp}
            />
        </div>

    );

}