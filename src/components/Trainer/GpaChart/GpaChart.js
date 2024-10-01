import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { gpaDataStatic } from "../../../data/staticData";
import './GpaChart.css' // Import the external CSS file

const colorMap = { 2022: "#6666CC", 2023: "#00CCFF", 2024: "#003366" };

const GpaChart = ({ selectedTopics, selectedClasses, dateRange }) => {
    const filteredGpaData = useMemo(() => {
        if (!dateRange[0] || !dateRange[1]) {
            return [];
        }
        return gpaDataStatic.filter(item => {
            const isTopicSelected = selectedTopics.length === 0 || selectedTopics.includes(item.topic);
            const isClassSelected = selectedClasses.length === 0 || selectedClasses.includes(item.className);
            const isInDateRange = item.year >= dateRange[0].year() && item.year <= dateRange[1].year();
            return isTopicSelected && isClassSelected && isInDateRange;
        });
    }, [selectedTopics, selectedClasses, dateRange]);

    const groupedGpaData = useMemo(() => {
        const grouped = {};
        filteredGpaData.forEach(item => {
            const key = `${item.topic} (${item.className})`;
            if (!grouped[key]) {
                grouped[key] = { topicClass: key, '2022': 0, '2023': 0, '2024': 0 };
            }
            grouped[key][item.year] = item.gpa;
        });
        return Object.values(grouped);
    }, [filteredGpaData]);

    if (selectedTopics.length === 0 || selectedClasses.length === 0 || !dateRange[0] || !dateRange[1]) {
        return <div className="empty-state-container">Please choose Topics, Classes and Date Range</div>;
    }

    return (
        <div className="chart-container">
            <div className="legend-container">
                {Object.keys(colorMap).map(year => (
                    <span className="legend-item" key={year}>
                        <span className="legend-color-box" style={{ backgroundColor: colorMap[year] }} />
                        {year}
                    </span>
                ))}
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={groupedGpaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topicClass" />
                    <YAxis domain={[0, 10]} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                    <Tooltip />
                    {Object.keys(colorMap).map(year => (
                        <Bar key={year} dataKey={year} fill={colorMap[year]} name={year} barSize={40}>
                            <LabelList dataKey={year} position="top" />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GpaChart;
