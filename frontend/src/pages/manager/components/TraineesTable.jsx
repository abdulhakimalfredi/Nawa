import React, { useState } from "react";
import axios from "axios";

function TraineesTable({ trainees }) {
    const [selectedTrainee, setSelectedTrainee] = useState(null);
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const handleView = async (trainee) => {
        setSelectedTrainee(trainee);
        setLoading(true);
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/manager/trainees/${trainee.id}/summaries`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSummaries(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="trainees-table-container">
            <table className="trainees-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Progress</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainees.map((trainee) => (
                        <tr key={trainee.id}>
                            <td>{trainee.name}</td>
                            <td>{trainee.email}</td>
                            <td>0%</td>
                            <td>
                                <button
                                    className="view-btn"
                                    onClick={() => handleView(trainee)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedTrainee && (
                <div className="modal-overlay" onClick={() => setSelectedTrainee(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedTrainee(null)}>
                            ✕
                        </button>
                        <h2>Trainee Details</h2>
                        
                        <div className="modal-info">
                            <p><strong>Name:</strong> {selectedTrainee.name}</p>
                            <p><strong>Email:</strong> {selectedTrainee.email}</p>
                        </div>

                        <h3 style={{ color: '#e8b923', marginTop: '20px' }}>Lesson Summaries</h3>
                        
                        {loading ? (
                            <p style={{ color: '#888' }}>Loading...</p>
                        ) : summaries.length === 0 ? (
                            <p style={{ color: '#888' }}>No summaries yet</p>
                        ) : (
                            <div className="summaries-list">
                                {summaries.map((s) => (
                                    <div key={s.id} className="summary-card">
                                        <p className="summary-topic">{s.topic?.title}</p>
                                        <p><strong>Summary:</strong> {s.summary}</p>
                                        {s.challenges && (
                                            <p><strong>Challenges:</strong> {s.challenges}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TraineesTable;