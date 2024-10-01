import { Tabs, Divider } from "antd";
import './TagMenu.css'
import TrainerInformation from "../../../pages/Trainer/TrainerInformationPage/TrainerInformationPage";
import TrainerUnitPrice from '../../../pages/Trainer/TrainerUnitPricePage/TrainerUnitPricePage'
import ClassList from "../../../pages/Trainer/ClassListPage/ClassListPage";
import Schedule from "../../../pages/Trainer/SchedulePage/SchedulePage";
import ScheduleTracker from "../../../pages/Trainer/ScheduleTrackerPage/ScheduleTrackerPage";
import PortalPage from "../../../pages/Trainer/PortalPage/PortalPage";
const { TabPane } = Tabs;
function TagMenu({ defaultActiveKey }) { 

    return (
        <div>
            <div className='titleMenu'>Statistics - Trần Thị Bành Bạch</div>
            <Divider style={{margin: '15px 0px 0px'}}/>
            <Tabs defaultActiveKey={defaultActiveKey.toString()} size="large" style={{margin: '0px 15px '}}>
                <TabPane tab="Trainer Information" key="1">
                    <TrainerInformation/>
                </TabPane>
                <TabPane tab="Trainer Unit Price" key="2">  
                    <TrainerUnitPrice/>
                </TabPane>
                <TabPane tab="Class List" key="3">
                    <ClassList/>
                </TabPane>
                <TabPane tab="Schedule" key="4">
                    <Schedule/>
                </TabPane>
                <TabPane tab="Schedule Tracker" key="5">
                    <ScheduleTracker/>
                </TabPane>
                <TabPane tab="Portal" key="6">
                    <PortalPage/>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default TagMenu;
