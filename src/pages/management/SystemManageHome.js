/**
 * 系统管理的主页，这个主要用来显示系统管理有哪些具体的功能。
 * 当用户点击系统管理的时候会显示这个页面
 * 例如：系统管理下有：
 * 配置管理
 * 用户管理等等。。。
 */
import React from 'react'
import { Row, Col, Slider } from 'antd';
import SystemSetting from './SystemSetting.js'
import 'antd/dist/antd.css';
import '../../css/management/SystemManageHome.css'

const gutters = {};
const vgutters = {};
const colCounts = {};

[8, 16, 24, 32, 40, 48].forEach((value, i) => {
    gutters[i] = value;
});
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
    vgutters[i] = value;
});
[2, 3, 4, 6, 8, 12].forEach((value, i) => {
    colCounts[i] = value;
});

class SystemManageHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gutterKey: 1,
            vgutterKey: 1,
            colCountKey: 0,
            selectedMenuCode: 0, // 0代表显示所有的菜单
        };
    }


    onGutterChange = gutterKey => {
        this.setState({ gutterKey });
    };

    onVGutterChange = vgutterKey => {
        this.setState({ vgutterKey });
    };

    onColCountChange = colCountKey => {
        this.setState({ colCountKey });
    };

    render() {
        return this.renderAll()
    }

    renderAll = () => {
        const { gutterKey, vgutterKey, colCountKey } = this.state;
        if (0 === this.state.selectedMenuCode) {
            return (
                <div className="home-page">
                    <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
                        {this.renderContent()}
                    </Row>
                </div>
            );
        } else if (10 === this.state.selectedMenuCode) {
            return (
                <div className="home-page">
                    <SystemSetting />
                </div>
            )
        }
    }

    renderContent = () => {
        const colCount = colCounts[this.state.colCountKey];
        const srcData = this.props.srcData
        const dataSize = srcData.length
        // 行数
        const rowNumber = dataSize % colCount === 0 ? dataSize / colCount : (dataSize / colCount) + 1
        const cols = [];
        let index = -1
        for (let i = 0; i < rowNumber; i++) {
            for (let j = 0; j < colCount; j++) {
                const item = srcData[(++index)]
                const key = i.toString() + j.toString()
                if (index < dataSize) {
                    cols.push(
                        <Col key={key} span={24 / colCount}>
                            <div key={item.menu_code} className='content' onClick={() => this.clickMenu(item.menu_code)}>{item.menu_name}</div>
                        </Col>
                    )
                }
            }
        }
        return cols
    }

    clickMenu = (menuCode) => {
        this.setState({
            selectedMenuCode: menuCode
        })
    }
}

export default SystemManageHome