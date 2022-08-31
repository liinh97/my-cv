import { getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ItemBox from "../Components/item-box";
import { db } from "../Firebase/firebase-config";
import { all, snapshotAll } from "../Firebase/firebase-repo";

export default function Index() {

    const [header, setHeader] = useState([]);
    const [info, setInfo] = useState([]);
    const [goal, setGoal] = useState(null);
    const [box, setBox] = useState([]);

    useEffect(() => {
        all('cv').then(res => {
            res.forEach(item => {
                setHeader(item.data().header);
                setInfo(item.data().information);
                setGoal(item.data().goal);
                setBox([item.data().item_box]);
            });
        });
    }, []);

    return (

        <div id="index">
            <div className="header_box">
                <div className="header_title">{header.title}</div>
                <div className="header_desc">{header.desc}</div>
            </div>
            <div className="infomartion_box">
                <div className="info_text">
                    <div className="info_name">{info.name}</div>
                    <div className="info_age">{info.age}</div>
                    <div className="info_phone">{info.phone}</div>
                    <div className="info_address">{info.address}</div>
                    <div className="info_emaill">{info.email}</div>
                </div>
                <div className="info_img">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="goal_box">{goal}</div>
            {
                box.map( (e, i) => {
                    return <ItemBox
                        key={i}
                        study={e.study}
                        experience={e.experience}
                        active={e.active}
                        skill={e.skill}
                        chungchi={e.chungchi}
                        interest={e.interest}
                    />
                })
            }
        </div>

    );

}