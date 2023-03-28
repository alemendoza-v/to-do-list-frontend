import { useContext, useEffect, useState } from "react";
import { getMetrics } from "../ApiCalls";
import DoneClickContext from "../context/DoneClickContext";
import '../css/Metrics.css';

const ToDoMetrics = () => {
    const [averageAll, setAverageAll] = useState('');
    const [averageHigh, setAverageHigh] = useState('');
    const [averageMedium, setAverageMedium] = useState('');
    const [averageLow, setAverageLow] = useState('');
    const { doneClick } = useContext(DoneClickContext);
   
    const fetchMetrics = () => {
        getMetrics()
        .then((response) => {
            if(response.status === 200) {
                const data = response.data;
                const averageAll = data.averageAll;
                const averageHigh = data.averageHigh;
                const averageMedium = data.averageMedium;
                const averageLow = data.averageLow;

                setAverageAll(prev => averageAll);
                setAverageHigh(prev => averageHigh);
                setAverageMedium(prev => averageMedium);
                setAverageLow(prev => averageLow);
            } else {
                console.log('There was an error while fetching the metrics');
            }
        })
    }

    useEffect(() => {
        fetchMetrics();
    }, [])

    useEffect(() => {
        fetchMetrics();
    }, [doneClick])

    return (
        <>
            <div className="all-metrics">
                <div className="title">Average time to finish tasks:</div>
                <div className="metric-value-all"> {averageAll ? averageAll : "No to-dos are done!"} </div>
            </div>
            <div className="priority-metrics">
                <div className="title">Average time to finish tasks by priority:</div>

                <div className="metric">
                    <div className="metric-label">High:</div>
                    <div className="metric-value">{averageHigh ? averageHigh : "No high priority to-dos are done"}</div>
                </div>

                <div className="metric">
                    <div className="metric-label">Medium:</div>
                    <div className="metric-value">{averageMedium ? averageMedium : "No medium priority to-dos are done"}</div>
                </div>

                <div className="metric">
                    <div className="metric-label">Low:</div>
                    <div className="metric-value">{averageLow ? averageLow : "No low priority to-dos are done"}</div>
                </div>
            </div>
        </>
    )
}
export default ToDoMetrics;