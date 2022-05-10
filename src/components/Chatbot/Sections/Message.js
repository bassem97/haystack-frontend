import React from 'react'
import { List, Icon, Avatar } from 'antd';

function Message(props) {

    const AvatarSrc = props.who ==='bot' ? <Icon type="robot" /> : <Icon type="smile" />
    const title = props.title
    const  description = props.description
    return (
        <List.Item style={{ padding: '1rem',display: 'flex',
            justifycontent:'end' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: props.who === 'bot' ? 'flex-start' : 'flex-end'
                }}
            >
                <p className="text-sm" style={{width: '44%'}}>{props.who}</p>
                <List.Item.Meta
                    // title={props.who}
                    description={props.text}
                    style={{
                        background: props.who === 'bot' ? '#f5f5f5' : '#8997ee',
                        borderRadius: '7px', 
                        padding: '0.5rem',
                        width: '44%'
                    }}
                />
            </div>
        </List.Item>

    )
}

export default Message
