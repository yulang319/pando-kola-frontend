/**
 * 网站的搜索首页
 */
import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { testSearch } from './common/Constants';

import '../css/common/common.css'
import '../css/SearchHome.css'

function SearchHome(props) {
    const onFinish = (values) => {
        console.log('Success:', values);
        testSearch(values['text'])
        .then(response => {
            const resCode = response.status
            if (200 === resCode) {
                const resData = response.data
                const dataCode = resData.code
                if (0 === dataCode) {
                    message.info(resData.data)
                }
            }
        })
        .catch(error => {
            message.error('发生错误:' + error)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='searchRoot'>
            <div className='title'>PDFSOSO</div>
            <Form
                name="basic"
                layout='inline'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="text"
                    rules={[
                        {
                            required: true,
                            message: '请输入要搜索的内容!',
                        },
                    ]}
                >
                    <Input className='input' />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 1,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        搜索
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default SearchHome;