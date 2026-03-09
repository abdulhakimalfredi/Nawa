// data/instructions.js
const globalInstructions = {
    title:"Instructions You Need To Consider",
    content: [
  "Complete all courses ordered.",
  "Please make sure to manage your time.",
  "After you complete all courses, you will be asked to make a sample project.",
  "If you have any issues learning any skill, consult your colleagues or your manager.",
  "You must practice the things you learn to fully understand it.",
  "All courses are Free, but if you have issues accessing any of them, please consult your manager.",
  "You should be able to complete each path in 3 - 4 weeks.",
  "Please take your time to learning and be focused, do not hurry because this will make you learn nothing." ]
};


export default function Instructions(){
    return (
        <div className="instructions-section">
            <h2 className="instructions-title">{globalInstructions.title}</h2>
            <div className="instructions-grid">
                {globalInstructions.content.map((point, index) => (
                    <div key={index} className="instruction-item">
                        <span className="bullet-number">{index + 1}</span>
                        <p>{point}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}