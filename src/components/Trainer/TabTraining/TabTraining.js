import React, { useEffect, useState } from 'react';
import { Select, DatePicker, Table, Input } from 'antd';
import './TabTraining.css';
import { fetchClasses } from '../../../api/TrainerAPI/Report_api';
import { Modal, Button } from 'antd';

const { Option } = Select;

const TabTraining = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedDeliveryTypes, setSelectedDeliveryTypes] = useState([]);
    const [selectedTrainingFormats, setSelectedTrainingFormats] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modules, setModules] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [showReason, setShowReason] = useState(false);



    const handleSelectTopic = (topic) => {
        setSelectedTopics(prevSelected => {
            if (prevSelected.includes(topic)) {
                return prevSelected.filter(item => item !== topic);
            } else {
                return [...prevSelected, topic];
            }
        });
    };
    const handleModalDateChange = (date) => {
        const topicDates = selectedTopics.map(topic => new Date(topic.date));
        console.log('Selected date in modal:', date);
        console.log('Topic dates:', topicDates);

        const dateMatches = topicDates.some(topicDate => topicDate.toDateString() === date.toDate().toDateString());
        console.log('Date matches:', dateMatches);
        setShowReason(!dateMatches);
    };

    const showModal = () => {
        setIsModalVisible(true);
        setShowReason(false);
    };


    const handleOk = () => {
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchClassesData = async () => {
            try {
                const response = await fetchClasses();
                setClasses(response.data.data);
            } catch (error) {
                console.error('Failed to fetch classes', error);
            }
        };

        fetchClassesData();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            setModules(selectedClass.modules);
            setSelectedModule(null);
            setSelectedDeliveryTypes([]);
            setSelectedTrainingFormats([]);
            setDataSource([]);
        }
    }, [selectedClass]);

    const handleDeliveryTypeChange = (value) => {
        const newDeliveryTypes = value.includes("all") ?
            [...new Set(selectedModule.topics.flatMap(topic =>
                topic.contents.map(content => content.deliveryType)
            ))] : value;

        setSelectedDeliveryTypes(newDeliveryTypes);
        updateDataSource(selectedModule, selectedDate, newDeliveryTypes, selectedTrainingFormats);
    };

    const handleTrainingFormatChange = (value) => {
        const newTrainingFormats = value.includes("all") ?
            [...new Set(selectedModule.topics.flatMap(topic =>
                topic.contents.map(content => content.trainingFormat)
            ))] : value;

        setSelectedTrainingFormats(newTrainingFormats);
        updateDataSource(selectedModule, selectedDate, selectedDeliveryTypes, newTrainingFormats);
    };

    const updateDataSource = (module, date, deliveryTypes, trainingFormats) => {
        if (!selectedClass || !module || !date) return;
    
        const filteredData = [];
        const startDate = date.toDate();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 3);
    
        const topics = module.topics.filter(topic => {
            const topicDate = new Date(topic.date);
            return topicDate >= startDate && topicDate <= endDate;
        });
    
        const rows = topics.flatMap(topic => 
            topic.contents
            .filter(content => 
                (deliveryTypes.includes(content.deliveryType) || deliveryTypes.length === 0) &&
                (trainingFormats.includes(content.trainingFormat) || trainingFormats.length === 0)
            )
            .map(content => ({
                topicName: topic.topicName,
                date: topic.date,
                duration: topic.duration,
                contentName: content.contentName,
                deliveryType: content.deliveryType,
                trainingFormat: content.trainingFormat,
            }))
        );
    
        setDataSource(rows);
    };
    
    const handleClassChange = (value) => {
        const selected = classes.find(c => c.classId === value);
        setSelectedClass(selected);
        setSelectedModule(null);
        setSelectedDeliveryTypes([]);
        setSelectedTrainingFormats([]);
        setSelectedDate(null);
        setDataSource([]); // Reset bảng khi chọn Class mới
    };
    const handleModuleChange = (value) => {
        const selected = modules.find(m => m.moduleId === value);
        setSelectedModule(selected);
        setSelectedDeliveryTypes([]);
        setSelectedTrainingFormats([]);
        setSelectedDate(null);
        setDataSource([]); // Reset bảng khi chọn Module mới
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        updateDataSource(selectedModule, date, selectedDeliveryTypes, selectedTrainingFormats);
    };

    const filteredDataSource = dataSource.filter(item =>
        item.topicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.moduleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isClassSelected = !!selectedClass;
    const isModuleSelected = !!selectedModule;
    const isDateSelected = !!selectedDate;

    const getRowSpan = (data, index, key) => {
        const currentValue = data[index][key];
        let rowSpan = 1;
        
        for (let i = index + 1; i < data.length; i++) {
            if (data[i][key] === currentValue) {
                rowSpan++;
            } else {
                break;
            }
        }
        
        return rowSpan;
    };
    
    const getRowSpanForColumn = (data, index, key) => {
        const currentValue = data[index][key];
        for (let i = 0; i < index; i++) {
            if (data[i][key] === currentValue) {
                return 0; // Already merged in a previous row
            }
        }
        return getRowSpan(data, index, key);
    };
    
    // Columns for the table
    const columns = [
        {
            title: 'Topic',
            dataIndex: 'topicName',
            key: 'topicName',
            render: (text, record, index) => {
                const rowSpan = getRowSpanForColumn(dataSource, index, 'topicName');
                return {
                    children: text,
                    props: { rowSpan },
                };
            }
        },

        {
            title: 'Select',
            dataIndex: 'select',
            key: 'select',
            render: (text, record, index) => {
                const rowSpan = getRowSpanForColumn(dataSource, index, 'topicName');
        
                // Only show the checkbox for the first row of the span
                if (rowSpan > 0) {
                    return {
                        children: (
                            <input
                            style={{width:"18px", height:"18"}}
                                type="checkbox"
                                checked={selectedTopics.includes(record.topicName)} // Check if the topic is selected
                                onChange={() => handleSelectTopic(record.topicName)} // Call the handler with the topic name
                            />
                        ),
                        props: { rowSpan }, // Apply the row span to merge cells
                    };
                }
        
                // Return null for spanned rows to hide checkboxes and prevent cell borders
                return {
                    children: null,
                    props: { rowSpan: 0 }, // Ensure no additional rows for the spanned cells
                };
            }
        },
                { 
            title: 'Content Name', 
            dataIndex: 'contentName', 
            key: 'contentName' 
        },
        { 
            title: 'Delivery Type', 
            dataIndex: 'deliveryType', 
            key: 'deliveryType' 
        },
        { 
            title: 'Training Format', 
            dataIndex: 'trainingFormat', 
            key: 'trainingFormat' 
        },

        {
            title: 'Schedule Date',
            dataIndex: 'date',
            key: 'date',
            render: (text, record, index) => {
                const rowSpan = getRowSpanForColumn(dataSource, index, 'date');
                return {
                    children: text,
                    props: { rowSpan },
                };
            }
        },

        { 
            title: 'Schedule Duration (h)', 
            dataIndex: 'duration', 
            key: 'duration' 
        }
    ];

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col">
                    <p>Class:</p>
                    <Select
                        style={{ width: '150px' }}
                        className="select-training"
                        placeholder="Select Class"
                        onChange={handleClassChange}

                    >
                        {classes.map(cls => (
                            <Option key={cls.classId} value={cls.classId}>
                                {cls.className}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className="col">
                    <p>Module:</p>
                    <Select
                        style={{ width: '150px' }}
                        className="select-training"
                        placeholder="Select Module"
                        onChange={handleModuleChange} 
                        disabled={!selectedClass}
                    >
                        {modules.map(mod => (
                            <Option key={mod.moduleId} value={mod.moduleId}>
                                {mod.moduleName}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className="col">
                    <p>Delivery Type:</p>
                    <Select
                        style={{ width: '150px' }}
                        className="select-training"
                        mode="multiple"
                        placeholder="Select Delivery Type"
                        onChange={handleDeliveryTypeChange}
                        disabled={!selectedModule}
                    >
                        <Option key="all" value="all">Select All</Option>
                        {selectedModule && selectedModule.topics.flatMap(topic =>
                            topic.contents.map(content => content.deliveryType)
                        ).filter((v, i, a) => a.indexOf(v) === i).map((type, index) => (
                            <Option key={index} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className="col">
                    <p>Format Training:</p>
                    <Select
                        style={{ width: '150px' }}
                        className="select-training"
                        mode="multiple"
                        placeholder="Select Training Format"
                        onChange={handleTrainingFormatChange}
                        disabled={!selectedModule}
                    >
                        <Option key="all" value="all">Select All</Option>
                        {selectedModule && selectedModule.topics.flatMap(topic =>
                            topic.contents.map(content => content.trainingFormat)
                        ).filter((v, i, a) => a.indexOf(v) === i).map((format, index) => (
                            <Option key={index} value={format}>
                                {format}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className="col">
                    <p>Schedule Date:</p>
                    <DatePicker
                        onChange={handleDateChange}
                    />
                </div>
                <div className="col">
                    <p>Search:</p>
                    <Input
                        placeholder="Search by Class, Module or Topic"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {!isClassSelected && (
                <div className="empty-state-report" >
                    Please choose Class
                </div>
            )}
            {isClassSelected && !isModuleSelected && (
                <div className="empty-state-report" >
                    Please choose Module
                </div>
            )}
            {isModuleSelected && !isDateSelected && (
                <div className="empty-state-report">
                    Please choose Date
                </div>
            )}

            {isClassSelected && isModuleSelected && isDateSelected && (
                <div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Module: {selectedModule.moduleName}</span>
                        <div>
                            <span>Start Date: {selectedModule.startDate}</span>
                            <span className='e-date'>End Date: {selectedModule.endDate}</span>
                        </div>
                    </div>
                    <Table
    dataSource={filteredDataSource}
    columns={columns}
    />
                    <Button
                        type="primary"
                        onClick={showModal}
                        disabled={selectedTopics.length === 0}
                    >
                        Report
                    </Button>


                    <Modal
                        title="Schedule Report"
                        open={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <div>
                            <p>Date:</p>
                            <DatePicker onChange={handleModalDateChange} />
                        </div>
                        <div>
                            <p>Duration</p>
                            <Input placeholder='Enter Duration' type='number' />
                        </div>
                        <div>
                            <p>Topics:</p>
                            {selectedTopics.map((topic, index) => (
                                <div key={index} className="d-flex justify-content-between">
                                    <span>{topic.topicName}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <p>Note</p>
                            <Input.TextArea placeholder="Enter note" />
                        </div>
                        {showReason && (
                            <div>
                                <p>Reason</p>
                                <Input.TextArea placeholder="Enter reason" />
                            </div>
                        )}
                    </Modal>

                </div>
            )}
        </div>
    );
};

export default TabTraining;