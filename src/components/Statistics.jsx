import { useEffect, useState } from 'react';
import { fetchTrainings } from '../trainingsapi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import _ from 'lodash';

function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchTrainings()
            .then(trainings => {
                const groupedData = _(trainings)
                    .groupBy('activity')
                    .map((items, activity) => ({
                        activity,
                        totalMinutes: _.sumBy(items, 'duration'),
                    }))
                    .value();
                setData(groupedData);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Training Statistics</h2>
            <BarChart
                width={window.innerWidth * 0.9}
                height={window.innerHeight * 0.7}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalMinutes" name="Total Minutes" fill="#8884d8" />
            </BarChart>
        </div>
    );

}

export default Statistics;
