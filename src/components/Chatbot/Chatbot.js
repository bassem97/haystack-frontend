import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../redux/_reducers/_actions/message_actions';
import Message from './Sections/Message';
import { List, Icon, Avatar } from 'antd';
import Card from "./Sections/Card";
import SupportEngine from "../SupportEngine";
function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)

    useEffect(() => {

        eventQuery('welcometohaystack')
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };

    }, [])
    const alertUser = (e) => {
        console.log("aasba")
    };


    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))
        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('http://localhost:8080/api/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))


        }

    }


    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('http://localhost:8080/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }


    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type something first')
            }

            //we will send request to text query route 
            textQuery(e.target.value)


            e.target.value = "";
        }
    }

    const renderCards = (cards) => {
        return cards.map((card,i) => <Card key={i} cardInfo={card.structValue} />)
    }


    const renderOneMessage = (message, i) => {
        console.log('message', message)

        // we need to give some condition here to separate message kinds 

        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } else if (message.content && message.content.payload.fields.card) {

            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />


        }






        // template for card message 




    }

    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }


    return (
        <div>



            <div style={{
            //height: 700, width: 700,
            height: '100%', width: '100%',

        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>





                {renderMessage(messagesFromRedux)}


            </div>
            <input  type="text" className="form-control"
                style={{
                     width: '100%', height: 50,

                }}
                placeholder="Write here ..."
                onKeyPress={keyPressHanlder}
                type="text"
            />

        </div>

        </div>
    )
}

export default Chatbot;