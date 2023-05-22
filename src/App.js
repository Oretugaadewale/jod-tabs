import './App.css';
import React, { useEffect, useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(url);
      const newJobDetails = await response.json();
      setJobDetails(newJobDetails);
      setLoading(false)
    } catch (error) {
      // console.log('Error fetching jobs:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchJobDetails();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>loading</h1>
      </section>
    );
  }
  const { company, dates, duties, title } = jobDetails[value]
  // console.log(jobDetails)
  // we are mapping duties becos its in an array & using index becos its a list
  return (
    <section className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
      <div className='job-container'>
        {/* btn container index is to list out each company list  */}
        <div className='btn-container'>
          {jobDetails.map((item, index) => {
            return <button key={item.id} onClick={() => setValue(index)}
              // this means if index(company name) matches the value(details of the company)
              className={`job-btn ${index === value && 'active-btn'}`}>{item.company}</button>
          })}
        </div>
        {/* jon info */}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}

        </article>
      </div>
    </section>
  );
}

export default App;
