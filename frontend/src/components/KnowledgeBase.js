import "../assets/styles/KnowledgeBase.css";
import { useState } from "react";
import SummaryModal from "./SummaryModal";
export default function KnowledgeBase({
  ActivePath,
  setCompletedTopics,
  completedTopics,
  TopicList,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  //يأخذ فقط الدروس التي تنتمي للمسار المختار حالياً.
  const currentTopics = TopicList.filter(
    (topic) => topic.path === ActivePath.id,
  );

  const doneCount = currentTopics.filter((t) =>
    completedTopics.includes(t.id),
  ).length;

  // أول موضوع غير مكتمل
  const firstIncompleteId = currentTopics.find(
    (t) => !completedTopics.includes(t.id),
  )?.id;

  function handleToggle(topicId) {
    if (completedTopics.includes(topicId)) {
      const newItems = completedTopics.filter((id) => id !== topicId);
      setCompletedTopics(newItems);
    } else {
      setCompletedTopics([...completedTopics, topicId]);
    }
  }

  return (
    <div className="kb-container">
      {/* الترحيب */}
      <h1 className="kb-welcome">Welcome 👋</h1>
      <p className="kb-path-label">
        {ActivePath.title ? `${ActivePath.title} Path` : "Choose Your Path"}
      </p>

      {currentTopics.length > 0 ? (
        <>
          {/* شريط التقدم */}
          <div className="kb-progress-card">
            <div className="kb-progress-header">
              <span>Progress</span>
              <span className="kb-progress-fraction">
                {doneCount}/{currentTopics.length}
              </span>
            </div>
            <div className="kb-progress-bar">
              <div
                className="kb-progress-fill"
                style={{
                  width: `${(doneCount / currentTopics.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* قائمة المواضيع */}
          <div className="kb-topics-list">
            {currentTopics.map((topic, index) => {
              const isDone = completedTopics.includes(topic.id);
              const isCurrent = topic.id === firstIncompleteId;

              let cardClass = "kb-topic-card";
              if (isDone) cardClass += " kb-done";
              if (isCurrent) cardClass += " kb-current";

              return (
                <div key={topic.id} className={cardClass}>
                  {/* الرقم أو علامة الصح */}
                  <div
                    className={`kb-topic-number ${isDone ? "kb-number-done" : ""} ${isCurrent ? "kb-number-current" : ""}`}
                  >
                    {isDone ? "✓" : index + 1}
                  </div>

                  {/* عنوان الموضوع */}
                  <a
                    className={`kb-topic-title ${isDone ? "kb-title-done" : ""}`}
                    href={topic.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {topic.title}
                    <span className="kb-link-icon">↗</span>
                  </a>

                  {/* الزر على اليمين */}
                  {isDone && (
                    <span
                      className="kb-badge-done"
                      onClick={() => handleToggle(topic.id)}
                    >
                      Done
                    </span>
                  )}
                  {isCurrent && (
                    <>
                      <button
                        className="kb-btn-start"
                        onClick={() => window.open(topic.url, "_blank")}
                      >
                        Start
                      </button>
                      <button
                        className="kb-btn-done"
                        onClick={() => {
                          setSelectedTopic(topic);
                          setShowModal(true);
                        }}
                      >
                        Done
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="kb-empty">
          Select a path from the sidebar to see the resources.
        </p>
      )}

      {showModal && selectedTopic && (
          <SummaryModal
              topicId={selectedTopic.id}
              topicTitle={selectedTopic.title}
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                  handleToggle(selectedTopic.id);
                  setShowModal(false);
              }}
          />
      )}
    </div>
  );
}

