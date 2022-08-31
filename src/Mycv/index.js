import React from "react";

export default function Index() {

    const item = ['header', 'goal', 'study', 'experience', 'active', 'skill', 'chứng chỉ', 'interest'];
    
    return (

        <div id="index">
            <div className="header_box">
                <div className="header_title">Title</div>
                <div className="header_desc">Desc</div>
            </div>
            <div className="infomartion_box">
                <div className="info_text">
                    <div className="info_name">Linh</div>
                    <div className="info_age">25</div>
                    <div className="info_phone">033.....</div>
                    <div className="info_address">...</div>
                    <div className="info_emaill">...</div>
                </div>
                <div className="info_img">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="goal_box">
                Goal ....
            </div>
            <div className="study_box">
                <div className="study_1">
                    <div className="study_time">
                        2020 - 2022
                    </div>
                    <div className="study_desc">
                        <div className="study_desc-title">Title</div>
                        <div className="study_desc-content">ABCD</div>
                    </div>
                </div>
            </div>
            <div className="experience_box">

            </div>
        </div>

    );

}