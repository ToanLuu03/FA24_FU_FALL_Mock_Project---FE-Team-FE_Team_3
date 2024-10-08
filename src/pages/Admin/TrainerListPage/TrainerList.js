import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
    Table, Input, Button, Select, Checkbox, Form, Tag
} from 'antd';
import './TrainerList.css';

const { Option } = Select;
const { Search } = Input;

const trainersData = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        account: 'ANV200',
        type: 'External',
        site: 'HN',
        jobRank: 'Developer 3',
        trainCert: 'Basic',
        professionalLevel: 'Standard',
        trainingCompetencyIndex: 1.2,
        professionalIndex: 1.5,
        status: 'Available',
        registeredSkills: 'JavaScript, React',
        taughtSkills: 'Java',
    },
    {
        id: 2,
        name: 'Nguyễn Thị B',
        account: 'NTB200',
        type: 'Internal',
        site: 'HN',
        jobRank: 'Software Development Head',
        trainCert: 'None',
        professionalLevel: 'Expert',
        trainingCompetencyIndex: 1.8,
        professionalIndex: 2.0,
        status: 'Busy',
        registeredSkills: 'Management, Agile',
        taughtSkills: 'Scrum',
    },
    {
        id: 3,
        name: 'Lê Văn Luyện',
        account: 'LVL300',
        type: 'Staff',
        site: 'HCM',
        jobRank: 'Bridge Software Engineer 1',
        trainCert: 'Basic',
        professionalLevel: 'Standard',
        trainingCompetencyIndex: 1.1,
        professionalIndex: 1.4,
        status: 'Out',
        registeredSkills: 'PHP, MySQL',
        taughtSkills: 'None',
    },
    {
        id: 4,
        name: 'Trần Văn C',
        account: 'TVC100',
        type: 'External',
        site: 'DN',
        jobRank: 'Developer 2',
        trainCert: 'Intermediate',
        professionalLevel: 'Advanced',
        trainingCompetencyIndex: 1.5,
        professionalIndex: 1.7,
        status: 'Available',
        registeredSkills: 'C#, .NET',
        taughtSkills: 'ASP.NET',
    },
];

const statusOptions = ["Available", "Busy", "Out"];
const siteOptions = ["HN", "HCM", "DN"];

function TrainerList() {
    const { selectMenuItem } = useOutletContext();
    const [filteredData, setFilteredData] = useState(trainersData);
    const [filters, setFilters] = useState({
        search: '',
        status: [],
        site: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        selectMenuItem('3');
    }, [selectMenuItem]);

    const handleSearchChange = (value) => {
        setFilters({ ...filters, search: value.toLowerCase() });
    };

    const handleStatusChange = (checkedValues) => {
        setFilters({ ...filters, status: checkedValues });
    };

    const handleSiteChange = (checkedValues) => {
        setFilters({ ...filters, site: checkedValues });
    };

    const handleAddTrainer = () => {
        navigate('/admin/trainer_list/AddTrainerPage');
    };

    const getStatusTagColor = (status) => {
        switch (status) {
            case 'Available':
                return 'green';
            case 'Busy':
                return 'orange';
            case 'Out':
                return 'red';
            default:
                return 'default';
        }
    };

    useEffect(() => {
        const updatedData = trainersData.filter((trainer) => {
            const matchesStatus = filters.status.length === 0 || filters.status.includes(trainer.status);
            const matchesSite = filters.site.length === 0 || filters.site.includes(trainer.site);
            const matchesSearch = filters.search === '' || trainer.name.toLowerCase().includes(filters.search);

            return matchesStatus && matchesSite && matchesSearch;
        });

        setFilteredData(updatedData);
    }, [filters]);

    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Trainer Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <a href='/admin/trainer_management'>{text}</a>,
        },
        {
            title: 'FPT Account',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Site',
            dataIndex: 'site',
            key: 'site',
        },
        {
            title: 'Job Rank',
            dataIndex: 'jobRank',
            key: 'jobRank',
        },
        {
            title: 'Train The Trainer Cert',
            dataIndex: 'trainCert',
            key: 'trainCert',
        },
        {
            title: 'Professional Level',
            dataIndex: 'professionalLevel',
            key: 'professionalLevel',
        },
        {
            title: 'Training Competency Index',
            dataIndex: 'trainingCompetencyIndex',
            key: 'trainingCompetencyIndex',
        },
        {
            title: 'Professional Index',
            dataIndex: 'professionalIndex',
            key: 'professionalIndex',
            className: 'responsive-hide', // Add class to hide on small screens
        },
        {
            title: 'Registered Skills',
            dataIndex: 'registeredSkills',
            key: 'registeredSkills',
            className: 'responsive-hide', // Add class to hide on small screens
        },
        {
            title: 'Taught Skills',
            dataIndex: 'taughtSkills',
            key: 'taughtSkills',
            className: 'responsive-hide', // Add class to hide on small screens
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag color={getStatusTagColor(status)}>{status}</Tag>,
        },
    ];
    return (
        <div className="trainer-management-container">
            <div className='Header-list'>
                <h2>Trainers List ({filteredData.length})</h2>
                <Button type="primary" onClick={handleAddTrainer}>
                    Add Trainer
                </Button>
            </div>

            <hr />

            {/* Filters */}
            <div className="filters-container">
                <Form layout="inline">
                    <Form.Item label="Status">
                        <Select
                            mode="multiple"
                            placeholder="Select status"
                            value={filters.status}
                            style={{ width: 200 }}
                            dropdownRender={menu => (
                                <div style={{ padding: '10px' }}>
                                    <Checkbox.Group
                                        options={statusOptions.map(status => ({
                                            label: status,
                                            value: status
                                        }))}
                                        value={filters.status}
                                        onChange={handleStatusChange}
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    />
                                </div>
                            )}
                        >
                            {statusOptions.map(status => (
                                <Option key={status} value={status}>{status}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Site">
                        <Select
                            mode="multiple"
                            placeholder="Select site"
                            value={filters.site}
                            style={{ width: 200 }}
                            dropdownRender={menu => (
                                <div style={{ padding: '10px' }}>
                                    <Checkbox.Group
                                        options={siteOptions.map(site => ({
                                            label: site,
                                            value: site
                                        }))}
                                        value={filters.site}
                                        onChange={handleSiteChange}
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                    />
                                </div>
                            )}
                        >
                            {siteOptions.map(site => (
                                <Option key={site} value={site}>{site}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Search
                            placeholder="Search by name"
                            onSearch={handleSearchChange}
                            enterButton
                            style={{ width: 250 }}
                        />
                    </Form.Item>
                </Form>
            </div>

            {/* Trainer Table */}
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                pagination={false}
            />
        </div>
    );
}

export default TrainerList;
