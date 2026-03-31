import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/SummaryModal.css";

function SummaryModal({ topicId, topicTitle, onClose, onSuccess }) {
    const [summary, setSummary] = useState("");
    const [challenges, setChallenges] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        if (!summary.trim()) return;

        setLoading(true);
        try {
            await axios.post(
                "https://nawa-zvyh.onrender.com/api/summaries",
                {
                    topic_id: topicId,
                    summary: summary,
                    challenges: challenges
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            onSuccess();
            onClose();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                
                <h2>Lesson Completed! 🎉</h2>
                <p className="modal-subtitle">{topicTitle}</p>

                <div className="modal-form">
                    <label>What did you learn?</label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Write a brief summary..."
                        rows={4}
                    />

                    <label>Any challenges faced?</label>
                    <textarea
                        value={challenges}
                        onChange={(e) => setChallenges(e.target.value)}
                        placeholder="Optional..."
                        rows={3}
                    />

                    <button 
                        className="submit-btn" 
                        onClick={handleSubmit}
                        disabled={loading || !summary.trim()}
                    >
                        {loading ? "Saving..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SummaryModal;