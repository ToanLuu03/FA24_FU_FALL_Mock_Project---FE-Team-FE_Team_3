import React, { useEffect, useState, useMemo } from 'react';
import { Select, DatePicker, Space, Table, Input, Checkbox, Button } from "antd";
import { classTraining, moduleTraining, typeTraining, formatTraining } from '../../../data/reportData';
import { fetchSourceTrain } from '../../../api/TrainerAPI/Report_api';

import './TabTraining.css';

const TabTraining = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedType, setSelectedType] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const updatedTypeTraining = [{ label: "Select All", value: "all" }, ...typeTraining];
    const updatedFormatTraining = [{ label: "Select All", value: "all" }, ...formatTraining];

    useEffect(() => {
        const loadDataSource = async () => {
            try {
                const data = await fetchSourceTrain();
                setDataSource(data);
            } catch (error) {
                console.error('Error loading data source:', error);
            }
        };

        loadDataSource();
    }, []);

    const handleClassChange = (value) => {
        setSelectedClass(value);
    };

    const handleModuleChange = (value) => {
        setSelectedModule(value);
    };

    const handleTypeChange = (value) => {
        if (value.includes("all")) {
            setSelectedType(typeTraining.map(item => item.value)); // Chọn tất cả nếu "Select All" được chọn
        } else {
            setSelectedType(value);
        }
    };

    const handleFormatChange = (value) => {
        if (value.includes("all")) {
            setSelectedFormat(formatTraining.map(item => item.value)); // Chọn tất cả nếu "Select All" được chọn
        } else {
            setSelectedFormat(value);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSelect = (key, record) => {
        const selectedKeys = [...selectedRowKeys];
        const selectedRecords = [...selectedRows];

        if (selectedKeys.includes(key)) {
            const index = selectedKeys.indexOf(key);
            selectedKeys.splice(index, 1);
            selectedRecords.splice(index, 1);
        } else {
            selectedKeys.push(key);
            selectedRecords.push(record);
        }
        setSelectedRowKeys(selectedKeys);
        setSelectedRows(selectedRecords);
    };

    const addMonths = (date, months) => {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    };

    const isDateInRange = (date, startDate, endDate) => {
        const d = new Date(date);
        return d >= startDate && d <= endDate;
    };

    const filteredData = useMemo(() => {
        const startDate = selectedDate ? new Date(selectedDate) : null;
        const endDate = startDate ? addMonths(startDate, 3) : null;

        return dataSource.filter(item => {
            const isClassMatch = selectedClass ? item.class === selectedClass : true;
            const isModuleMatch = selectedModule ? item.module === selectedModule : true;
            const isTypeMatch = selectedType.length > 0 ? selectedType.includes(item.deliveryType) : true;
            const isFormatMatch = selectedFormat.length > 0 ? selectedFormat.includes(item.trainingFormat) : true;

            const isDateValid = startDate && endDate
                ? isDateInRange(item.scheduleDate, startDate, endDate)
                : true;

            const isSearchMatch = item.topic.toLowerCase().includes(searchText.toLowerCase());

            return isClassMatch && isModuleMatch && isTypeMatch && isFormatMatch && isDateValid && isSearchMatch;
        }).map(item => ({
            ...item,
            key: item.id, // Đảm bảo mỗi record có một key duy nhất dựa trên id
        }));
    }, [selectedClass, selectedModule, selectedType, selectedFormat, selectedDate, searchText, dataSource]);

    const columns = [
        {
            title: 'Select',
            dataIndex: 'select',
            key: 'select',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={() => handleSelect(record.key, record)} // Thêm record vào hàm handleSelect
                />
            ),
        },
        {
            title: 'Schedule',
            dataIndex: 'schedule',
            key: 'schedule',
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Delivery type',
            dataIndex: 'deliveryType',
            key: 'deliveryType',
        },
        {
            title: 'Training Format',
            dataIndex: 'trainingFormat',
            key: 'trainingFormat',
        },
        {
            title: 'Schedule Date',
            dataIndex: 'scheduleDate',
            key: 'scheduleDate',
        },
        {
            title: 'Schedule Duration (h)',
            dataIndex: 'duration',
            key: 'duration',
        },
    ];

    const notification = useMemo(() => {
        if (!selectedClass) {
            return "Please choose Class";
        }
        if (!selectedModule) {
            return "Please choose Module";
        }
        if (selectedType.length === 0) {
            return "Please choose Delivery Type";
        }
        if (selectedFormat.length === 0) {
            return "Please choose Training Format";
        }
        if (!selectedDate) {
            return "Please choose Schedule Date";
        }
        return null;
    }, [selectedClass, selectedModule, selectedType, selectedFormat, selectedDate]);

    const showTable = useMemo(() => {
        return selectedClass && selectedModule && selectedType.length > 0 && selectedFormat.length > 0 && selectedDate;
    }, [selectedClass, selectedModule, selectedType, selectedFormat, selectedDate]);



    return (
        <div>
            <div className='trainSelect d-flex justify-content-around align-items-center'>
                <div className='row'>
                    <span>Class</span>
                    <Select
                        showSearch
                        placeholder="Select Class"
                        optionFilterProp="label"
                        options={classTraining}
                        onChange={handleClassChange}
                    />
                </div>

                <div className='row'>
                    <span>Module</span>
                    <Select
                        showSearch
                        placeholder="Select Module"
                        optionFilterProp="label"
                        options={moduleTraining}
                        onChange={handleModuleChange}
                    />
                </div>

                <div className='row'>
                    <span>Delivery Type</span>
                    <Select
                        showSearch
                        placeholder="Select Delivery Type"
                        optionFilterProp='label'
                        options={updatedTypeTraining}
                        onChange={handleTypeChange}
                    />
                </div>

                <div className='row'>
                    <span>Training Format</span>
                    <Select
                        showSearch
                        placeholder="Select Training Format"
                        optionFilterProp="label"
                        options={updatedFormatTraining}
                        onChange={handleFormatChange}
                    />
                </div>

                <div className='row'>
                    <span>Schedule Date</span>
                    <Space className='dateTrain' direction="vertical">
                        <DatePicker onChange={handleDateChange} />
                    </Space>
                </div>
                <div className='row searchSection'>
                    <Input
                        placeholder="Enter topic to search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}

            {showTable && (
                <div className="table-container">
                    <div className='d-flex justify-content-between'>
                        <p className=''>
                            Module: {selectedModule}
                        </p>
                        <div className='dateStartEnd d-flex justify-content-around'>
                            <p>
                                Start Date: {selectedDate ? selectedDate.format('DD/MM/YYYY') : 'No date selected'}
                            </p>
                            <p>
                                End Date: {selectedDate ? addMonths(selectedDate.toDate(), 3).toLocaleDateString('en-GB') : 'No end date calculated'}
                            </p>
                        </div>
                    </div>
                    <Table
                        dataSource={filteredData}
                        columns={columns}
                        pagination={false}
                    />
                    <div className='d-flex justify-content-end pt-3'>
                        <Button type="primary">
                            Export
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabTraining;
