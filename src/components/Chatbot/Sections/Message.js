import React from 'react'
import { List, Icon, Avatar } from 'antd';

function Message(props) {

    const AvatarSrc = props.who ==='bot' ? <Icon type="robot" /> : <Icon type="smile" />
    const title = props.title
    const  description = props.description
    return (
        <List.Item style={{ padding: '1rem' }}>
<div><center>
            <List.Item.Meta
                title={props.who}
                description={props.text}
                style={{background: '#8997ee'}}
            /></center>
</div>
        </List.Item>

    )
}

export default Message
