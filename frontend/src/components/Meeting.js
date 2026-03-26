import { useState, useEffect} from "react";
import axios from "axios";

export default function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', time: '' });
  const API = "http://127.0.0.1:8000/api/meetings";
  useEffect(()=> {
    axios.get(API).then((res)=> setMeetings(res.data))
    .catch((err)=>console.log(err)); },[])
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.date || !form.time) return;

    axios.post(API, form)
    .then((res)=> {
        setMeetings([...meetings, { ...form, id: Date.now() }]);
        setForm({ title: '', date: '', time: '' });
        setShowForm(false);
    })
    .catch((err)=> console.log(err)); 
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`)
        .then(() => {
            setMeetings(meetings.filter((m) => m.id !== id));
        })
        .catch((err)=> console.log(err)); 
  };

  return (
    <div className="meetings-page">
      <div className="meetings-header">
        <h1 className="meetings-title">Meetings</h1>
        <button className="meetings-add-btn" onClick={() => setShowForm(true)}>Add A Meeting + </button>
      </div>

      {showForm && (
        <div className="meetings-form">
          <input className="meetings-input" name="title" value={form.title} onChange={handleChange} placeholder="عنوان الاجتماع" />
          <div className="meetings-form-row">
            <input className="meetings-input" name="date" type="date" value={form.date} onChange={handleChange} />
            <input className="meetings-input" name="time" type="time" value={form.time} onChange={handleChange} />
          </div>
          <div className="meetings-form-actions">
            <button className="meetings-submit-btn" onClick={handleSubmit}>Add</button>
            <button className="meetings-cancel-btn" onClick={() => { setShowForm(false); setForm({ title: '', date: '', time: '' }); }}>Cancel</button>
          </div>
        </div>
      )}

      {meetings.length === 0 ? (
        <p className="meetings-empty">No Meetings available</p>
      ) : (
        meetings.map((m) => (
          <div className="meetings-item" key={m.id}>
            <div className="meetings-item-info">
              <div className="meetings-item-title">{m.title}</div>
              <div className="meetings-item-date">{m.date} — {m.time}</div>
            </div>
            <button className="meetings-delete-btn" onClick={() => handleDelete(m.id)}>✕</button>
          </div>
        ))
      )}
    </div>
  );
}