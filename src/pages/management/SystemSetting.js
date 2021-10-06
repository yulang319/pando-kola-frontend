import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, message } from 'antd';
import { getAllSystemSettingByPage } from '../common/Constants.js';
import SystemSettingAddModal from './SystemSettingAddModal.js'
import '../../css/management/SystemSetting.css';
import Modal from 'antd/lib/modal/Modal';

const columns = [
    {
        title: '编码',
        dataIndex: 'systemSettingKey',
        key: 'systemSettingKey',
    },
    {
        title: '描述',
        dataIndex: 'systemSettingValue',
        key: 'systemSettingValue',
    },
];

const pageStart = 1;
const pageLimit = 30;

class SystemSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            pageIndex: pageStart, // 查询数据的第一页
            dataSource: [], // 数据
            isAddModalVisible: false,
        };
    }

    render() {
        const { loading, selectedRowKeys, dataSource, isAddModalVisible } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.addOne} loading={loading} className='button'>
                        新增
                    </Button>
                    <Button type="primary" onClick={this.modifyOne} disabled={!(1 === selectedRowKeys.length)} loading={loading} className='button'>
                        修改
                    </Button>
                    <Button type="primary" onClick={this.delDatas} disabled={!(selectedRowKeys.length > 0)} loading={loading} className='button'>
                        删除
                    </Button>
                    {/* <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span> */}
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                <SystemSettingAddModal 
                    isVisible={isAddModalVisible}
                    onCancel={()=>this.setState({isAddModalVisible:false})}
                />
            </div>
        );
    }

    componentDidMount() {
        const { pageIndex } = this.state
        getAllSystemSettingByPage(pageIndex, pageLimit)
            .then(response => {
                const resCode = response.status;
                if (200 !== resCode) return;
                const resData = response.data
                const resDataCode = resData.code
                if (0 !== resDataCode) return;
                this.setState({
                    dataSource: resData.data.list.map(item => ({
                        systemSettingKey: item.systemSettingKey,
                        systemSettingValue: item.systemSettingValue,
                        key: item.id
                    })),
                })
            })
            .catch(error => {
                throw error
            })
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    addOne = () => {
        this.setState({isAddModalVisible: true});
    }

    modifyOne = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length <= 0) {
            message.error("请先选中要修改的数据");
            return;
        }
        if (selectedRowKeys.length > 1) {
            message.warn("一次只能修改一条记录");
            return;
        }
    }

    delDatas = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length <= 0) {
            message.error("请先选中要删除的数据");
            return;
        }
    }
}

export default SystemSetting