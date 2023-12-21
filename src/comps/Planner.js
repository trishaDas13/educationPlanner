import { useState } from "react";
import './planner.css'

function Planner() {
    function getData(){
        let data = JSON.parse(localStorage.getItem('subjects'));
        return data || [];
    }

  let [subject, setSubject] = useState("");
  let [hour, setHour] = useState();
  const [subjectList, setSubjectList] = useState(getData());

    //todo -------add subject array ------
    function addSubject() {
        if(subject === "" && hour === ""){
            alert("How I can add an empty field? 😒 Fill it first!")
            return;
        }
        setSubjectList(() =>{
            let subList = [...subjectList, {
                subjectInput : subject,
                hourInput : hour
            }]
            localStorage.setItem('subjects',JSON.stringify(subList));
            return subList;
        })
    }

    //todo ------- increase hours -------
    function incHour(idx){
        let data = [...subjectList];
        data[idx].hourInput = parseInt(data[idx].hourInput) + 1;
        setSubjectList(data);
        localStorage.setItem('subjects', JSON.stringify(data));
    }
    //todo ------- decrease hours -------
    function dscHour(idx){
        let data = [...subjectList];
        if(data[idx].hourInput <= 1){
            alert("Please study atleast 1 hour for better future 😉")
        }
        else{
            data[idx].hourInput = parseInt(data[idx].hourInput) - 1;
        }
        setSubjectList(data);
        localStorage.setItem('subjects', JSON.stringify(data))
    }
    //todo ------- Delete subject -------
    function delSubject(idx){
        let data = [...subjectList.splice(idx, 1)];
        localStorage.removeItem(data);
    }

  return (
    <>
      <h2>📖  Education Planner</h2>
      <div className="inputStore">
        <input 
            type="text" 
            placeholder="Subject Name"  
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
        />
        <input 
            type="number" 
            placeholder="Hours" 
            min={0}  
            value={hour}
            onChange={(e) =>  setHour(e.target.value)}
        />
        <button onClick={addSubject}>Add Subject</button>        
      </div>
      <div className="subjectList">
        
            {
                subjectList.map((subject, idx) =>{
                    return (
                        <div className="subContainer">
                            <p>{subject.subjectInput}</p>
                            <p>{subject.hourInput} Hours</p>
                            <div className="btns">
                                <button 
                                    onClick={(e)=>incHour(idx)}
                                    style={{backgroundColor:"#65B741"}}
                                    title="Increase Study Time"
                                >➕</button>
                                <button
                                    onClick={(e)=>dscHour(idx)}
                                    style={{backgroundColor:"#F24C3D"}}
                                    title="Decrease Study Time"
                                >➖</button>
                                <button
                                    style={{backgroundColor:"#FFACAC"}}
                                    title="Delete The Planner"
                                    onClick={(e) => 
                                        delSubject(idx)
                                    }
                                >❌</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
  );
}

export default Planner;
