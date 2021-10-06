/**
 * 网站的首页。
 */
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { testUrl, getMenuInfo } from './common/Constants.js'
import SystemManageHome from './management/SystemManageHome.js'
import '../css/Home.css'

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMenus: [], // 保存从服务端拿到的最原始的数据
            selectedMenuCode: '', // 设置用户点击的菜单的编码
        }
    }

    componentDidMount() {
        // 0. 测试
        testUrl().then((response) => {
            console.log(response['data'])
        })
        // 1. 从服务端拉取菜单信息
        getMenuInfo().then((response) => {
            let menuRet = response.data
            if (0 === menuRet.code) {
                let menuData = menuRet.data
                this.setState({
                    allMenus: menuData,
                    selectedMenuCode: this.getFirstLevel1MenuCode(menuData)
                })
            }
        }).catch(function (error) {
            throw error
        })
    }

    render() {
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.getFirstLevel1MenuCode(this.state.allMenus)]}>
                        {
                            this.getLevel1MenuInfo(this.state.allMenus).map(item => {
                                return <Menu.Item key={item.menu_code} onClick={() => this.clickMenu(item.menu_code)}>{item.menu_name}</Menu.Item>
                            })
                        }
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
                        {
                            this.renderContent()
                        }
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Created by 船到桥头自然沉，有任何问题或者建议请联系：531083269@qq.com</Footer>
            </Layout>
        );
    }

    /**
     * 点击菜单项的执行方法
     */
    clickMenu = (menu_code) => {
        // 获取点击的菜单的所有子菜单
        // 同时设置一下用户点击了哪个
        this.setState({
            selectedMenuCode: menu_code
        })
    }

    /**
     * 渲染见面的实际内容
     */
    renderContent = () => {
        if (this.state.selectedMenuCode === 1) {
            return (
                <SystemManageHome
                    srcData={this.getSubLevelMenuInfo(this.state.allMenus, this.state.selectedMenuCode)}
                />
            )
        } else {
            return (
                <div>暂未实现</div>
            )
        }
    }

    /**
     * 获取所有的一级菜单
     * 返回数据格式：
     * [{
     * 'menu_code':'菜单编码',
     * 'menu_name':'菜单名称'
     * }]
     */
    getLevel1MenuInfo = (srcData) => {
        return srcData.map(item => ({
            'menu_code': item.menu_code,
            'menu_name': item.menu_name
        }))
    }

    /**
     * 获取code指定的菜单的子菜单
     */
    getSubLevelMenuInfo = (srcData, code) => {
        return srcData.filter(item => item.menu_code === code).flatMap(item => item.child)
    }

    getFirstLevel1MenuCode = (srcData) => {
        return undefined != srcData && srcData.length > 0 ? srcData[0].menu_code : '1'
    }
}

export default Home;