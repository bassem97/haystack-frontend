import React from "react";
import {styles} from "../styles";
import Chatbot from "../../Chatbot/Chatbot";

const SupportWindow = props =>{
    return (
        <div
            className="transition-5"
            style={{
                ...styles.supportWindow,
                ...{opacity: props.visible ? '1' : '0'},
                display: props.visible ? "block" : "none"
            }}
        >
            <Chatbot/>
        </div>

    )
}
export default SupportWindow
