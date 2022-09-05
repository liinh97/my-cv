import React, { useEffect, useState } from "react";
import ItemBox from "../Components/item-box";
import { all, update } from "../Firebase/firebase-repo";
import TextContext from "../Context/TextContext";
import "./index.css";
import { db } from "../Firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Index() {

    const [id, setId] = useState(null);
    const [header, setHeader] = useState([]);
    const [info, setInfo] = useState([]);
    const [goal, setGoal] = useState(null);
    const [box, setBox] = useState([]);
    const [text, setText] = useState(null);
    const [valueInp, setValueInp] = useState("");

    useEffect(() => {
        all('cv').then(res => {
            res.forEach(item => {
                setHeader(item.data().header);
                // setInfo(item.data().information);
                setGoal(item.data().goal);
                setId(item.id);
                // setBox(item.data().item_box);
            });
        });
    }, []);

    useEffect(() => {
    }, [id]);

    const insertOrUpdate = () => {
        if(text){
            const newText = text.split(".");
            const column = newText[0];
            const data = {goal, information: info, header, item_box: box};
            let newData = {};
            
            if(newText.length > 1){
                const nameBox = newText[1];
                data[column][nameBox] = valueInp;
            }else{
                data[column] = valueInp;
            }
            // update('cv', id, data);
            console.log(data);
        }
    }

    return (

        <div id="index">
            <div hidden id="hidden_text">{text}</div>
            <div className="header_box">
                <div className="top_box">
                    <h1 onClick={() => setText('header.title')} className="header_title">{header.title}</h1>
                    <h3 onClick={() => setText('header.desc')} className="header_desc">{header.desc}</h3>
                </div>
                <div className="infomartion_box">
                    <div className="info_img">
                        {/* <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1662032206~exp=1662032806~hmac=1cf9ff4fb92ba06ac1aba70d9348dc7bb52766fb7629ee15a9add21147f7fdcc" alt="avatar" /> */}
                    </div>
                    <div className="info_text">
                        <div onClick={() => setText('information.name')} className="info_name">{info.name}</div>
                        <div onClick={() => setText('information.age')} className="info_age">{info.age}</div>
                        <div onClick={() => setText('information.phone')} className="info_phone">{info.phone}</div>
                        <div onClick={() => setText('information.address')} className="info_address">{info.address}</div>
                        <div onClick={() => setText('information.email')} className="info_emaill">{info.email}</div>
                    </div>
                </div>
            </div>
            <div className="goal_box">
                <h3>Goal</h3>
                <div onClick={() => setText('goal')} className="goal_text">{goal}</div>
            </div>
            <TextContext.Provider value={{text, setText}}>
            {
                box.map( (e, i) => {
                    return <ItemBox key={i} data={e} />
                })
            }
            </TextContext.Provider>
            <input
                type="text"
                onBlur={insertOrUpdate}
                onChange={(e) => {setValueInp(e.target.value)}}
                value={valueInp}
            />
        </div>

    );

}